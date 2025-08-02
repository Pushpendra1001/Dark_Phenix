import sqlite3
from datetime import datetime
import os
import logging

DB_DIR = "logs"
DB_PATH = os.path.join(DB_DIR, "wifi_attack_logs.db")

logging.basicConfig(level=logging.INFO)

def ensure_db_dir():
    if not os.path.exists(DB_DIR):
        os.makedirs(DB_DIR)
        logging.info(f"Created directory: {DB_DIR}")

def init_db():
    ensure_db_dir()
    try:
        with sqlite3.connect(DB_PATH) as conn:
            c = conn.cursor()
            c.execute('''
                CREATE TABLE IF NOT EXISTS logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp TEXT,
                    mac TEXT,
                    signal TEXT,
                    channel TEXT,
                    message TEXT
                )
            ''')
            conn.commit()
            
            # Verify table was created
            c.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='logs'")
            if c.fetchone():
                logging.info("Database initialized successfully - 'logs' table exists.")
            else:
                logging.error("Failed to create 'logs' table.")
                return False
        return True
    except Exception as e:
        logging.error(f"Failed to initialize database: {e}")
        return False

def insert_log(mac, signal, channel, message):
    ensure_db_dir()
    # Ensure database is initialized before inserting
    init_db()
    try:
        with sqlite3.connect(DB_PATH) as conn:
            c = conn.cursor()
            c.execute("INSERT INTO logs (timestamp, mac, signal, channel, message) VALUES (?, ?, ?, ?, ?)",
                      (datetime.now().strftime("%Y-%m-%d %H:%M:%S"), mac, signal, channel, message))
            conn.commit()
        logging.info(f"Inserted log for MAC: {mac}")
    except Exception as e:
        logging.error(f"Failed to insert log: {e}")

def fetch_logs(limit=50):
    ensure_db_dir()
    # Ensure database is initialized before fetching
    if not init_db():
        return []
    try:
        with sqlite3.connect(DB_PATH) as conn:
            c = conn.cursor()
            c.execute("SELECT timestamp, mac, signal, channel, message FROM logs ORDER BY id DESC LIMIT ?", (limit,))
            rows = c.fetchall()
        return rows
    except Exception as e:
        logging.error(f"Failed to fetch logs: {e}")
        return []

def get_latest_logs(last_id=0):
    """Get logs newer than the given ID for real-time streaming"""
    ensure_db_dir()
    # Ensure database is initialized before fetching
    if not init_db():
        return []
    try:
        with sqlite3.connect(DB_PATH) as conn:
            c = conn.cursor()
            c.execute("SELECT id, timestamp, mac, signal, channel, message FROM logs WHERE id > ? ORDER BY id ASC", (last_id,))
            rows = c.fetchall()
        return rows
    except Exception as e:
        logging.error(f"Failed to fetch latest logs: {e}")
        return []

def clear_logs():
    """Clear all logs from the database"""
    ensure_db_dir()
    # Ensure database is initialized before clearing
    if not init_db():
        return False
    try:
        with sqlite3.connect(DB_PATH) as conn:
            c = conn.cursor()
            c.execute("DELETE FROM logs")
            conn.commit()
        logging.info("All logs cleared.")
        return True
    except Exception as e:
        logging.error(f"Failed to clear logs: {e}")
        return False
