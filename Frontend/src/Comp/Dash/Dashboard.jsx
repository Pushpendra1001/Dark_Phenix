"use client"

import { useState, useEffect } from "react"
import { Shield, Wifi, AlertTriangle, Activity, Users, Lock, TrendingUp, TrendingDown, Layers } from "lucide-react"
import NetworkLogs from './NetworkLogs';

// Mock WiFi data
const generateWiFiData = () => {
  const networks = [
    { name: "Shakti-Main", type: "Corporate" },
    { name: "Shakti-Guest", type: "Guest" },
    { name: "IoT-Devices", type: "IoT" },
    { name: "Conference-Room", type: "Meeting" },
    { name: "Executive-Floor", type: "Executive" },
  ]

  return networks.map((network, index) => ({
    id: index + 1,
    ...network,
    status: Math.random() > 0.3 ? "Active" : "Error",
    connectedDevices: Math.floor(Math.random() * 50) + 5,
    signalStrength: Math.floor(Math.random() * 40) + 60,
    dataUsage: (Math.random() * 500 + 100).toFixed(1),
    threats: Math.floor(Math.random() * 5),
    lastSeen: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString(),
    encryption: Math.random() > 0.1 ? "WPA3" : "WPA2",
    bandwidth: (Math.random() * 800 + 200).toFixed(0),
  }))
}

export default function Dashboard() {
  const [wifiData, setWifiData] = useState(generateWiFiData())
  const [selectedNetwork, setSelectedNetwork] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setWifiData(generateWiFiData())
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const totalDevices = wifiData.reduce((sum, network) => sum + network.connectedDevices, 0)
  const activeNetworks = wifiData.filter((network) => network.status === "Active").length
  const totalThreats = wifiData.reduce((sum, network) => sum + network.threats, 0)
  const avgSignal = Math.round(wifiData.reduce((sum, network) => sum + network.signalStrength, 0) / wifiData.length)

  return (
    <div className="min-h-screen bg-[#0e0e0f]">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Layers className="w-8 h-8 text-[#fd594e]" />
            Network Security Dashboard
          </h1>
          <p className="mt-2 text-[#c5c5c5]">
            Monitor network activity and security alerts in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#1a1a1c] border border-[#2e2e30] p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <Wifi className="w-6 h-6 text-[#fd594e]" />
              <span className="text-sm text-[#b0b0b0]">Active Networks</span>
            </div>
            <div className="text-3xl font-bold text-white">{activeNetworks}</div>
            <div className="text-xs text-green-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              +2 from yesterday
            </div>
          </div>

          <div className="bg-[#1a1a1c] border border-[#2e2e30] p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-[#fd594e]" />
              <span className="text-sm text-[#b0b0b0]">Connected Devices</span>
            </div>
            <div className="text-3xl font-bold text-white">{totalDevices}</div>
            <div className="text-xs text-green-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              +12 from last hour
            </div>
          </div>

          <div className="bg-[#1a1a1c] border border-[#2e2e30] p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-6 h-6 text-[#fd594e]" />
              <span className="text-sm text-[#b0b0b0]">Security Threats</span>
            </div>
            <div className="text-3xl font-bold text-white">{totalThreats}</div>
            <div className="text-xs text-red-400 flex items-center gap-1 mt-1">
              <TrendingDown className="w-3 h-3" />
              -3 from yesterday
            </div>
          </div>

          <div className="bg-[#1a1a1c] border border-[#2e2e30] p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-6 h-6 text-[#fd594e]" />
              <span className="text-sm text-[#b0b0b0]">Avg Signal Strength</span>
            </div>
            <div className="text-3xl font-bold text-white">{avgSignal}%</div>
            <div className="text-xs text-green-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              +5% from last check
            </div>
          </div>
        </div>

        {/* WiFi Networks Table */}
        <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#2e2e30]">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Wifi className="w-5 h-5 text-[#fd594e]" />
              WiFi Network Status
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#161518]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#b0b0b0] uppercase tracking-wider">
                    Network
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#b0b0b0] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#b0b0b0] uppercase tracking-wider">
                    Devices
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#b0b0b0] uppercase tracking-wider">
                    Signal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#b0b0b0] uppercase tracking-wider">
                    Data Usage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#b0b0b0] uppercase tracking-wider">
                    Threats
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#b0b0b0] uppercase tracking-wider">
                    Encryption
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#b0b0b0] uppercase tracking-wider">
                    Bandwidth
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2e2e30]">
                {wifiData.map((network) => (
                  <tr key={network.id} className="hover:bg-[#1d1d1f] transition-colors cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Wifi className="w-4 h-4 text-[#fd594e]" />
                        <div>
                          <div className="text-sm font-medium text-white">{network.name}</div>
                          <div className="text-xs text-[#b0b0b0]">{network.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          network.status === "Active" ? "bg-green-900 text-green-200" : "bg-red-900 text-red-200"
                        }`}
                      >
                        {network.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c5c5c5]">{network.connectedDevices}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-[#2e2e30] rounded-full h-2">
                          <div
                            className="bg-[#fd594e] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${network.signalStrength}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-[#c5c5c5]">{network.signalStrength}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c5c5c5]">{network.dataUsage} GB</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {network.threats > 0 && <AlertTriangle className="w-4 h-4 text-red-400" />}
                        <span className={`text-sm ${network.threats > 0 ? "text-red-400" : "text-green-400"}`}>
                          {network.threats}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Lock className="w-3 h-3 text-[#fd594e]" />
                        <span className="text-sm text-[#c5c5c5]">{network.encryption}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c5c5c5]">{network.bandwidth} Mbps</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="mt-8 bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#fd594e]" />
            Recent Security Alerts
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-[#161518] rounded-lg border border-[#2e2e30]">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-white">Handshake Detected on Shakti Main</p>
                <p className="text-xs text-[#b0b0b0]">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#161518] rounded-lg border border-[#2e2e30]">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-white">High bandwidth usage detected on Shakti Main</p>
                <p className="text-xs text-[#b0b0b0]">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#161518] rounded-lg border border-[#2e2e30]">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-white">Security patch applied to Shakti Main network</p>
                <p className="text-xs text-[#b0b0b0]">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>

        <NetworkLogs />
      </div>
    </div>
  )
}
