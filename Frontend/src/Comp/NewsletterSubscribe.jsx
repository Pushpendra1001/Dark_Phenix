// import React, { useState } from 'react';
// import { CheckCircle2 } from 'lucide-react';

// function NewsletterSubscribe() {
//   const [submitted, setSubmitted] = useState(false);

//   return (
//     <section className="bg-[#0e0e0f] px-4 py-24 relative z-10 overflow-hidden">
//       {/* Background ambient flare */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute left-1/2 top-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#fd594e] via-[#a746ef] to-[#4b79f5] opacity-[0.08] rounded-full blur-[120px] transform -translate-x-1/2 -translate-y-1/2" />
//       </div>

//       {/* Card Container */}
//       <div className="relative z-10 max-w-5xl mx-auto bg-[#131314]/70 border border-[#29292b] rounded-2xl p-10 sm:p-14 backdrop-blur-xl shadow-[0_0_80px_#00000040]">
        
//         {/* Headline */}
//         <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white leading-tight mb-4">
//           Looking for the latest{' '}
//           <span className="bg-gradient-to-r from-[#fd594e] via-[#a746ef] to-[#4b79f5] bg-clip-text text-transparent">
//             cybersecurity
//           </span>{' '}
//           insights?
//         </h2>

//         <p className="text-center text-[#a1a1a6] text-sm mb-10">
//           Join 500+ subscribers staying ahead with expert updates and real-world security tips.
//         </p>

//         {/* Email Form */}
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             setSubmitted(true);
//             setTimeout(() => setSubmitted(false), 4000); // Reset after 4 sec
//           }}
//           className="flex flex-col sm:flex-row items-center justify-center gap-4"
//         >
//           <input
//             type="email"
//             placeholder="Enter your email"
//             required
//             className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1c1c1f] border border-[#2f2f30] text-sm text-white placeholder-[#666] focus:outline-none focus:ring-2 focus:ring-[#fd594e] transition-all"
//           />
//           <button
//             type="submit"
//             className={`flex items-center justify-center gap-2 bg-[#fd594e] hover:bg-[#ff6b60] px-6 py-3 rounded-full text-sm font-medium text-white shadow-md transition-all duration-200 ${
//               submitted && 'pointer-events-none opacity-80'
//             }`}
//           >
//             {submitted ? (
//               <>
//                 <CheckCircle2 className="w-4 h-4" /> Subscribed
//               </>
//             ) : (
//               'Subscribe'
//             )}
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }

// export default NewsletterSubscribe;


"use client"

import { useState } from "react"
import { CheckCircle2, Shield, Lock, Eye } from "lucide-react"

export default function ShaktiThreatPulse() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="bg-[#0e0e0f] px-4 py-24 relative z-10 overflow-hidden">
      {/* Ambient flare and icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 w-[600px] h-[600px] bg-[#fd594e]/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <Shield className="absolute top-20 left-20 w-8 h-8 text-[#fd594e] animate-pulse opacity-10" />
        <Lock className="absolute top-40 right-20 w-6 h-6 text-[#fd594e] animate-pulse opacity-10" style={{ animationDelay: "1s" }} />
        <Eye className="absolute bottom-40 left-20 w-7 h-7 text-[#fd594e] animate-pulse opacity-10" style={{ animationDelay: "2s" }} />
      </div>

      {/* Card Container */}
      <div className="relative z-10 max-w-5xl mx-auto bg-[#131314]/70 border border-[#2a2a2c] rounded-2xl p-10 sm:p-14 backdrop-blur-2xl shadow-[0_0_80px_#00000030] hover:border-[#fd594e]/30 hover:shadow-[0_0_100px_rgba(253,89,78,0.12)] hover:bg-[#18181a]/80 transform hover:scale-[1.01] transition-all duration-700 ease-out">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white leading-tight mb-4">
          Stay <span className="text-[#fd594e]">One Step Ahead</span> of Hackers
        </h2>
        <p className="text-center text-[#a1a1a6] text-sm mb-10 max-w-xl mx-auto">
          Get weekly alerts about Wi-Fi attacks, data thefts, zero-day exploits, and tips to stay protected. Straight from Shakti HQ. No spam ever.
        </p>

        {/* Email Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
            setTimeout(() => setSubmitted(false), 4000)
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            placeholder="Your email stays private with Shakti"
            required
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1c1c1f] border border-[#2f2f30] text-sm text-white placeholder-[#777] focus:outline-none focus:ring-2 focus:ring-[#fd594e] transition-all"
          />
          <button
            type="submit"
            className={`flex items-center justify-center gap-2 bg-[#fd594e] hover:bg-[#ff6b60] px-6 py-3 rounded-full text-sm font-medium text-white shadow-md transition-all duration-200 group ${
              submitted && "pointer-events-none opacity-80"
            }`}
          >
            {submitted ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                You're In!
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                Subscribe Free
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
