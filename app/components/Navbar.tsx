"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll Animations for the Capsule Effect
  const navBg = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.05)"]);
  const navBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(16px)"]);
  const navBorder = useTransform(scrollY, [0, 50], ["1px solid rgba(255, 255, 255, 0)", "1px solid rgba(255, 255, 255, 0.1)"]);

  return (
    <header className="fixed top-0 left-0 w-full z-100 px-6 py-8 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* --- LEFT: LOGO SECTION (Tight & Centered) --- */}
        <Link href="/" className="flex items-center group">
          {/* Logo Container */}
          <div className="relative w-12 h-12 flex items-center justify-center transition-all duration-500 overflow-hidden">
            <img 
              src="/logo/logo.png" 
              alt="Globalcore Logo" 
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          {/* Text Section - Engineering Excellence Removed, Center Aligned */}
          <div className="flex items-center -ml-1"> 
            <h1 className="text-xl font-black tracking-tighter text-white uppercase flex items-center gap-1.5 leading-none">
              Globalcore 
              <span className="text-teal-400 font-serif italic lowercase text-lg leading-none">Tech</span>
            </h1>
          </div>
        </Link>

        {/* --- CENTER: FLOATING DOCK MENU --- */}
        <motion.nav
          style={{ 
            backgroundColor: navBg, 
            backdropFilter: navBlur, 
            border: navBorder 
          }}
          className="hidden md:flex items-center gap-1 p-1.5 rounded-full shadow-2xl"
        >
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/5 transition-all relative group"
            >
              {link.name}
              <motion.span 
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-teal-400 rounded-full group-hover:w-4 transition-all"
              />
            </Link>
          ))}
        </motion.nav>

        {/* --- RIGHT: CTA BUTTON --- */}
        <div className="flex items-center gap-4">
          <Link 
            href="/contact"
            className="group relative hidden sm:flex items-center gap-2 bg-white text-black px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-teal-400 transition-all active:scale-95 shadow-xl"
          >
            Start Project
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white active:scale-90 transition-all"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE OVERLAY MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-24 left-6 right-6 bg-[#0D1211]/95 border border-white/10 rounded-[2.5rem] p-8 md:hidden backdrop-blur-3xl pointer-events-auto"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-2xl font-black text-white p-4 border-b border-white/5 hover:text-teal-400 transition-colors uppercase italic"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/contact"
                className="w-full bg-teal-400 text-black py-5 rounded-2xl font-black text-center uppercase tracking-widest mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Let's Talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}