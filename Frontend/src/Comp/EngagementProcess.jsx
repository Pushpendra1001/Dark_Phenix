// import React from 'react';
// import {
//   Calendar,
//   FileText,
//   Layers,
//   ShieldCheck,
// } from 'lucide-react';

// const steps = [
//   {
//     icon: <Calendar className="w-6 h-6 text-[#fd594e]" />,
//     title: 'Book a Free Consultation',
//     description:
//       'Take advantage of our retainer services, with scheduled calls and continuous email support, to maintain a strong cybersecurity posture.',
//   },
//   {
//     icon: <FileText className="w-6 h-6 text-[#fd594e]" />,
//     title: 'Get a Customized Plan',
//     description:
//       'Receive a tailored action plan with services crafted to meet your unique needs.',
//   },
//   {
//     icon: <Layers className="w-6 h-6 text-[#fd594e]" />,
//     title: 'Choose Your Custom Services',
//     description:
//       'Select the services that best match your business’s cybersecurity goals.',
//   },
//   {
//     icon: <ShieldCheck className="w-6 h-6 text-[#fd594e]" />,
//     title: 'Project Success',
//     description:
//       'We implement your chosen services, strengthening your cybersecurity posture effectively.',
//   },
// ];

// function EngagementProcess() {
//   return (
//     <section className="bg-[#0e0e0f] text-white px-6 py-20">
//       <div className="max-w-6xl mx-auto text-center">
//         <p className="text-sm text-[#c5c5c5] uppercase tracking-wide mb-2">
//           Our Engagement Process
//         </p>
//         <h2 className="text-2xl md:text-3xl font-bold mb-16">
//           Efficient, client-centered solutions from <br className="hidden md:block" />
//           initial consultation to final implementation.
//         </h2>

//         {/* Step Cards */}
//         <div className="relative">
//           {/* Connecting Line */}
//           <div className="hidden md:block absolute top-3 left-0 w-full h-0.5 bg-[#2c2c2e] z-0" />

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
//             {steps.map((step, i) => (
//               <div key={i} className="flex flex-col items-center text-center relative">
//                 {/* Dot */}
//                 <div className="w-3 h-3 rounded-full bg-[#c5c5c5] border-2 border-[#0e0e0f] mb-6 mt-2" />
                
//                 {/* Icon */}
//                 <div className="mb-4">{step.icon}</div>

//                 {/* Title & Description */}
//                 <h3 className="text-base font-semibold mb-2">{step.title}</h3>
//                 <p className="text-sm text-[#c5c5c5] leading-relaxed">
//                   {step.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default EngagementProcess;

import { Calendar, FileText, Layers, ShieldCheck, Lock, Eye, Zap, AlertTriangle } from "lucide-react"

const steps = [
  {
    icon: <Calendar className="w-6 h-6 text-[#fd594e]" />,
    title: "Quick Sign-Up",
    description: "Create your Shakti account in seconds. No technical knowledge or configuration needed to get started.",
  },
  {
    icon: <FileText className="w-6 h-6 text-[#fd594e]" />,
    title: "Personalized Shield",
    description: "Shakti auto-adjusts your protection based on your network behavior — no manual settings required.",
  },
  {
    icon: <Layers className="w-6 h-6 text-[#fd594e]" />,
    title: "Activate Protection",
    description: "One-click activation encrypts all traffic and blocks threats — even on unsafe public Wi-Fi.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#fd594e]" />,
    title: "Stay Secure 24/7",
    description: "Shakti runs silently in the background, monitoring threats in real-time so you can browse fearlessly.",
  },
]

export default function ShaktiOnboardingFlow() {
  return (
    <section className="bg-[#0e0e0f] text-white px-6 py-20 relative overflow-hidden">
      {/* Background cyber elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-10 left-10">
          <Lock className="w-6 h-6 text-[#fd594e] animate-pulse" />
        </div>
        <div className="absolute top-20 right-20">
          <Eye className="w-8 h-8 text-[#fd594e] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        <div className="absolute bottom-20 left-20">
          <Zap className="w-7 h-7 text-[#fd594e] animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
        <div className="absolute bottom-10 right-10">
          <AlertTriangle className="w-5 h-5 text-[#fd594e] animate-pulse" style={{ animationDelay: "0.5s" }} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <p className="text-sm text-[#c5c5c5] uppercase tracking-wide mb-2">Getting Started with Shakti</p>
        <h2 className="text-2xl md:text-3xl font-bold mb-16">
          From activation to real-time defense — <br className="hidden md:block" />
          cybersecurity made effortless.
        </h2>

        {/* Step Cards */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-3 left-0 w-full h-0.5 bg-[#2c2c2e] z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fd594e] to-transparent opacity-50 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center relative group hover:transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer"
              >
                {/* Dot glow */}
                <div className="w-3 h-3 rounded-full bg-[#fd594e] border-2 border-[#0e0e0f] mb-6 mt-2 shadow-[0_0_10px_rgba(253,89,78,0.5)] group-hover:shadow-[0_0_25px_rgba(253,89,78,0.8)] group-hover:scale-125 transition-all duration-300 ease-out" />

                {/* Icon Box */}
                <div className="mb-4 relative">
                  <div className="w-16 h-16 bg-[#1a1a1c] border border-[#2c2c2e] rounded-full flex items-center justify-center group-hover:border-[#fd594e] group-hover:bg-[#1d1d1f] group-hover:shadow-[0_0_20px_rgba(253,89,78,0.2)] transition-all duration-300 ease-out">
                    {step.icon}
                  </div>

                  {/* Floating micro icons */}
                  {i === 0 && (
                    <Lock className="absolute -top-1 -right-1 w-3 h-3 text-[#fd594e] opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  )}
                  {i === 1 && (
                    <Eye className="absolute -top-1 -right-1 w-3 h-3 text-[#fd594e] opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  )}
                  {i === 2 && (
                    <Zap className="absolute -top-1 -right-1 w-3 h-3 text-[#fd594e] opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  )}
                  {i === 3 && (
                    <ShieldCheck className="absolute -top-1 -right-1 w-3 h-3 text-[#fd594e] opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  )}
                </div>

                {/* Step Content */}
                <h3 className="text-base font-semibold mb-2 group-hover:text-[#fd594e] transition-colors duration-300 ease-out">
                  {step.title}
                </h3>
                <p className="text-sm text-[#c5c5c5] leading-relaxed group-hover:text-[#d5d5d5] transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
