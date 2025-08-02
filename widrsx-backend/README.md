# WIDRSX Backend - WiFi Deauthentication Detection System

A Python-based backend system for detecting and monitoring WiFi deauthentication attacks and suspicious network activity.

## Features

- 🛡️ **Real-time WiFi Monitoring**: Detects deauthentication attacks and suspicious network activity
- 📊 **Web Dashboard**: RESTful API for frontend integration
- 🚫 **Device Blocking**: Ability to block suspicious MAC addresses via firewall
- 📝 **Logging**: SQLite database for storing network activity logs
- ⚡ **Real-time Updates**: Live monitoring with automatic log updates

## Prerequisites

- Python 3.7+
- Administrative/root privileges (required for network monitoring)
- WiFi adapter that supports monitor mode
- Windows/Linux operating system

## Installation

1. **Clone/Download the project**
   ```bash
   cd widrsx-backend
   ```

2. **Install dependencies**
   ```bash
   python setup.py
   ```
   Or manually:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure the system**
   Edit `config.yaml` to set your wireless interface:
   ```yaml
   interface: wlan1  # Your wireless interface name
   ```

## Configuration

### config.yaml Settings

- `interface`: Your wireless interface in monitor mode (e.g., wlan1, wlan0mon)
- `api_port`: Port for the Flask API server (default: 5000)
- `firewall_host/port`: Firewall server settings for device blocking
- `log_level`: Logging level (DEBUG, INFO, WARNING, ERROR)

## Usage

### 1. Start the API Server
```bash
python api_server.py
```
The API server will start on `http://localhost:5000`

### 2. Start Network Monitoring
```bash
python main.py
```
Or use the API endpoint: `GET http://localhost:5000/start`

### 3. Access the Dashboard
Open your frontend application and navigate to the Network Logs section.

## API Endpoints

### GET /logs
Retrieve all network activity logs
```json
[
  {
    "timestamp": "2025-08-02 10:29:57",
    "mac": "ce:23:25:e2:7c:fe", 
    "signal": "-60",
    "channel": "Unknown",
    "message": "DeAuthentication"
  }
]
```

### GET /start
Start the network monitoring process
```json
{"status": "sniffing started"}
```

### GET /block/{mac}
Block a specific MAC address
```json
{"status": "MAC address blocked"}
```

## Frontend Integration

The system is designed to work with the provided React frontend. Make sure:

1. Backend server is running on port 5000
2. Frontend can access `http://localhost:5000`
3. CORS is enabled (automatically configured)

## Security Considerations

- **Elevated Privileges**: Network monitoring requires admin/root access
- **Monitor Mode**: Your WiFi adapter must support monitor mode
- **Legal Compliance**: Only monitor networks you own or have permission to monitor
- **Firewall Integration**: Device blocking requires proper firewall configuration

## Troubleshooting

### Common Issues

1. **Permission Denied**
   - Run with elevated privileges (sudo on Linux, Run as Administrator on Windows)

2. **Interface Not Found**
   - Check your wireless interface name: `ip link show` (Linux) or `netsh wlan show interfaces` (Windows)
   - Ensure the interface supports monitor mode

3. **No Packets Captured**
   - Verify monitor mode is enabled
   - Check if there's actual WiFi traffic in your area
   - Ensure proper permissions

4. **Frontend Connection Issues**
   - Verify backend is running on port 5000
   - Check firewall settings
   - Ensure CORS is properly configured

### Logs and Debugging

- Enable debug mode in `config.yaml`: `debug: true`
- Check application logs for detailed error information
- Database logs are stored in `logs/wifi_attack_logs.db`

## File Structure

```
widrsx-backend/
├── api_server.py       # Flask API server
├── main.py            # Network monitoring script
├── database.py        # Database operations
├── config.yaml        # Configuration file
├── requirements.txt   # Python dependencies
├── setup.py          # Setup script
└── logs/             # Log files directory
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational and security research purposes. Use responsibly and in compliance with local laws and regulations.
