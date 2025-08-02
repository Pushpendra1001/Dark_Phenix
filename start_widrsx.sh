#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

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

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# PID files
BACKEND_PID_FILE="/tmp/widrsx_backend.pid"
FRONTEND_PID_FILE="/tmp/widrsx_frontend.pid"

start_backend() {
    print_status "Starting WIDRSX Backend..."
    cd "$SCRIPT_DIR/widrsx-backend"
    
    # Start backend in background
    sudo ./run_widrsx.sh start &
    echo $! > $BACKEND_PID_FILE
    
    # Wait for backend to be ready
    print_info "Waiting for backend to initialize..."
    for i in {1..30}; do
        if curl -s http://localhost:5000/status > /dev/null 2>&1; then
            print_status "Backend is ready!"
            break
        fi
        sleep 2
        if [ $i -eq 30 ]; then
            print_error "Backend failed to start within timeout"
            return 1
        fi
    done
}

start_frontend() {
    print_status "Starting WIDRSX Frontend..."
    cd "$SCRIPT_DIR"
    
    # Start frontend in background
    ./start_frontend.sh &
    echo $! > $FRONTEND_PID_FILE
    
    print_info "Waiting for frontend to initialize..."
    sleep 5
    print_status "Frontend should be starting..."
}

stop_services() {
    print_status "Stopping WIDRSX services..."
    
    # Stop frontend
    if [ -f $FRONTEND_PID_FILE ]; then
        PID=$(cat $FRONTEND_PID_FILE)
        if ps -p $PID > /dev/null; then
            kill $PID 2>/dev/null
            print_status "Frontend stopped"
        fi
        rm -f $FRONTEND_PID_FILE
    fi
    
    # Stop backend
    if [ -f $BACKEND_PID_FILE ]; then
        cd "$SCRIPT_DIR/widrsx-backend"
        sudo ./run_widrsx.sh stop
        rm -f $BACKEND_PID_FILE
        print_status "Backend stopped"
    fi
    
    # Kill any remaining processes
    pkill -f "npm run dev" 2>/dev/null || true
    pkill -f "vite" 2>/dev/null || true
}

show_status() {
    print_info "=== WIDRSX Service Status ==="
    
    # Check backend
    if curl -s http://localhost:5000/status > /dev/null 2>&1; then
        print_status "Backend: Running (http://localhost:5000)"
    else
        print_warning "Backend: Not running"
    fi
    
    # Check frontend
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        print_status "Frontend: Running (http://localhost:3000)"
    else
        print_warning "Frontend: Not running"
    fi
    
    # Get detailed backend status
    if curl -s http://localhost:5000/status > /dev/null 2>&1; then
        print_info "Backend Details:"
        curl -s http://localhost:5000/status | python3 -m json.tool 2>/dev/null || echo "Could not parse status"
    fi
}

show_help() {
    echo "WIDRSX Real-time Network Security Monitor"
    echo ""
    echo "Usage: $0 {start|stop|restart|status|backend|frontend}"
    echo ""
    echo "Commands:"
    echo "  start    - Start both backend and frontend services"
    echo "  stop     - Stop all services"
    echo "  restart  - Restart all services"
    echo "  status   - Show status of all services"
    echo "  backend  - Start only backend services"
    echo "  frontend - Start only frontend (requires backend running)"
    echo ""
    echo "Requirements:"
    echo "  - Run with sudo for backend (monitor mode access)"
    echo "  - Node.js and npm for frontend"
    echo "  - Python 3 with virtual environment"
    echo ""
    echo "URLs:"
    echo "  Frontend: http://localhost:3000"
    echo "  Backend API: http://localhost:5000"
}

# Cleanup function
cleanup() {
    print_warning "Received interrupt signal..."
    stop_services
    exit 0
}

# Set trap for cleanup
trap cleanup SIGINT SIGTERM

# Main execution
case "${1:-help}" in
    "start")
        print_info "=== Starting WIDRSX Full Stack ==="
        start_backend
        if [ $? -eq 0 ]; then
            start_frontend
            print_status "All services started!"
            print_info ""
            print_info "=== Access URLs ==="
            print_info "  Frontend: http://localhost:3000"
            print_info "  Backend API: http://localhost:5000"
            print_info ""
            print_info "Press Ctrl+C to stop all services"
            
            # Keep script running
            while true; do
                sleep 10
            done
        else
            print_error "Failed to start backend"
            exit 1
        fi
        ;;
    "backend")
        start_backend
        print_info "Backend started. Use '$0 frontend' to start frontend."
        ;;
    "frontend")
        if curl -s http://localhost:5000/status > /dev/null 2>&1; then
            start_frontend
        else
            print_error "Backend not running. Start backend first with '$0 backend'"
            exit 1
        fi
        ;;
    "stop")
        stop_services
        ;;
    "restart")
        print_info "=== Restarting WIDRSX Services ==="
        stop_services
        sleep 3
        start_backend && start_frontend
        ;;
    "status")
        show_status
        ;;
    "help"|"--help"|"-h")
        show_help
        ;;
    *)
        show_help
        exit 1
        ;;
esac
