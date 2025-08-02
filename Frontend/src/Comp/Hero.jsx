// import { ArrowRight, Shield } from "lucide-react"
// import HeroBackgroundPattern from "./hero-background-pattern" // Import the new component

// export default function Hero() {
//   return (
//     <section className="flex flex-col items-center justify-center text-center px-6 py-20 relative h-[80vh] overflow-hidden">
//       {/* Background pattern from image */}
//       <div className="absolute inset-0 z-[-1]">
//         <HeroBackgroundPattern /> {/* Use the new SVG pattern component */}
//         {/* Subtle overlay to darken and blend */}
//         <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0f] via-transparent to-[#0e0e0f] opacity-70" />
//       </div>

//       <h1 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">
//         Your Reliable <br />
//         <span className="text-[#fd594e]">Cybersecurity</span> Advisors
//       </h1>

//       <p className="max-w-2xl text-[#b0b0b0] text-sm md:text-base leading-relaxed mb-6 relative z-10">
//         Specializing in thorough assessments, customized solutions, and ongoing support, we are committed to helping you
//         establish and sustain a strong digital defense. As a leading cybersecurity firm in Dallas and Fort Worth, our
//         mission is to protect your digital infrastructure with exceptional expertise and steadfast dedication.
//       </p>

//       <button className="bg-[#fd594e] hover:bg-[#e44e44] px-6 py-2 rounded-full flex items-center gap-2 text-white text-sm font-semibold transition group relative z-10">
//         <Shield className="w-4 h-4 group-hover:rotate-12 transition-transform" />
//         Book a Call
//         <ArrowRight className="w-4 h-4" />
//       </button>
//     </section>
//   )
// }

import { ArrowRight, Shield } from "lucide-react"
import { Link } from "react-router-dom"


export default function Hero() {
  return (
    <section
      className="relative h-[80vh] px-6 py-20 flex flex-col items-center justify-center text-center overflow-hidden "
    >
   
      {/* Blurred Gradient Blobs */}
      <div className="absolute inset-0 z-[-3] overflow-hidden">
        <div className="absolute w-[30rem] h-[30rem] bg-[#fd594e]/30 rounded-full blur-3xl blob top-[10%] left-[-10%]" />
        <div className="absolute w-[25rem] h-[25rem] bg-[#fd594e]/20 rounded-full blur-2xl blob blob-delay-2000 top-[50%] left-[60%]" />
        <div className="absolute w-[20rem] h-[20rem] bg-[#fd594e]/25 rounded-full blur-2xl blob blob-delay-4000 top-[70%] left-[30%]" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0f] via-transparent to-[#0e0e0f] opacity-80 z-[-1]" />

      {/* Text Content */}
      <h1 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">
        Shielding Your <br />
        <span className="text-[#fd594e]">Digital Life</span> with Shakti
      </h1>

      <p className="max-w-2xl text-[#b0b0b0] text-sm md:text-base leading-relaxed mb-6 relative z-10">
        Shakti protects your personal data, even on unsecured Wi-Fi. With military-grade encryption, real-time defense,
        and threat detection, you stay safe from hackers, trackers, and data theft — no matter where you connect from.
      </p>

   <Link to="/login">
  <button className="bg-[#fd594e] hover:bg-[#e44e44] px-6 py-2 rounded-full flex items-center gap-2 text-white text-sm font-semibold transition group relative z-10">
    <Shield className="w-4 h-4 group-hover:rotate-12 transition-transform" />
    Lets started
    <ArrowRight className="w-4 h-4" />
  </button>
</Link>
    </section>
  )
}
