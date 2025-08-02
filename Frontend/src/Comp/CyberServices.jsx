// import React from 'react';
// import { ArrowRight } from 'lucide-react';

// const services = [
//   {
//     title: 'Virtual CISO Services',
//     description:
//       'Strengthen your cybersecurity posture with our vCISO services. Our expert guidance in strategic security planning, risk management, and compliance keeps your business secure and ahead of threats.',
//     image: './img1.png',
//   },
//   {
//     title: 'Managed Cyber Security',
//     description:
//       'Our 24/7 services secure your digital assets with advanced threat detection, real-time monitoring, and full cybersecurity management.',
//     image: '/icons/cybersecurity.png',
//   },
//   {
//     title: 'Compliance Advisory & Monitoring',
//     description:
//       'Easily achieve and maintain industry compliance with our advisory and monitoring services, providing framework guidance and continuous compliance checks.',
//     image: '/icons/compliance.png',
//   },
//   {
//     title: 'Vulnerability Management',
//     description:
//       'Strengthen your cybersecurity with our comprehensive vulnerability management services, featuring IT asset and web application scans alongside actionable remediation strategies.',
//     image: '/icons/vulnerability.png',
//   },
// ];

// function CyberServices() {
//   return (
//     <section className="bg-[#0e0e0f] text-white px-6 py-20">
//       {/* Header */}
//       <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12">
//         <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">
//           We Provide Tailored Cybersecurity <br /> Services for Small Businesses
//         </h2>
//         <a
//           href="#"
//           className="mt-6 md:mt-0 bg-[#fd594e] hover:bg-[#e44e44] text-white px-6 py-2 rounded-full flex items-center gap-2 text-sm font-semibold transition"
//         >
//           Book a Call <ArrowRight className="w-4 h-4" />
//         </a>
//       </div>

//       {/* Services Grid */}
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
//         {services.map((service, index) => (
//           <div
//             key={index}
//             className="bg-[#1a1a1c] border border-[#2c2c2e] p-6 rounded-2xl shadow-lg flex flex-col items-start"
//           >
//             <img
//               src={service.image}
//               alt={service.title}
//               className="w-82 h-82 object-contain mb-6"
//             />
//             <h3 className="text-white text-lg font-semibold mb-2">
//               {service.title}
//             </h3>
//             <p className="text-[#b0b0b0] text-sm leading-relaxed">
//               {service.description}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default CyberServices;


import { ArrowRight, Shield, Eye, Lock, Zap } from "lucide-react"

const services = [
  {
    title: "Wi-Fi Intrusion Shield",
    description:
      "Auto-detects and blocks threats on public and private networks. Whether at home, in a café, or on the move — your connection stays protected.",
    icon: <Shield className="w-12 h-12 text-[#fd594e]" />,
  },
  {
    title: "Real-Time Threat Watch",
    description:
      "Monitors suspicious activity in real-time and neutralizes threats before they can access your data. No setup, just peace of mind.",
    icon: <Eye className="w-12 h-12 text-[#fd594e]" />,
  },
  {
    title: "Encrypted Traffic Tunnels",
    description:
      "All your traffic is instantly encrypted — no one sees what you browse, share, or store. Shakti ensures total privacy by default.",
    icon: <Lock className="w-12 h-12 text-[#fd594e]" />,
  },
  {
    title: "Lightning-Fast Security",
    description:
      "Runs silently in the background without slowing you down. Lightweight, powerful, and always-on — just like it should be.",
    icon: <Zap className="w-12 h-12 text-[#fd594e]" />,
  },
]

export default function ShaktiProtectionServices() {
  return (
    <section className="bg-[#0e0e0f] text-white px-6 py-20">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left leading-snug">
          Powerful Everyday <span className="text-[#fd594e]">Protection</span> <br />
          That Moves With You
        </h2>
        <a
          href="#"
          className="mt-6 md:mt-0 bg-[#fd594e] hover:bg-[#e44e44] text-white px-6 py-2 rounded-full flex items-center gap-2 text-sm font-semibold transition group"
        >
          <Shield className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          Get Started
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-[#1a1a1c] border border-[#2c2c2e] p-6 lg:p-8 rounded-2xl shadow-lg flex flex-col items-start group hover:border-[#fd594e]/50 hover:shadow-[0_0_40px_rgba(253,89,78,0.15)] hover:bg-[#1d1d1f] transform hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 ease-out relative overflow-hidden cursor-pointer"
          >
            {/* Animated pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none">
              <div className="grid grid-cols-4 gap-1 h-full">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#fd594e] rounded-sm animate-pulse group-hover:animate-none transition-all duration-300"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6 relative z-10 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300 ease-out">
              {service.icon}
            </div>
            <h3 className="text-white text-lg font-semibold mb-2 group-hover:text-[#fd594e] transition-colors duration-300 relative z-10">
              {service.title}
            </h3>
            <p className="text-[#b0b0b0] text-sm leading-relaxed relative z-10 group-hover:text-[#c0c0c0] transition-colors duration-300">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
