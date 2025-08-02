#!/bin/bash

# WIDRSX Database Diagnostic Script

echo "=========================================="
echo "  WIDRSX Database Diagnostic"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_ok() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}!${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "database.py" ]; then
    print_error "Not in widrsx-backend directory"
    echo "Please run this script from the widrsx-backend directory"
    exit 1
fi

print_ok "In correct directory"

# Check Python environment
echo ""
echo "Python Environment:"
if [ -d "venv" ]; then
    print_ok "Virtual environment found"
    source venv/bin/activate
    echo "  Python: $(which python3)"
    echo "  Version: $(python3 --version)"
else
    print_warning "No virtual environment found"
    echo "  Using system Python: $(which python3)"
fi

# Check database directory and permissions
echo ""
echo "Database Directory:"
DB_DIR="logs"
if [ -d "$DB_DIR" ]; then
    print_ok "Database directory exists: $DB_DIR"
    echo "  Permissions: $(ls -ld $DB_DIR)"
else
    print_warning "Database directory doesn't exist"
    echo "  Creating directory..."
    mkdir -p $DB_DIR
    if [ $? -eq 0 ]; then
        print_ok "Directory created successfully"
    else
        print_error "Failed to create directory"
    fi
fi

# Check database file
echo ""
echo "Database File:"
DB_FILE="$DB_DIR/wifi_attack_logs.db"
if [ -f "$DB_FILE" ]; then
    print_ok "Database file exists: $DB_FILE"
    echo "  Size: $(du -h $DB_FILE | cut -f1)"
    echo "  Permissions: $(ls -l $DB_FILE)"
else
    print_warning "Database file doesn't exist"
fi

# Test Python imports
echo ""
echo "Python Dependencies:"
python3 -c "import sqlite3; print('sqlite3: OK')" 2>/dev/null && print_ok "sqlite3 module" || print_error "sqlite3 module"
python3 -c "import yaml; print('yaml: OK')" 2>/dev/null && print_ok "yaml module" || print_error "yaml module"
python3 -c "import flask; print('flask: OK')" 2>/dev/null && print_ok "flask module" || print_error "flask module"
python3 -c "from database import init_db; print('database module: OK')" 2>/dev/null && print_ok "database module" || print_error "database module"

# Test database operations
echo ""
echo "Database Operations:"
if [ -f "test_database.py" ]; then
    print_ok "Test script found"
    echo "  Running database test..."
    python3 test_database.py test > /tmp/db_test.log 2>&1
    if [ $? -eq 0 ]; then
        print_ok "Database test passed"
    else
        print_error "Database test failed"
        echo "  Check /tmp/db_test.log for details"
    fi
else
    print_warning "Test script not found"
    echo "  Trying manual database initialization..."
    python3 -c "
from database import init_db
result = init_db()
if result:
    print('Database initialization: SUCCESS')
else:
    print('Database initialization: FAILED')
" 2>/dev/null && print_ok "Manual initialization" || print_error "Manual initialization"
fi

# Check API server
echo ""
echo "API Server:"
if pgrep -f "api_server.py" > /dev/null; then
    print_ok "API server is running"
    if curl -s http://localhost:5000/status > /dev/null 2>&1; then
        print_ok "API server responding"
        echo "  Testing database endpoint..."
        curl -s http://localhost:5000/db/init | grep -q "success" && print_ok "Database endpoint works" || print_warning "Database endpoint issue"
    else
        print_warning "API server not responding"
    fi
else
    print_warning "API server not running"
fi

echo ""
echo "=========================================="
echo "Diagnostic Summary:"
echo ""
echo "If you see errors above, try these solutions:"
echo ""
echo "1. Database initialization issues:"
echo "   python3 test_database.py init"
echo ""
echo "2. Permission issues:"
echo "   sudo chown -R \$USER:$USER logs/"
echo "   chmod 755 logs/"
echo ""
echo "3. Missing dependencies:"
echo "   source venv/bin/activate"
echo "   pip install -r requirements.txt"
echo ""
echo "4. Force database recreation:"
echo "   rm -f logs/wifi_attack_logs.db"
echo "   python3 test_database.py init"
echo ""
echo "5. Test with sample data:"
echo "   python3 test_database.py all"
echo ""
echo "=========================================="
