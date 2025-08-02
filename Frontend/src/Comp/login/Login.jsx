"use client"

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Shield, Eye, EyeOff, Lock, Mail } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Navigate to dashboard
navigate("/dashboard")
  }

  return (
    <div className="min-h-screen bg-[#0e0e0f] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#fd594e] rounded-sm animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-[#fd594e]" />
            <span className="text-xl font-bold text-white tracking-wide">Shakti</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Secure Access Portal</h1>
          <p className="text-[#b0b0b0] text-sm">Access your cybersecurity dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#c5c5c5] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#666]" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0e0e0f] border border-[#2e2e30] rounded-lg text-white placeholder-[#666] focus:outline-none focus:ring-2 focus:ring-[#fd594e] focus:border-transparent transition-all"
                  placeholder="admin@Shakti.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#c5c5c5] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#666]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-[#0e0e0f] border border-[#2e2e30] rounded-lg text-white placeholder-[#666] focus:outline-none focus:ring-2 focus:ring-[#fd594e] focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666] hover:text-[#fd594e] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#fd594e] hover:bg-[#e44e44] text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Access Dashboard
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-[#0e0e0f] border border-[#2e2e30] rounded-lg">
            <p className="text-xs text-[#666] mb-2">Demo Credentials:</p>
            <p className="text-xs text-[#b0b0b0]">Email: admin@Shakti.com</p>
            <p className="text-xs text-[#b0b0b0]">Password: SecurePass123</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-[#666]">
            Protected by enterprise-grade security • <span className="text-[#fd594e]">Shakti Solutions</span>
          </p>
        </div>
      </div>
    </div>
  )
}
