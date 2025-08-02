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

# Check if Node.js is installed
check_nodejs() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        print_info "Please install Node.js first:"
        print_info "  Ubuntu/Debian: sudo apt install nodejs npm"
        print_info "  Fedora: sudo dnf install nodejs npm"
        print_info "  Arch: sudo pacman -S nodejs npm"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi
}

# Navigate to frontend directory
cd "$(dirname "$0")/Frontend" || {
    print_error "Frontend directory not found"
    exit 1
}

print_info "=== Starting WIDRSX Frontend ==="

# Check dependencies
check_nodejs

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_status "Installing Node.js dependencies..."
    npm install
fi

# Check if backend is running
print_status "Checking backend connection..."
if curl -s http://localhost:5000/status > /dev/null; then
    print_status "Backend is running"
else
    print_warning "Backend not detected on localhost:5000"
    print_info "Make sure to start the backend first:"
    print_info "  cd widrsx-backend && sudo ./run_widrsx.sh start"
fi

print_status "Starting development server..."
print_info "Frontend will be available at: http://localhost:3000"
print_info "Press Ctrl+C to stop the server"

# Start the development server
npm run dev
