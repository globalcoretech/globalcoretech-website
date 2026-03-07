import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 border-t border-white/10 bg-[#0B0F0E] pt-20 pb-10 overflow-hidden">
      
      {/* 1. TECH GRID BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
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
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, rgba(45, 212, 191, 0.15) 0, rgba(45, 212, 191, 0.15) 1px, transparent 1px, transparent 40px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Fading Edges */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0B0F0E] via-transparent to-[#0B0F0E]" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0B0F0E] via-transparent to-[#0B0F0E]" />
      </div>

      {/* AMBIENT GLOW */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-teal-500/20 to-transparent z-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* TOP GRID SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & Logo */}
          <div className="lg:pr-6">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity">
              <div className="relative w-12 h-12 shrink-0">
                <Image 
                  src="/logo/logo.png" 
                  alt="Globlcore Tech Logo" 
                  width={48} 
                  height={48} 
                  className="object-contain"
                />
              </div>
              <div className="flex items-center pt-1">
                <span className="text-white font-bold text-2xl tracking-wide uppercase">Globlcore</span>
                <span className="text-teal-400 font-light text-2xl tracking-wide uppercase ml-1">Tech</span>
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
              <li><Link href="/about" className="text-neutral-400 hover:text-teal-400 transition-colors text-base">About Us</Link></li>
              <li><Link href="/services" className="text-neutral-400 hover:text-teal-400 transition-colors text-base">Services</Link></li>
              <li><Link href="/contact" className="text-neutral-400 hover:text-teal-400 transition-colors text-base">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-4">
              <li><Link href="/services/web-development" className="text-neutral-400 hover:text-teal-400 transition-colors text-base">Web Development</Link></li>
              <li><Link href="/services/ai-automation" className="text-neutral-400 hover:text-teal-400 transition-colors text-base">AI & Automation</Link></li>
              <li><Link href="/services/saas-development" className="text-neutral-400 hover:text-teal-400 transition-colors text-base">SaaS Products</Link></li>
              <li><Link href="/services/mobile-development" className="text-neutral-400 hover:text-teal-400 transition-colors text-base">Mobile Apps</Link></li>
            </ul>
          </div>

          {/* Column 4: Get in touch */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Get in touch</h4>
            <ul className="space-y-5">
              <li>
                <a href="mailto:contact@globlcoretech.com" className="flex items-center gap-3 text-neutral-400 hover:text-teal-400 transition-colors group">
                  <Mail size={18} className="text-teal-500 group-hover:text-teal-400" />
                  <span className="text-base break-all">contact@globlcoretech.com</span>
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

        {/* BOTTOM SECTION: COPYRIGHT & LEGAL */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative">
          
          <div className="flex flex-col gap-2">
            <p className="text-neutral-500 text-sm">
              © {currentYear} GloblcoreTech. All rights reserved.
            </p>
            {/* LEGAL LINKS ADDED HERE */}
            <div className="flex gap-4 text-xs text-neutral-600">
              <Link href="/privacy-policy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-teal-400 transition-colors">Terms & Conditions</Link>
            </div>
          </div>

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