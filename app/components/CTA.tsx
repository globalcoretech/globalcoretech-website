"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";

// Pages jahan CTA nahi dikhna chahiye
const HIDE_ON = [
  "/contact",
  "/roadmap-generator",
];

export default function CTA() {
  const pathname = usePathname();

  // Service detail pages pe bhi hide karo (/services/web-apps etc)
  const isServiceDetail = pathname.startsWith("/services/") && pathname !== "/services";
  const shouldHide = HIDE_ON.includes(pathname) || isServiceDetail;

  // Contact ya service detail page pe render hi mat karo
  if (shouldHide) return null;

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-20 text-center backdrop-blur-sm relative overflow-hidden">

          {/* Decorative Particles */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            <div className="absolute bottom-10 right-20 w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-bold tracking-widest uppercase mb-8"
          >
            <Sparkles size={16} /> Ready to start?
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter"
          >
            Let&apos;s build something <br />
            <span className="text-teal-400 italic">extraordinary.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Whether you&apos;re a startup or an enterprise, we have the engineering expertise to scale your vision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 bg-teal-400 hover:bg-white text-black px-10 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-[0_0_30px_rgba(45,212,191,0.3)]"
            >
              Start Your Project
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}