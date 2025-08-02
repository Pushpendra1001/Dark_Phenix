@echo off
echo Starting WIDRSX Backend Server...
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% == 0 (
    echo Running with Administrator privileges ✓
) else (
    echo WARNING: Not running as Administrator
    echo Network monitoring may require elevated privileges
    echo.
)

REM Check if config.yaml exists
if not exist "config.yaml" (
    echo ERROR: config.yaml not found
    echo Please make sure you're in the correct directory
    pause
    exit /b 1
)

REM Install requirements if needed
if not exist "venv\" (
    echo Setting up virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing requirements...
pip install -r requirements.txt

echo.
echo Starting Flask API server on http://localhost:5000
echo Press Ctrl+C to stop the server
echo.

python api_server.py

pause
