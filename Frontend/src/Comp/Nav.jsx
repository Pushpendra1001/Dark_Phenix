// import React from 'react';
// import { Mail, Phone, Linkedin, Instagram, Facebook } from 'lucide-react';

// function Nav() {
//   return (
//     <div className="text-[#afaeae] text-sm w-full">
//       {/* Top bar */}
//       <div className="bg-[#1d1d20] px-6 py-2 flex justify-between items-center">
//         <p className="hidden sm:block">
//           Secure Your Business Future, Today. Contact Us For A Free Consultation.
//         </p>

//         <div className="flex items-center gap-4 text-xs">
//           <div className="flex items-center gap-1">
//             <Phone className="w-4 h-4" />
//             <span>+9187123456</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Mail className="w-4 h-4" />
//             <span>info@cyberwiseguy.com</span>
//           </div>
//           <div className="flex items-center gap-2 ml-2">
//             <a href="#" aria-label="LinkedIn"><Linkedin className="w-4 h-4" /></a>
//             <a href="#" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
//             <a href="#" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
//           </div>
//         </div>
//       </div>

//       {/* Main nav */}
//       <div className="bg-[#111111] px-6 py-3 flex items-center justify-between">
//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <span className="text-xs font-semibold tracking-wide">Shakti</span>
//         </div>

//         {/* Nav links */}
//         <div className="hidden md:flex gap-6 text-sm font-medium">
//           <a href="#">Home</a>
//           <a href="#">Services <span className="inline-block">▼</span></a>
//           <a href="#">About</a>
//           <a href="#">FAQ</a>
//           <a href="#">Blog</a>
//           <a href="#">Contact Us</a>
//         </div>

//         {/* Right-side buttons */}
//         <div className="flex items-center gap-4 text-sm">
//           <a href="#" className="text-white hover:underline">Client Portal</a>
//           <a
//             href="#"
//             className="border border-red-500 px-4 py-1.5 rounded-full text-white hover:bg-red-500 hover:text-white transition"
//           >
//             Get A Quote
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Nav;



"use client"

import { useState } from "react"
import { Mail, Phone, Linkedin, Instagram, Facebook, Menu, X } from "lucide-react"

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="text-[#afaeae] text-sm w-full">
      {/* Top bar */}
      <div className="bg-[#1d1d20] px-6 py-2 flex justify-between items-center">
        <p className="hidden sm:block">Secure Your Business Future, Today. Contact Us For A Free Consultation.</p>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            <span>+9187123456</span>
          </div>
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            <span>info@cyberwiseguy.com</span>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <a href="#" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4 hover:text-[#fd594e] transition-colors" />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram className="w-4 h-4 hover:text-[#fd594e] transition-colors" />
            </a>
            <a href="#" aria-label="Facebook">
              <Facebook className="w-4 h-4 hover:text-[#fd594e] transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-[#111111] px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold tracking-wide">Shakti</span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#" className="hover:text-white transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Services <span className="inline-block">▼</span>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            About
          </a>
          <a href="#" className="hover:text-white transition-colors">
            FAQ
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Blog
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contact Us
          </a>
        </div>

        {/* Right-side buttons */}
        <div className="flex items-center gap-4 text-sm">
          <a href="#" className="text-white hover:underline">
            Client Portal
          </a>
          <a
            href="/login"
            className="border border-[#fd594e] px-4 py-1.5 rounded-full text-white hover:bg-[#fd594e] hover:text-white transition"
          >
             login
          </a>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#111111] border-t border-[#2e2e30] px-6 py-4">
          <div className="flex flex-col gap-4">
            <a href="#" className="text-white hover:text-[#fd594e] transition-colors">
              Home
            </a>
            <a href="#" className="text-white hover:text-[#fd594e] transition-colors">
              Services
            </a>
            <a href="#" className="text-white hover:text-[#fd594e] transition-colors">
              About
            </a>
            <a href="#" className="text-white hover:text-[#fd594e] transition-colors">
              FAQ
            </a>
            <a href="#" className="text-white hover:text-[#fd594e] transition-colors">
              Blog
            </a>
            <a href="#" className="text-white hover:text-[#fd594e] transition-colors">
              Contact Us
            </a>
            <a href="#" className="text-white hover:text-[#fd594e] transition-colors border-t border-[#2e2e30] pt-4">
              Client Portal
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
