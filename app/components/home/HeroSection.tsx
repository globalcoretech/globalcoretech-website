"use client"; // <--- Ye sabse zaroori hai interactivity ke liye

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-125 bg-teal-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Top Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
        >
          <span className="text-[10px] font-bold tracking-[0.2em] text-teal-400 uppercase">
            ✨ Next-Gen Digital Solutions
          </span>
        </motion.div>

        {/* Big Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight"
        >
          Engineering the <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-emerald-500">
            Digital Future
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We build high-performance Web Apps, SaaS Ecosystems, and AI Automations 
          that scale your business beyond limits.
        </motion.p>

        {/* CTA Buttons - FIXING THE CLICK ISSUE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            href="/contact" 
            className="group relative px-8 py-4 bg-teal-400 text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="flex items-center gap-2">
              Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link 
            href="/services" 
            className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-all"
          >
            View Our Work
          </Link>
        </motion.div>
      </div>
    </section>
  );
}