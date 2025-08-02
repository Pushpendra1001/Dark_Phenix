#!/usr/bin/env python3
"""
Setup script for WIDRSX Backend
Installs required Python packages and sets up the environment
"""

import subprocess
import sys
import os

def install_requirements():
    """Install required Python packages"""
    print("Installing Python requirements...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Python requirements installed successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install requirements: {e}")
        return False

def check_permissions():
    """Check if running with appropriate permissions for network monitoring"""
    if os.name == 'nt':  # Windows
        print("⚠️  Note: On Windows, you may need to run as Administrator for network monitoring")
        return True
    else:  # Linux/Unix
        if os.geteuid() != 0:
            print("⚠️  Warning: Not running as root. Network monitoring may require elevated privileges")
            print("   Consider running with: sudo python setup.py")
        return True

def main():
    print("WIDRSX Backend Setup")
    print("=" * 50)
    
    # Check current directory
    if not os.path.exists("requirements.txt"):
        print("❌ requirements.txt not found. Please run this script from the widrsx-backend directory")
        sys.exit(1)
    
    # Check permissions
    check_permissions()
    
    # Install requirements
    if not install_requirements():
        sys.exit(1)
    
    print("\n✅ Setup completed successfully!")
    print("\nNext steps:")
    print("1. Configure your wireless interface in config.yaml")
    print("2. Make sure your wireless adapter supports monitor mode")
    print("3. Start the API server: python api_server.py")
    print("4. Start the frontend application")
    print("\nNote: Network monitoring requires elevated privileges on most systems")

if __name__ == "__main__":
    main()
