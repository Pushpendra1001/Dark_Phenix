from flask import Flask, jsonify, request, Response
from flask_cors import CORS
import subprocess
import os
import signal
from database import fetch_logs, get_latest_logs, clear_logs, init_db
import yaml
import socket
import sys
import logging
import re
import json
import time
import threading
from queue import Queue

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

try:
    with open("config.yaml") as f:
        config = yaml.safe_load(f)
except Exception as e:
    logging.error(f"Failed to load config.yaml: {e}")
    config = {}

app = Flask(__name__)
CORS(app)  

FIREWALL_SERVER_HOST = config.get("firewall_host", "127.0.0.1")
FIREWALL_SERVER_PORT = config.get("firewall_port", 9000)
SOCKET_TIMEOUT = config.get("socket_timeout", 5)

MAC_REGEX = re.compile(r"^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$")


live_data_queue = Queue()
sniffer_process = None
is_sniffing = False
sniffer_pid_file = "/tmp/widrsx_sniffer.pid"


# Initialize database on startup
try:
    if init_db():
        logging.info("Database initialization successful")
    else:
        logging.error("Database initialization failed")
except Exception as e:
    logging.error(f"Database initialization error: {e}")

@app.route("/")
def home():
    """API health check"""
    return jsonify({
        "status": "WIDRSX API Server Running",
        "version": "1.0",
        "endpoints": [
            "/status", "/start", "/stop", "/logs", "/logs/live", 
            "/logs/clear", "/block/<mac>", "/system/info", "/db/init"
        ]
    })

@app.route("/db/init")
def initialize_database():
    """Force database initialization"""
    try:
        if init_db():
            return jsonify({"status": "database initialized successfully"})
        else:
            return jsonify({"error": "database initialization failed"}), 500
    except Exception as e:
        logging.error(f"Database initialization error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/start")
def start_sniffer():
    global sniffer_process, is_sniffing
    try:
        if is_sniffing:
            return jsonify({"status": "already running"})
        
        
        python_executable = os.path.join("venv", "bin", "python3") if os.path.exists("venv/bin/python3") else sys.executable
        
        
        sniffer_process = subprocess.Popen(
            ["sudo", python_executable, "main.py"], 
            stdout=subprocess.PIPE, 
            stderr=subprocess.PIPE,
            preexec_fn=os.setsid  
        )
        
        
        with open(sniffer_pid_file, 'w') as f:
            f.write(str(sniffer_process.pid))
        
        is_sniffing = True
        logging.info(f"Sniffer started with PID: {sniffer_process.pid}")
        return jsonify({
            "status": "sniffing started", 
            "pid": sniffer_process.pid,
            "message": "Network packet capture initiated"
        })
    except Exception as e:
        logging.error(f"Failed to start sniffer: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/stop")
def stop_sniffer():
    global sniffer_process, is_sniffing
    try:
        if sniffer_process and is_sniffing:
            
            os.killpg(os.getpgid(sniffer_process.pid), signal.SIGTERM)
            sniffer_process.wait(timeout=10)
            is_sniffing = False
            
            
            if os.path.exists(sniffer_pid_file):
                os.remove(sniffer_pid_file)
            
            logging.info("Sniffer stopped.")
            return jsonify({
                "status": "sniffing stopped",
                "message": "Network packet capture terminated"
            })
        else:
            return jsonify({"status": "not running"})
    except subprocess.TimeoutExpired:
        
        if sniffer_process:
            os.killpg(os.getpgid(sniffer_process.pid), signal.SIGKILL)
            is_sniffing = False
        return jsonify({"status": "force stopped"})
    except Exception as e:
        logging.error(f"Failed to stop sniffer: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/status")
def get_status():
    global is_sniffing
    
    
    if is_sniffing and sniffer_process:
        if sniffer_process.poll() is not None:
            
            is_sniffing = False
    
    
    status_info = {
        "sniffing": is_sniffing,
        "pid": sniffer_process.pid if sniffer_process and is_sniffing else None,
        "interface": config.get("interface", "wlan1"),
        "api_port": config.get("api_port", 5000),
        "firewall_port": config.get("firewall_port", 9000)
    }
    
    
    try:
        interface = config.get("interface", "wlan1")
        result = subprocess.run(["iwconfig", interface], capture_output=True, text=True)
        if "Mode:Monitor" in result.stdout:
            status_info["monitor_mode"] = True
        else:
            status_info["monitor_mode"] = False
    except:
        status_info["monitor_mode"] = "unknown"
    
    return jsonify(status_info)

@app.route("/system/info")
def get_system_info():
    """Get system information for debugging"""
    try:
        info = {
            "platform": sys.platform,
            "python_version": sys.version,
            "working_directory": os.getcwd(),
            "config": config,
            "processes": {}
        }
        
        
        try:
            result = subprocess.run(["ps", "aux"], capture_output=True, text=True)
            widrsx_processes = [line for line in result.stdout.split('\n') if 'widrsx' in line or 'main.py' in line]
            info["processes"]["widrsx_related"] = widrsx_processes
        except:
            pass
            
        return jsonify(info)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/stream")
def stream():
    def event_stream():
        last_id = 0
        while True:
            try:
                
                logs = get_latest_logs(last_id)
                for log in logs:
                    data = {
                        "id": log[0],
                        "timestamp": log[1],
                        "mac": log[2],
                        "signal": log[3],
                        "channel": log[4],
                        "message": log[5]
                    }
                    yield f"data: {json.dumps(data)}\n\n"
                    last_id = max(last_id, log[0])
                
                time.sleep(1)  
            except Exception as e:
                logging.error(f"Stream error: {e}")
                yield f"data: {json.dumps({'error': str(e)})}\n\n"
                break
    
    return Response(event_stream(), mimetype="text/plain")

@app.route("/logs")
def get_logs():
    try:
        # Ensure database exists
        if not init_db():
            return jsonify({"error": "Database initialization failed"}), 500
            
        data = fetch_logs()
        if not data:
            # Return empty array instead of error for no data
            return jsonify([])
            
        logs = []
        for row in data:
            logs.append({
                "timestamp": row[0],
                "mac": row[1],
                "signal": row[2],
                "channel": row[3],
                "message": row[4]
            })
        return jsonify(logs)
    except Exception as e:
        logging.error(f"Failed to fetch logs: {e}")
        return jsonify({"error": str(e), "suggestion": "Try /db/init to initialize database"}), 500

@app.route("/logs/live")
def get_live_logs():
    """Get only the most recent logs for live updates"""
    try:
        # Ensure database exists
        if not init_db():
            return jsonify({"error": "Database initialization failed"}), 500
            
        data = fetch_logs(limit=10)
        if not data:
            # Return empty array instead of error for no data
            return jsonify([])
            
        logs = []
        for row in data:
            logs.append({
                "timestamp": row[0],
                "mac": row[1],
                "signal": row[2],
                "channel": row[3],
                "message": row[4]
            })
        return jsonify(logs)
    except Exception as e:
        logging.error(f"Failed to fetch live logs: {e}")
        return jsonify({"error": str(e), "suggestion": "Try /db/init to initialize database"}), 500

@app.route("/logs/clear", methods=["POST"])
def clear_all_logs():
    """Clear all logs from the database"""
    try:
        if clear_logs():
            return jsonify({"status": "logs cleared"})
        else:
            return jsonify({"error": "failed to clear logs"}), 500
    except Exception as e:
        logging.error(f"Failed to clear logs: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/block/<mac>")
def block_mac(mac):
    if not MAC_REGEX.match(mac):
        return jsonify({"error": "Invalid MAC address format"}), 400
    try:
        with socket.create_connection((FIREWALL_SERVER_HOST, FIREWALL_SERVER_PORT), timeout=SOCKET_TIMEOUT) as sock:
            sock.sendall((mac + "\n").encode())
            response = sock.recv(1024).decode()
        return jsonify({"status": response.strip()})
    except Exception as e:
        logging.error(f"Failed to block MAC {mac}: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=config.get("api_port", 5000), host='0.0.0.0', debug=config.get("debug", False))
