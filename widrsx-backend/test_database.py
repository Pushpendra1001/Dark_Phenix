#!/usr/bin/env python3

"""
Database test and initialization script for WIDRSX
"""

import sys
import os
import sqlite3
from datetime import datetime

# Add the current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import init_db, insert_log, fetch_logs, clear_logs, DB_PATH, ensure_db_dir

def test_database():
    print("=== WIDRSX Database Test ===")
    print(f"Database path: {DB_PATH}")
    
    # Test 1: Check if directory exists
    print("\n1. Checking database directory...")
    ensure_db_dir()
    if os.path.exists(os.path.dirname(DB_PATH)):
        print("✓ Database directory exists")
    else:
        print("✗ Database directory missing")
        return False
    
    # Test 2: Initialize database
    print("\n2. Initializing database...")
    if init_db():
        print("✓ Database initialized successfully")
    else:
        print("✗ Database initialization failed")
        return False
    
    # Test 3: Check if database file exists
    print("\n3. Checking database file...")
    if os.path.exists(DB_PATH):
        print(f"✓ Database file exists: {DB_PATH}")
    else:
        print("✗ Database file not found")
        return False
    
    # Test 4: Check table structure
    print("\n4. Checking table structure...")
    try:
        with sqlite3.connect(DB_PATH) as conn:
            c = conn.cursor()
            c.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='logs'")
            if c.fetchone():
                print("✓ 'logs' table exists")
                
                # Check table schema
                c.execute("PRAGMA table_info(logs)")
                columns = c.fetchall()
                print("   Table schema:")
                for col in columns:
                    print(f"     {col[1]} ({col[2]})")
            else:
                print("✗ 'logs' table not found")
                return False
    except Exception as e:
        print(f"✗ Error checking table: {e}")
        return False
    
    # Test 5: Insert test data
    print("\n5. Testing data insertion...")
    try:
        insert_log("AA:BB:CC:DD:EE:FF", "-50", "6", "Test Message")
        print("✓ Test data inserted")
    except Exception as e:
        print(f"✗ Failed to insert test data: {e}")
        return False
    
    # Test 6: Fetch data
    print("\n6. Testing data retrieval...")
    try:
        logs = fetch_logs(limit=5)
        print(f"✓ Retrieved {len(logs)} log entries")
        if logs:
            print("   Latest log:")
            latest = logs[0]
            print(f"     Timestamp: {latest[0]}")
            print(f"     MAC: {latest[1]}")
            print(f"     Signal: {latest[2]}")
            print(f"     Channel: {latest[3]}")
            print(f"     Message: {latest[4]}")
    except Exception as e:
        print(f"✗ Failed to fetch data: {e}")
        return False
    
    print("\n✓ All database tests passed!")
    return True

def create_sample_data():
    """Create some sample data for testing"""
    print("\n=== Creating Sample Data ===")
    
    sample_data = [
        ("AA:BB:CC:DD:EE:11", "-45", "1", "DeAuthentication"),
        ("AA:BB:CC:DD:EE:22", "-52", "6", "DeAuthentication"),
        ("AA:BB:CC:DD:EE:33", "-38", "11", "Probe Request"),
        ("AA:BB:CC:DD:EE:44", "-60", "1", "DeAuthentication"),
        ("AA:BB:CC:DD:EE:55", "-41", "6", "Association"),
    ]
    
    for mac, signal, channel, message in sample_data:
        try:
            insert_log(mac, signal, channel, message)
            print(f"✓ Inserted: {mac} - {message}")
        except Exception as e:
            print(f"✗ Failed to insert {mac}: {e}")
    
    print(f"\n✓ Sample data creation complete")

def show_logs():
    """Display current logs"""
    print("\n=== Current Logs ===")
    try:
        logs = fetch_logs(limit=20)
        if not logs:
            print("No logs found in database")
            return
        
        print(f"Found {len(logs)} log entries (showing latest):")
        print("-" * 80)
        print(f"{'Timestamp':<20} {'MAC Address':<18} {'Signal':<8} {'Ch':<3} {'Message'}")
        print("-" * 80)
        
        for log in logs:
            print(f"{log[0]:<20} {log[1]:<18} {log[2]:<8} {log[3]:<3} {log[4]}")
    except Exception as e:
        print(f"Error fetching logs: {e}")

def clear_all_data():
    """Clear all data from database"""
    print("\n=== Clearing All Data ===")
    try:
        if clear_logs():
            print("✓ All logs cleared successfully")
        else:
            print("✗ Failed to clear logs")
    except Exception as e:
        print(f"✗ Error clearing logs: {e}")

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 test_database.py [command]")
        print("\nCommands:")
        print("  test     - Run database tests")
        print("  init     - Initialize database")
        print("  sample   - Create sample data")
        print("  show     - Show current logs")
        print("  clear    - Clear all logs")
        print("  all      - Run test, create sample data, and show logs")
        return
    
    command = sys.argv[1].lower()
    
    if command == "test":
        test_database()
    elif command == "init":
        print("Initializing database...")
        if init_db():
            print("✓ Database initialized successfully")
        else:
            print("✗ Database initialization failed")
    elif command == "sample":
        init_db()
        create_sample_data()
    elif command == "show":
        show_logs()
    elif command == "clear":
        clear_all_data()
    elif command == "all":
        if test_database():
            create_sample_data()
            show_logs()
    else:
        print(f"Unknown command: {command}")

if __name__ == "__main__":
    main()
