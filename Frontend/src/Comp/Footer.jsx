// import React from 'react';
// import {
//   Phone,
//   Mail,
//   MapPin,
//   ArrowRight,
//   Instagram,
//   Facebook,
//   Linkedin,
//   Lock
// } from 'lucide-react';

// const Footer = () => {
//   return (
//     <footer className="bg-[#0b0b0c] text-white px-6 py-16 border-t border-[#1e1e1f]">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">

//         {/* Contact Info Cards */}
//         <div className="space-y-8">
//           {/* Phone */}
//           <div>
//             <div className="flex items-center gap-3 mb-1">
//               <Phone className="w-4 h-4" />
//               <span className="font-semibold">+9187123456</span>
//             </div>
//             <div className="flex justify-between text-sm text-[#a0a0a0] border-b border-[#2a2a2b] pb-1">
//               <span>Call For A Consultation</span>
//               <ArrowRight className="w-4 h-4" />
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <div className="flex items-center gap-3 mb-1">
//               <Mail className="w-4 h-4" />
//               <span className="font-semibold">@cyberwiseguy.com</span>
//             </div>
//             <div className="flex justify-between text-sm text-[#a0a0a0] border-b border-[#2a2a2b] pb-1">
//               <span>Send Us A Message</span>
//               <ArrowRight className="w-4 h-4" />
//             </div>
//           </div>

//           {/* Location */}
//           <div>
//             <div className="flex items-center gap-3 mb-1">
//               <MapPin className="w-4 h-4" />
//               <span className="font-semibold">Elm Street, Dallas, TX</span>
//             </div>
//             <div className="flex justify-between text-sm text-[#a0a0a0] border-b border-[#2a2a2b] pb-1">
//               <span>Address</span>
//               <ArrowRight className="w-4 h-4" />
//             </div>
//           </div>
//         </div>

//         {/* Brand Section */}
//         <div className="space-y-6 text-sm">
//           <div className="flex items-center gap-2">
//             <Lock className="w-5 h-5" />
//             <span className="font-semibold tracking-widest">Shakti</span>
//           </div>
//           <p className="text-[#a0a0a0]">
//             Empower your business with tailored cybersecurity solutions. Navigate the digital landscape with confidence.
//           </p>

//           {/* Socials */}
//           <div className="flex items-center gap-4 pt-2">
//             <Instagram className="w-4 h-4 text-white hover:text-[#fd594e] cursor-pointer" />
//             <Facebook className="w-4 h-4 text-white hover:text-[#fd594e] cursor-pointer" />
//             <Linkedin className="w-4 h-4 text-white hover:text-[#fd594e] cursor-pointer" />
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div className="grid grid-cols-2 gap-8 text-sm">
//           <div>
//             <h4 className="font-semibold mb-3">Quick Links</h4>
//             <ul className="space-y-2 text-[#c0c0c0]">
//               <li>About</li>
//               <li>Blog</li>
//               <li>Services</li>
//               <li>Contact</li>
//               <li>Privacy Policy</li>
//               <li>Terms of Service</li>
//               <li>Client Portal</li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="font-semibold mb-3">Services</h4>
//             <ul className="space-y-2 text-[#c0c0c0]">
//               <li>Cyber Risk Assessment</li>
//               <li>Compliance Advisory</li>
//               <li>Managed Cyber Security</li>
//               <li>Vulnerability Management</li>
//               <li>Penetration Testing</li>
//               <li>Policies & Procedures</li>
//               <li>vCISO Services</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Note (Optional) */}
//       <div className="text-center text-xs text-[#666] pt-6 border-t border-[#1e1e1f]">
//         © {new Date().getFullYear()} Shakti. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import { Phone, Mail, MapPin, ArrowRight, Instagram, Facebook, Linkedin, Lock, Shield, Eye, Zap } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-[#0b0b0c] text-white px-6 py-16 border-t border-[#1e1e1f] relative overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fd594e]/5 to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute inset-0 bg-gradient-to-l from-transparent via-[#fd594e]/5 to-transparent rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 relative z-10">
        {/* Contact Info Cards */}
        <div className="space-y-8">
          {/* Phone */}
          <div className="group hover:transform hover:translate-x-2 transition-all duration-300 ease-out cursor-pointer">
            <div className="flex items-center gap-3 mb-1">
              <Phone className="w-4 h-4 text-[#fd594e] group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold group-hover:text-[#fd594e] transition-colors duration-300">
                +9187123456
              </span>
            </div>
            <div className="flex justify-between text-sm text-[#a0a0a0] border-b border-[#2a2a2b] pb-1 group-hover:border-[#fd594e]/50 group-hover:text-[#b0b0b0] transition-all duration-300">
              <span>Call For Security Consultation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 group-hover:text-[#fd594e] transition-all duration-300" />
            </div>
          </div>

          {/* Email */}
          <div className="group hover:transform hover:translate-x-2 transition-all duration-300 ease-out cursor-pointer">
            <div className="flex items-center gap-3 mb-1">
              <Mail className="w-4 h-4 text-[#fd594e] group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold group-hover:text-[#fd594e] transition-colors duration-300">
                info@cyberwiseguy.com
              </span>
            </div>
            <div className="flex justify-between text-sm text-[#a0a0a0] border-b border-[#2a2a2b] pb-1 group-hover:border-[#fd594e]/50 group-hover:text-[#b0b0b0] transition-all duration-300">
              <span>Send Security Inquiry</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 group-hover:text-[#fd594e] transition-all duration-300" />
            </div>
          </div>

          {/* Location */}
          <div className="group hover:transform hover:translate-x-2 transition-all duration-300 ease-out cursor-pointer">
            <div className="flex items-center gap-3 mb-1">
              <MapPin className="w-4 h-4 text-[#fd594e] group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold group-hover:text-[#fd594e] transition-colors duration-300">
                Elm Street, Dallas, TX
              </span>
            </div>
            <div className="flex justify-between text-sm text-[#a0a0a0] border-b border-[#2a2a2b] pb-1 group-hover:border-[#fd594e]/50 group-hover:text-[#b0b0b0] transition-all duration-300">
              <span>Cybersecurity HQ</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 group-hover:text-[#fd594e] transition-all duration-300" />
            </div>
          </div>
        </div>

        {/* Brand Section */}
        <div className="space-y-6 text-sm">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#fd594e]" />
            <span className="font-semibold tracking-widest">Shakti</span>
          </div>
          <p className="text-[#a0a0a0]">
            Empower your business with advanced cybersecurity solutions. Navigate the digital threat landscape with
            confidence and protect your critical assets from cyber attacks.
          </p>

          {/* Socials with security theme */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#fd594e]" />
              <span className="text-xs text-[#666]">Secured Social:</span>
            </div>
            <Instagram className="w-4 h-4 text-white hover:text-[#fd594e] cursor-pointer transition-colors" />
            <Facebook className="w-4 h-4 text-white hover:text-[#fd594e] cursor-pointer transition-colors" />
            <Linkedin className="w-4 h-4 text-white hover:text-[#fd594e] cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#fd594e]" />
              Quick Links
            </h4>
            <ul className="space-y-2 text-[#c0c0c0]">
              <li className="hover:text-[#fd594e] transition-colors cursor-pointer">About</li>
              <li className="hover:text-[#fd594e] transition-colors cursor-pointer">Security Blog</li>
              <li className="hover:text-[#fd594e] transition-colors cursor-pointer">Services</li>
              <li className="hover:text-[#fd594e] transition-colors cursor-pointer">Contact</li>
              <li className="hover:text-[#fd594e] transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-[#fd594e] transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-[#fd594e] transition-colors cursor-pointer">Secure Client Portal</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#fd594e]" />
              Security Services
            </h4>
            <ul className="space-y-2 text-[#c0c0c0]">
              <li className="hover:text-[#fd594e] transition-colors cursor-pointer">Cyber Risk Assessment</li>
              <li className="hover:text-[#fd594e] transition-colors cursor-pointer">Compliance Advisory</li>
              <li className="hover:text-[#fd594e] transition-colors cursor-pointer">Managed Cyber Security</li>
              <li className="hover:text-[#fd594e] transition-colors cursor-pointer">Vulnerability Management</li>
              <li className="hover:text-[#fd594e] transition-colors cursor-pointer">Penetration Testing</li>
              <li className="hover:text-[#fd594e] transition-colors cursor-pointer">Security Policies</li>
              <li className="hover:text-[#fd594e] transition-colors cursor-pointer">vCISO Services</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-center text-xs text-[#666] pt-6 border-t border-[#1e1e1f] relative z-10">
        © {new Date().getFullYear()} Shakti. All rights reserved. | Protecting businesses from cyber
        threats since 2020.
      </div>
    </footer>
  )
}

export default Footer
