import { Wifi, LockKeyhole, ShieldCheck } from "lucide-react"

export default function Stats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-20 max-w-6xl mx-auto">
      {/* Wi-Fi Secured */}
      <div className="bg-[#1a1a1c] border border-[#2e2e30] p-6 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.2)] max-w-sm group hover:border-[#fd594e]/50 hover:shadow-[0_0_40px_rgba(253,89,78,0.15)] hover:bg-[#1d1d1f] transform hover:scale-[1.02] transition-all duration-500 ease-out cursor-pointer">
        <div className="flex items-center gap-3 mb-4">
          <Wifi className="w-8 h-8 text-[#fd594e] group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ease-out" />
          <h2 className="text-5xl font-semibold text-white group-hover:text-[#fd594e] transition-colors duration-300">
            10K+
          </h2>
        </div>
        <p className="text-base text-[#c5c5c5] leading-relaxed group-hover:text-[#d5d5d5] transition-colors duration-300">
          Public Wi-Fi connections secured. Shakti ensures your data remains protected — even on open, vulnerable networks.
        </p>
      </div>

      {/* Data Encrypted */}
      <div className="bg-[#1a1a1c] border border-[#2e2e30] p-6 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.2)] max-w-sm group hover:border-[#fd594e]/50 hover:shadow-[0_0_40px_rgba(253,89,78,0.15)] hover:bg-[#1d1d1f] transform hover:scale-[1.02] transition-all duration-500 ease-out cursor-pointer">
        <div className="flex items-center gap-3 mb-4">
          <LockKeyhole className="w-8 h-8 text-[#fd594e] group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ease-out" />
          <h2 className="text-5xl font-semibold text-white group-hover:text-[#fd594e] transition-colors duration-300">
            100%
          </h2>
        </div>
        <p className="text-base text-[#c5c5c5] leading-relaxed group-hover:text-[#d5d5d5] transition-colors duration-300">
          End-to-end data encryption. All transfers through Shakti are protected with industry-grade encryption protocols.
        </p>
      </div>

      {/* Threats Blocked */}
      <div className="bg-[#1a1a1c] border border-[#2e2e30] p-6 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.2)] max-w-sm group hover:border-[#fd594e]/50 hover:shadow-[0_0_40px_rgba(253,89,78,0.15)] hover:bg-[#1d1d1f] transform hover:scale-[1.02] transition-all duration-500 ease-out cursor-pointer">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="w-8 h-8 text-[#fd594e] group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ease-out" />
          <h2 className="text-5xl font-semibold text-white group-hover:text-[#fd594e] transition-colors duration-300">
            1M+
          </h2>
        </div>
        <p className="text-base text-[#c5c5c5] leading-relaxed group-hover:text-[#d5d5d5] transition-colors duration-300">
          Threats blocked in real-time. Shakti's active defense shields users from hackers, spoofing, and sniffing attacks.
        </p>
      </div>
    </div>
  )
}
