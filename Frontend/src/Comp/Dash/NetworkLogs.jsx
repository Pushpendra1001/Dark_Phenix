import { useState, useEffect } from 'react';
import { AlertTriangle, Shield, Wifi, Ban, RefreshCw, Clock } from 'lucide-react';

// Helper function to group logs by MAC address and summarize activity
const summarizeLogs = (logs) => {
  const summary = {};
  
  logs.forEach(log => {
    if (!summary[log.mac]) {
      summary[log.mac] = {
        lastSeen: log.timestamp,
        messageCount: 1,
        messages: [log.message],
        signals: [parseInt(log.signal)],
        channels: new Set([log.channel]),
        alerts: []
      };
    } else {
      const entry = summary[log.mac];
      entry.messageCount++;
      entry.messages.push(log.message);
      entry.signals.push(parseInt(log.signal));
      entry.channels.add(log.channel);
      
      // Check for unusual activity
      if (log.message === "DeAuthentication") {
        entry.alerts.push({
          type: "DeAuth Attack",
          timestamp: log.timestamp
        });
      }
    }
  });

  return Object.entries(summary).map(([mac, data]) => ({
    mac,
    lastSeen: data.lastSeen,
    messageCount: data.messageCount,
    avgSignal: Math.round(data.signals.reduce((a, b) => a + b, 0) / data.signals.length),
    channels: Array.from(data.channels),
    alerts: data.alerts,
    mostFrequentMessage: getMostFrequent(data.messages)
  }));
};

const getMostFrequent = (arr) => {
  const counts = {};
  let maxCount = 0;
  let maxItem = null;

  for (const item of arr) {
    counts[item] = (counts[item] || 0) + 1;
    if (counts[item] > maxCount) {
      maxCount = counts[item];
      maxItem = item;
    }
  }

  return maxItem;
};

export default function NetworkLogs() {
  const [logs, setLogs] = useState([]);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [blockedMacs, setBlockedMacs] = useState(new Set());
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [snifferStatus, setSnifferStatus] = useState('unknown');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setRefreshing(true);
        const response = await fetch('http://localhost:5000/logs');
        if (!response.ok) throw new Error('Failed to fetch logs');
        const data = await response.json();
        setLogs(data);
        setSummary(summarizeLogs(data));
        setLastUpdate(new Date());
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching logs:', err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };

    fetchLogs();
    // Poll for new logs every 5 seconds
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBlockMac = async (mac) => {
    try {
      setRefreshing(true);
      const response = await fetch(`http://localhost:5000/block/${mac}`);
      if (!response.ok) throw new Error('Failed to block MAC address');
      const result = await response.json();
      setBlockedMacs(prev => new Set([...prev, mac]));
      alert(`MAC address ${mac} has been blocked successfully!`);
    } catch (err) {
      alert(`Failed to block MAC address: ${err.message}`);
      console.error('Error blocking MAC:', err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleStartSniffer = async () => {
    try {
      setRefreshing(true);
      const response = await fetch('http://localhost:5000/start');
      if (!response.ok) throw new Error('Failed to start sniffer');
      const result = await response.json();
      setSnifferStatus('running');
      alert('Network sniffer started successfully!');
    } catch (err) {
      alert(`Failed to start sniffer: ${err.message}`);
      console.error('Error starting sniffer:', err);
    } finally {
      setRefreshing(false);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now - time) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  if (loading) return (
    <div className="bg-[#0e0e0f] text-white p-6">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2">
          <RefreshCw className="w-6 h-6 animate-spin text-[#fd594e]" />
          <span>Loading network logs...</span>
        </div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="bg-[#0e0e0f] text-white p-6">
      <div className="max-w-7xl mx-auto text-center">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
          <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-red-400">Connection Error</h3>
          <p className="text-red-300">Unable to connect to backend server: {error}</p>
          <p className="text-sm text-gray-400 mt-2">
            Make sure the backend server is running on localhost:5000
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#0e0e0f] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Wifi className="w-6 h-6 text-[#fd594e]" />
              Network Activity Monitor
              {refreshing && <RefreshCw className="w-4 h-4 animate-spin text-[#fd594e]" />}
            </h2>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleStartSniffer}
                disabled={refreshing}
                className="bg-[#fd594e] hover:bg-[#e54e44] disabled:bg-gray-600 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
              >
                <Shield className="w-4 h-4" />
                Start Network Monitoring
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-[#c5c5c5] bg-[#1a1a1c] p-3 rounded-lg">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
            <div>Total Devices: {summary.length}</div>
            <div>Active Threats: {summary.reduce((acc, device) => acc + device.alerts.length, 0)}</div>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${
                logs.length > 0 ? 'bg-green-500' : 'bg-gray-500'
              }`}></div>
              Status: {logs.length > 0 ? 'Active' : 'No Activity'}
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {summary.length === 0 ? (
            <div className="bg-[#1a1a1c] border border-[#2c2c2e] rounded-lg p-8 text-center">
              <Wifi className="w-12 h-12 text-[#4a4a4c] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#c5c5c5] mb-2">No Network Activity</h3>
              <p className="text-[#8a8a8c]">
                No deauthentication attacks or suspicious activity detected.
              </p>
            </div>
          ) : (
            summary.map((device) => {
              const isBlocked = blockedMacs.has(device.mac);
              const threatLevel = device.alerts.length > 10 ? 'high' : device.alerts.length > 5 ? 'medium' : 'low';
              
              return (
                <div
                  key={device.mac}
                  className={`bg-[#1a1a1c] border rounded-lg p-4 transition-colors duration-300 ${
                    isBlocked 
                      ? 'border-gray-600 opacity-75' 
                      : threatLevel === 'high' 
                        ? 'border-red-500' 
                        : threatLevel === 'medium' 
                          ? 'border-yellow-500' 
                          : 'border-[#2c2c2e] hover:border-[#fd594e]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium flex items-center gap-2">
                        <Shield className={`w-4 h-4 ${
                          isBlocked ? 'text-gray-500' : 
                          threatLevel === 'high' ? 'text-red-500' : 
                          threatLevel === 'medium' ? 'text-yellow-500' : 
                          'text-[#fd594e]'
                        }`} />
                        MAC: {device.mac}
                        {isBlocked && (
                          <span className="bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs">
                            BLOCKED
                          </span>
                        )}
                      </h3>
                      <div className="mt-2 text-sm text-[#c5c5c5] grid gap-1">
                        <p>Last Seen: {formatTimeAgo(device.lastSeen)}</p>
                        <p>Signal Strength: {device.avgSignal} dBm</p>
                        <p>Total Messages: {device.messageCount}</p>
                        <p>Channels: {device.channels.join(", ") || "Unknown"}</p>
                        <p>Activity: {device.mostFrequentMessage}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {device.alerts.length > 0 && (
                        <div className={`px-3 py-2 rounded-md flex items-center gap-2 ${
                          threatLevel === 'high' ? 'bg-red-900/30 text-red-400' :
                          threatLevel === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                          'bg-orange-900/30 text-orange-400'
                        }`}>
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {device.alerts.length} Alert{device.alerts.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                      
                      {!isBlocked && device.alerts.length > 0 && (
                        <button
                          onClick={() => handleBlockMac(device.mac)}
                          disabled={refreshing}
                          className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors"
                        >
                          <Ban className="w-3 h-3" />
                          Block Device
                        </button>
                      )}
                    </div>
                  </div>

                  {device.alerts.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[#2c2c2e]">
                      <div className="text-sm text-red-400">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="font-medium">Security Alerts:</span>
                        </div>
                        <ul className="space-y-1 pl-6">
                          {device.alerts.slice(-5).map((alert, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs">
                              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                              {alert.type} - {formatTimeAgo(alert.timestamp)}
                            </li>
                          ))}
                          {device.alerts.length > 5 && (
                            <li className="text-gray-400 italic">
                              ... and {device.alerts.length - 5} more alerts
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
