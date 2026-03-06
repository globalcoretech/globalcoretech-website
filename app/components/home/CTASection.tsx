"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Reveal from "../animations/Reveal";

export default function CTASection() {
return (
<section className="relative py-32 px-6 overflow-hidden bg-[#0B0F0E]">

  <div className="relative z-10 mx-auto max-w-6xl">
    
    {/* LANDER-X STYLE HUGE CARD WRAPPER */}
    <div className="relative rounded-[3rem] border border-white/10 bg-white/2 px-6 py-20 md:py-32 text-center overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        
        {/* INNER CARD GLOWS */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-linear-to-r from-transparent via-teal-500/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-teal-500/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          
          <Reveal>
            {/* PRE-HEADING BADGE */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <p className="text-teal-400 text-xs font-bold tracking-widest uppercase">
                What are you waiting for
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {/* MAIN HEADING */}
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              Grow faster with <br className="hidden md:block"/>
              <span className="text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.2)]">GlobalcoreTech</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            {/* SUBTEXT */}
            <p className="text-neutral-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              Unlock the power of scalable software and AI-driven automation to make smarter decisions and accelerate your business growth.
            </p>
          </Reveal>

          {/* DUAL BUTTONS (LanderX Style) */}
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              
              {/* Primary Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-teal-400 px-8 py-4 text-base font-semibold text-black shadow-[0_0_30px_rgba(45,212,191,0.4)] hover:shadow-[0_0_50px_rgba(45,212,191,0.7)] transition-all"
                >
                  Start a Project
                </Link>
              </motion.div>

              {/* Secondary Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-medium text-white hover:bg-white/10 hover:border-white/30 transition-all backdrop-blur-sm"
                >
                  Book a Demo
                </Link>
              </motion.div>

            </div>
          </Reveal>
        
        </div>
    </div>

  </div>
</section>

);
}