#!/bin/bash

# Configuration
WIFI_IFACE="wlan1"
API_PORT=5000
FIREWALL_PORT=9000
VENV_PATH="venv"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[*]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

# PID files for process management
API_PID_FILE="/tmp/widrsx_api.pid"
FIREWALL_PID_FILE="/tmp/widrsx_firewall.pid"

# Check if running as root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        print_error "This script must be run as root for monitor mode and packet capture"
        print_info "Please run: sudo $0"
        exit 1
    fi
}

# Check dependencies
check_dependencies() {
    print_status "Checking dependencies..."
    
    # Check if wireless interface exists
    if ! ip link show "$WIFI_IFACE" > /dev/null 2>&1; then
        print_error "Wireless interface $WIFI_IFACE not found"
        print_info "Available interfaces:"
        ip link show | grep -E "^[0-9]+:" | awk -F': ' '{print "  " $2}'
        exit 1
    fi
    
    # Check for required tools
    for cmd in iwconfig airmon-ng python3 cargo; do
        if ! command -v $cmd &> /dev/null; then
            print_error "$cmd is not installed"
            exit 1
        fi
    done
    
    # Check Python virtual environment
    if [ ! -d "$VENV_PATH" ]; then
        print_warning "Virtual environment not found. Creating one..."
        python3 -m venv $VENV_PATH
        source $VENV_PATH/bin/activate
        pip install -r requirements.txt
    fi
    
    print_status "All dependencies checked"
}

# Set wireless interface to monitor mode
set_monitor_mode() {
    print_status "Setting $WIFI_IFACE to monitor mode..."
    
    # Kill processes that might interfere
    sudo airmon-ng check kill > /dev/null 2>&1
    
    # Set monitor mode
    sudo ifconfig $WIFI_IFACE down
    sudo iwconfig $WIFI_IFACE mode monitor
    sudo ifconfig $WIFI_IFACE up
    
    # Verify monitor mode
    if iwconfig $WIFI_IFACE 2>/dev/null | grep -q "Mode:Monitor"; then
        print_status "Monitor mode enabled successfully"
    else
        print_error "Failed to set monitor mode"
        exit 1
    fi
}

# Revert wireless interface to managed mode
set_managed_mode() {
    print_status "Reverting $WIFI_IFACE to managed mode..."
    sudo ifconfig $WIFI_IFACE down
    sudo iwconfig $WIFI_IFACE mode managed
    sudo ifconfig $WIFI_IFACE up
    
    # Restart NetworkManager if available
    if systemctl is-active --quiet NetworkManager; then
        sudo systemctl restart NetworkManager
    fi
}

# Build Rust firewall
build_firewall() {
    print_status "Building Rust firewall TCP server..."
    if [ -d "firewall" ]; then
        cd firewall
        if cargo build --release; then
            print_status "Firewall built successfully"
        else
            print_error "Failed to build firewall"
            exit 1
        fi
        cd ..
    else
        print_warning "Firewall directory not found, skipping firewall build"
    fi
}

# Start firewall server
start_firewall() {
    if [ -f "firewall/target/release/widrsx-backend" ]; then
        print_status "Starting Rust firewall TCP server on port $FIREWALL_PORT..."
        cd firewall
        nohup ./target/release/widrsx-backend > /tmp/firewall.log 2>&1 &
        echo $! > $FIREWALL_PID_FILE
        cd ..
        sleep 2
        if ps -p $(cat $FIREWALL_PID_FILE) > /dev/null; then
            print_status "Firewall server started successfully (PID: $(cat $FIREWALL_PID_FILE))"
        else
            print_error "Failed to start firewall server"
        fi
    else
        print_warning "Firewall binary not found, skipping firewall startup"
    fi
}

# Start Flask API server
start_api_server() {
    print_status "Starting Flask API server on port $API_PORT..."
    
    # Activate virtual environment and start API
    source $VENV_PATH/bin/activate
    nohup python3 api_server.py > /tmp/api_server.log 2>&1 &
    echo $! > $API_PID_FILE
    
    sleep 3
    if ps -p $(cat $API_PID_FILE) > /dev/null; then
        print_status "API server started successfully (PID: $(cat $API_PID_FILE))"
        print_info "API available at: http://localhost:$API_PORT"
    else
        print_error "Failed to start API server"
        print_info "Check logs: tail -f /tmp/api_server.log"
        exit 1
    fi
}

# Initialize database
init_database() {
    print_status "Initializing database..."
    source $VENV_PATH/bin/activate
    
    # First, try the test script for comprehensive initialization
    if [ -f "test_database.py" ]; then
        python3 test_database.py init
        if [ $? -eq 0 ]; then
            print_status "Database initialized successfully"
            return 0
        else
            print_warning "Test script failed, trying direct initialization..."
        fi
    fi
    
    # Fallback to direct database initialization
    python3 -c "from database import init_db; result = init_db(); print('SUCCESS' if result else 'FAILED')" | tail -1 | grep -q "SUCCESS"
    if [ $? -eq 0 ]; then
        print_status "Database initialized successfully"
    else
        print_error "Database initialization failed"
        return 1
    fi
}

# Stop all services
stop_services() {
    print_status "Stopping all services..."
    
    # Stop API server
    if [ -f $API_PID_FILE ]; then
        PID=$(cat $API_PID_FILE)
        if ps -p $PID > /dev/null; then
            kill $PID
            print_status "API server stopped"
        fi
        rm -f $API_PID_FILE
    fi
    
    # Stop firewall server
    if [ -f $FIREWALL_PID_FILE ]; then
        PID=$(cat $FIREWALL_PID_FILE)
        if ps -p $PID > /dev/null; then
            kill $PID
            print_status "Firewall server stopped"
        fi
        rm -f $FIREWALL_PID_FILE
    fi
    
    # Kill any remaining Python processes
    pkill -f "main.py" 2>/dev/null || true
    
    # Revert network interface
    set_managed_mode
    
    print_status "All services stopped"
}

# Show status of services
show_status() {
    print_info "=== WIDRSX Service Status ==="
    
    # Check API server
    if [ -f $API_PID_FILE ] && ps -p $(cat $API_PID_FILE) > /dev/null; then
        print_status "API Server: Running (PID: $(cat $API_PID_FILE))"
    else
        print_warning "API Server: Not running"
    fi
    
    # Check firewall server
    if [ -f $FIREWALL_PID_FILE ] && ps -p $(cat $FIREWALL_PID_FILE) > /dev/null; then
        print_status "Firewall Server: Running (PID: $(cat $FIREWALL_PID_FILE))"
    else
        print_warning "Firewall Server: Not running"
    fi
    
    # Check network interface
    if iwconfig $WIFI_IFACE 2>/dev/null | grep -q "Mode:Monitor"; then
        print_status "Network Interface: Monitor mode"
    else
        print_warning "Network Interface: Not in monitor mode"
    fi
    
    print_info "API Endpoints:"
    print_info "  http://localhost:$API_PORT/status"
    print_info "  http://localhost:$API_PORT/logs"
    print_info "  http://localhost:$API_PORT/start"
    print_info "  http://localhost:$API_PORT/stop"
}

# Cleanup function
cleanup() {
    print_warning "Received interrupt signal..."
    stop_services
    exit 0
}

# Set trap for cleanup
trap cleanup SIGINT SIGTERM EXIT

# Main execution
main() {
    case "${1:-start}" in
        "start")
            print_info "=== Starting WIDRSX Real-time Network Monitor ==="
            check_root
            check_dependencies
            set_monitor_mode
            build_firewall
            init_database
            start_firewall
            start_api_server
            
            print_status "All services started successfully!"
            print_info "=== Service URLs ==="
            print_info "  API Server: http://localhost:$API_PORT"
            print_info "  Frontend: http://localhost:3000 (start separately)"
            print_info ""
            print_info "Press Ctrl+C to stop all services"
            
            # Keep script running
            while true; do
                sleep 10
                # Check if services are still running
                if [ -f $API_PID_FILE ] && ! ps -p $(cat $API_PID_FILE) > /dev/null; then
                    print_error "API server died unexpectedly"
                    break
                fi
            done
            ;;
        "stop")
            print_info "=== Stopping WIDRSX Services ==="
            stop_services
            ;;
        "status")
            show_status
            ;;
        "restart")
            print_info "=== Restarting WIDRSX Services ==="
            stop_services
            sleep 2
            $0 start
            ;;
        *)
            echo "Usage: $0 {start|stop|status|restart}"
            echo ""
            echo "Commands:"
            echo "  start   - Start all WIDRSX services"
            echo "  stop    - Stop all WIDRSX services"
            echo "  status  - Show status of all services"
            echo "  restart - Restart all services"
            exit 1
            ;;
    esac
}

main "$@"