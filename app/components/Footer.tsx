import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
const currentYear = new Date().getFullYear();

return (
<footer className="relative border-t border-white/10 bg-[#0B0F0E] pt-20 pb-10 overflow-hidden">

  {/* 1. FIX: TECH GRID BACKGROUND (100% VISIBLE NOW) */}
  <div className="absolute inset-0 pointer-events-none z-0">
    {/* Main Grid - Boosted Opacity */}
    <div 
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(45, 212, 191, 0.15) 1px, transparent 1px), 
          linear-gradient(to bottom, rgba(45, 212, 191, 0.15) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    />
    {/* Diagonal Tech Lines - Boosted Opacity */}
    <div 
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: "repeating-linear-gradient(45deg, rgba(45, 212, 191, 0.15) 0, rgba(45, 212, 191, 0.15) 1px, transparent 1px, transparent 40px)",
        backgroundSize: "60px 60px",
      }}
    />
    {/* Fading Edges so it blends smoothly (Tailwind v4 syntax fixed) */}
    <div className="absolute inset-0 bg-linear-to-t from-[#0B0F0E] via-transparent to-[#0B0F0E]" />
    <div className="absolute inset-0 bg-linear-to-r from-[#0B0F0E] via-transparent to-[#0B0F0E]" />
  </div>

  {/* AMBIENT GLOWS */}
  <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-teal-500/20 to-transparent z-0" />
  <div className="absolute bottom-0 right-0 w-150 h-150 bg-teal-500/5 blur-[150px] rounded-full pointer-events-none translate-x-1/3 translate-y-1/3 z-0" />

  <div className="relative z-10 mx-auto max-w-7xl px-6">
    
    {/* TOP GRID SECTION */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
      
      {/* Column 1: Brand & Logo */}
      <div className="lg:pr-6">
        
        {/* LOGO & TEXT ALIGNMENT */}
        <Link href="/" className="inline-flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity">
          {/* Logo Image (shrink-0 syntax fixed) */}
          <div className="relative w-12 h-12 shrink-0">
            <Image 
              src="/logo/logo.png" 
              alt="Globalcore Tech Logo" 
              width={48} 
              height={48} 
              className="object-contain"
            />
          </div>
          {/* Brand Text (Inline Design) */}
          <div className="flex items-center pt-1">
            <span className="text-white font-bold text-2xl tracking-wide uppercase">
              Globalcore
            </span>
            <span className="text-teal-400 font-light text-2xl tracking-wide uppercase ml-1">
              Tech
            </span>
          </div>
        </Link>
        
        <p className="text-neutral-400 text-base leading-relaxed">
          We build scalable software and AI-powered solutions that help businesses grow with confidence.
        </p>
      </div>

      {/* Column 2: Company */}
      <div>
        <h4 className="text-white text-lg font-semibold mb-6">Company</h4>
        <ul className="space-y-4">
          {["About Us", "Services", "Contact"].map((item) => (
            <li key={item}>
              <Link href="#" className="text-neutral-400 hover:text-teal-400 transition-colors text-base">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 3: Services */}
      <div>
        <h4 className="text-white text-lg font-semibold mb-6">Services</h4>
        <ul className="space-y-4">
          {["Web & App Development", "Custom Software", "AI & Automation", "SaaS Products"].map((item) => (
            <li key={item}>
              <Link href="#" className="text-neutral-400 hover:text-teal-400 transition-colors text-base">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 4: Get in touch */}
      <div>
        <h4 className="text-white text-lg font-semibold mb-6">Get in touch</h4>
        <ul className="space-y-5">
          <li>
            <a href="mailto:contact@globalcoretech.com" className="flex items-center gap-3 text-neutral-400 hover:text-teal-400 transition-colors group">
              <Mail size={18} className="text-teal-500 group-hover:text-teal-400" />
              <span className="text-base break-all">contact@globalcoretech.com</span>
            </a>
          </li>
          <li>
            <a href="tel:+917879130175" className="flex items-center gap-3 text-neutral-400 hover:text-teal-400 transition-colors group">
              <Phone size={18} className="text-teal-500 group-hover:text-teal-400" />
              <span className="text-base">+91 78791 30175</span>
            </a>
          </li>
          <li className="flex items-center gap-3 text-neutral-400">
            <MapPin size={18} className="text-teal-500" />
            <span className="text-base">India</span>
          </li>
        </ul>
      </div>

    </div>

    {/* BOTTOM COPYRIGHT SECTION */}
    <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative">
      
      <p className="text-neutral-500 text-sm">
        © {currentYear} GlobalcoreTech. All rights reserved.
      </p>

      {/* Start a project - Glowing Pill Button */}
      <Link 
        href="/contact" 
        className="group flex items-center gap-2 rounded-full bg-teal-400 px-6 py-2.5 text-sm font-semibold text-black shadow-[0_0_20px_rgba(45,212,191,0.3)] hover:shadow-[0_0_30px_rgba(45,212,191,0.6)] transition-all hover:scale-105"
      >
        Start a project
        <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
      </Link>

    </div>
  </div>
</footer>

);
}