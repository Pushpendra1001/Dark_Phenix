// import React from 'react';
// import Nav from './Nav';
// import { ArrowRight } from 'lucide-react';
// import CyberServices from './CyberServices';
// import ComplianceObjective from './ComplianceObjective';
// import ComplianceBenefits from './ComplianceBenefits';
// import EngagementProcess from './EngagementProcess';
// import NewsletterSubscribe from './NewsletterSubscribe';
// import Footer from './Footer';

// function Home() {
//     return (
//         <div className="bg-[#0e0e0f] text-white min-h-screen">
//             <Nav />

//             {/* Hero Section */}
//             <div className="flex flex-col items-center justify-center text-center px-6 py-20 relative  h-[80vh]">
//                 <h1 className="text-3xl md:text-5xl font-bold mb-6">
//                     Your Reliable <br /> Cybersecurity Advisors
//                 </h1>
//                 <p className="max-w-2xl text-[#b0b0b0] text-sm md:text-base leading-relaxed mb-6">
//                     Specializing in thorough assessments, customized solutions, and ongoing support, we are committed to helping you establish and sustain a strong digital defense. As a leading cybersecurity firm in Dallas and Fort Worth, our mission is to protect your digital infrastructure with exceptional expertise and steadfast dedication.
//                 </p>
//                 <button className="bg-[#fd594e] hover:bg-[#e44e44] px-6 py-2 rounded-full flex items-center gap-2 text-white text-sm font-semibold transition">
//                     Book a Call <ArrowRight className="w-4 h-4" />
//                 </button>

//                 {/* Fake SVG line effects with icons */}
//                 <div className="absolute inset-0 pointer-events-none z-[-1] hidden md:block">
//                     {/* Placeholder for background SVGs or lines, for visual feel */}
//                 </div>
//             </div>

//             {/* Stats Section */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-20 max-w-6xl mx-auto">
//                 <div className="bg-[#1a1a1c] border border-[#2e2e30] p-6 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.2)] max-w-sm">
//                     <h2 className="text-5xl font-semibold text-white mb-4">24</h2>
//                     <p className="text-base text-[#c5c5c5] leading-relaxed">
//                         We offer a range of frameworks with a customized approach, ensuring you not only meet industry standards but surpass them.
//                     </p>
//                 </div>
//                 <div className="bg-[#1a1a1c] border border-[#2e2e30] p-6 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.2)] max-w-sm">
//                     <h2 className="text-5xl font-semibold text-white mb-4">24</h2>
//                     <p className="text-base text-[#c5c5c5] leading-relaxed">
//                         We offer a range of frameworks with a customized approach, ensuring you not only meet industry standards but surpass them.
//                     </p>
//                 </div><div className="bg-[#1a1a1c] border border-[#2e2e30] p-6 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.2)] max-w-sm">
//                     <h2 className="text-5xl font-semibold text-white mb-4">24</h2>
//                     <p className="text-base text-[#c5c5c5] leading-relaxed">
//                         We offer a range of frameworks with a customized approach, ensuring you not only meet industry standards but surpass them.
//                     </p>
//                 </div>
//             </div>
//             <ComplianceObjective/>
//             <ComplianceBenefits/>
//             <EngagementProcess/>
//             <CyberServices />
//             <NewsletterSubscribe/>
//             <Footer/>
//         </div>
//     );
// }

// export default Home;



import Nav from "./Nav"
import Hero from "./Hero"
import Stats from "./stats"
import ComplianceObjective from "./ComplianceObjective"
import ComplianceBenefits from "./ComplianceBenefits"
import EngagementProcess from "./EngagementProcess"
import CyberServices from "./CyberServices"
import NewsletterSubscribe from "./NewsletterSubscribe"
import Footer from "./Footer"

export default function Home() {
  return (
    <div className="bg-[#0e0e0f] text-white min-h-screen">
      <div
        className="bg-cover bg-center  w-full"
        style={{ backgroundImage: "url('/back2.png')" }}
      >        <Nav />

        <Hero />
        <Stats />
      </div>
      <main>

        <ComplianceObjective />
        <ComplianceBenefits />
        <EngagementProcess />
        <CyberServices />
        <NewsletterSubscribe />
      </main>
      <Footer />
    </div>
  )
}
