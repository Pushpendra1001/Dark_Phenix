// import React from 'react';
// import { CheckCircle } from 'lucide-react';

// const benefits = [
//   'Reduces risk of legal penalties and fines',
//   'Builds reputation and strengthens stakeholder trust',
//   'Optimizes operations by implementing compliance best practices',
//   'Delivers monitoring and actionable recommendations for compliance issues',
// ];

// function ComplianceBenefits() {
//   return (
//     <section className="bg-[#161518] text-white px-6 py-16">
//       <div className="max-w-7xl mx-auto flex gap-10">
//         {/* Left Text */}
//         <div className='w-[60%]'>
//           <h2 className="text-2xl md:text-5xl font-bold mb-4">
//             Benefits of Choosing Cyber Wise Guy 
//             for Compliance Advisory & Monitoring
//           </h2>
//           <p className="text-[#c5c5c5] text-sm leading-relaxed">
//             Choosing Cyber Wise Guy for your compliance needs means partnering with a team dedicated to protecting your business’s operational integrity, legal standing, and reputation. Unlike traditional compliance services that end with a single audit, we offer a proactive, continuous partnership focused on sustaining and enhancing your compliance posture over time.
//           </p>
//         </div>

//         {/* Right Box */}
//         <div className="bg-[#1a1a1c] border border-[#2c2c2e] p-6 rounded-2xl shadow-lg">
//           <ul className="space-y-4">
//             {benefits.map((item, idx) => (
//               <li key={idx} className="flex items-start gap-3">
//                 <CheckCircle className="text-[#fd594e] w-5 h-5 mt-0.5" />
//                 <span className="text-sm text-[#c5c5c5]">{item}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default ComplianceBenefits;


import { CheckCircle, Shield, Lock, Eye, Zap } from "lucide-react"

const benefits = [
  "Encrypts all your data instantly — even on public Wi-Fi",
  "Blocks malicious trackers and sniffers in real-time",
  "Monitors threats live with zero setup required",
  "Lightweight, always-on protection with zero performance drop",
]

export default function WhyChooseShakti() {
  return (
    <section className="bg-[#161518] text-white px-6 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-start">
        {/* Left Text */}
        <div className="md:w-[60%]">
          <h2 className="text-2xl md:text-5xl font-bold mb-4 leading-tight">
            Why Choose <span className="text-[#fd594e]">Shakti</span> <br />
            for Your Everyday Digital Protection
          </h2>
          <p className="text-[#c5c5c5] text-sm leading-relaxed">
            Shakti isn’t just for enterprises — it’s for **everyone** who connects to the internet.
            From students in cafes to professionals working remotely, our smart protection shields
            you from hackers, sniffers, and data thieves with no learning curve or setup required.
          </p>
        </div>

        {/* Right Benefit Box */}
        <div className="bg-[#1a1a1c] border border-[#2c2c2e] p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-[#fd594e]/50 hover:shadow-[0_0_30px_rgba(253,89,78,0.1)] hover:bg-[#1d1d1f] transform hover:scale-[1.02] transition-all duration-500 ease-out cursor-pointer w-full md:w-[40%]">
          {/* Background pulse grid */}
          <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
            <div className="grid grid-cols-8 gap-2 h-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[#fd594e] rounded-sm animate-pulse group-hover:animate-none group-hover:bg-[#fd594e] transition-all duration-300"
                  style={{ animationDelay: `${i * 0.05}s` }}
                />
              ))}
            </div>
          </div>

          <ul className="space-y-4 relative z-10">
            {benefits.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 group/item hover:translate-x-2 transition-all duration-300 ease-out"
              >
                <div className="flex-shrink-0 w-5 h-5 mt-0.5 relative">
                  <CheckCircle className="text-[#fd594e] w-5 h-5 group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-300 ease-out" />
                  {idx === 0 && (
                    <Lock className="absolute -top-1 -right-1 w-3 h-3 text-[#fd594e] opacity-50 group-hover/item:opacity-100 transition-opacity duration-300" />
                  )}
                  {idx === 1 && (
                    <Eye className="absolute -top-1 -right-1 w-3 h-3 text-[#fd594e] opacity-50 group-hover/item:opacity-100 transition-opacity duration-300" />
                  )}
                  {idx === 2 && (
                    <Shield className="absolute -top-1 -right-1 w-3 h-3 text-[#fd594e] opacity-50 group-hover/item:opacity-100 transition-opacity duration-300" />
                  )}
                  {idx === 3 && (
                    <Zap className="absolute -top-1 -right-1 w-3 h-3 text-[#fd594e] opacity-50 group-hover/item:opacity-100 transition-opacity duration-300" />
                  )}
                </div>
                <span className="text-sm text-[#c5c5c5] group-hover/item:text-[#d5d5d5] transition-colors duration-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
