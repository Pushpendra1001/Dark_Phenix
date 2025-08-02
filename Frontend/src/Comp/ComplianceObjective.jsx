// import React from 'react';

// function ComplianceObjective() {
//   return (
//     <section className="bg-[#161518] text-white px-6 py-20">
//       <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
//         {/* Left Image */}
//         <div className="flex justify-center">
//           <img
//             src="/icons/compliance-core.png"
//             alt="Compliance Icon"
//             className="w-60 h-auto"
//           />
//         </div>

//         {/* Right Text */}
//         <div>
//           <h2 className="text-2xl md:text-5xl font-bold mb-4">
//             Our Compliance Advisory & <br />
//             Monitoring Services: Core Objective
//           </h2>
//           <p className="text-[#c5c5c5] text-sm leading-relaxed mb-4">
//             Unlike traditional compliance services that conclude once an audit is finished, Cyber Wise Guy’s Compliance Advisory & Monitoring services provide ongoing support, helping you navigate the complexities of compliance continuously. We maintain vigilant oversight of your compliance landscape, with real-time monitoring and immediate response to any emerging issues.
//           </p>
//           <p className="text-[#c5c5c5] text-sm leading-relaxed">
//             Our proactive approach aims to catch and resolve compliance gaps before they lead to legal complications or disrupt operations. This ensures you stay compliant while allowing you to focus on your business with confidence. Our service provides more than just continuity; it gives you a strategic advantage in a competitive market.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default ComplianceObjective;


import { Shield, Lock, Eye, AlertTriangle } from "lucide-react"

export default function CoreObjectives() {
  return (
    <section className="bg-[#161518] text-white px-6 py-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Visual */}
        <div className="flex justify-center order-2 lg:order-1">
          <div className="relative group hover:transform hover:scale-105 transition-all duration-500 ease-out cursor-pointer">
            {/* Central Shield */}
            <div className="w-60 h-60 bg-[#1a1a1c] border border-[#2e2e30] rounded-full flex items-center justify-center group-hover:border-[#fd594e]/50 group-hover:bg-[#1d1d1f] group-hover:shadow-[0_0_40px_rgba(253,89,78,0.2)] transition-all duration-500">
              <Shield className="w-32 h-32 text-[#fd594e] group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            </div>

            {/* Floating Icons */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#fd594e] rounded-full flex items-center justify-center animate-pulse group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(253,89,78,0.5)] transition-all duration-300">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#fd594e] rounded-full flex items-center justify-center animate-pulse group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(253,89,78,0.5)] transition-all duration-300"
              style={{ animationDelay: "1s" }}
            >
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div
              className="absolute top-1/2 -left-8 w-10 h-10 bg-[#fd594e] rounded-full flex items-center justify-center animate-pulse group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(253,89,78,0.5)] transition-all duration-300"
              style={{ animationDelay: "2s" }}
            >
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Right Text */}
        <div>
          <h2 className="text-2xl md:text-5xl font-bold mb-4">
            Shakti's Core <br />
            <span className="text-[#fd594e]">Protection Objectives</span>
          </h2>
          <p className="text-[#c5c5c5] text-sm leading-relaxed mb-4">
            Shakti isn’t just another cybersecurity layer — it’s your digital bodyguard. We secure your device from
            real-time threats, especially over risky public Wi-Fi, and ensure encrypted transmission of your personal
            data.
          </p>
          <p className="text-[#c5c5c5] text-sm leading-relaxed">
            Our goal is simple: prevent attacks before they happen. With live monitoring, instant threat alerts,
            encryption-first architecture, and invisible defense tech, Shakti keeps your digital presence safe — always
            on, always protected.
          </p>
        </div>
      </div>
    </section>
  )
}
