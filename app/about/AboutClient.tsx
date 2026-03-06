"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Target, Rocket, CheckCircle2, 
  Workflow, Zap, Search, Code2 
} from "lucide-react";
import Image from "next/image"; 
import CTASection from "@/components/CTA";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number; }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutClient() {
  const [position, setPosition] = useState({ x: 50, y: 30 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setPosition({ x, y });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="relative bg-[#0B0F0E] text-white overflow-hidden selection:bg-teal-500/30 font-sans">
      
      {/* 1. Background Noise */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] mix-blend-screen"
        style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

      <div className="relative z-10"> 
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-48 pb-24 px-6 text-center overflow-hidden flex flex-col items-center justify-center min-h-[60vh]">
          <div className="absolute inset-0 transition-all duration-1000 z-0 pointer-events-none"
            style={{ background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(45,212,191,0.15), transparent 60%)` }} />
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 max-w-5xl mx-auto">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <p className="text-teal-400 text-xs font-semibold tracking-widest uppercase">System-First Engineering</p>
              </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.85] mb-8">
              We think in <span className="text-teal-400 italic font-serif">systems</span>, <br /> not just features.
            </h1>
            <p className="text-neutral-400 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
              Designing scalable architectures that support long-term growth and technical excellence.
            </p>
          </motion.div>
        </section>

        {/* ================= MISSION & VISION ================= */}
        <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="group p-10 rounded-[2.5rem] bg-white/2 border border-white/5 hover:border-teal-500/30 transition-all duration-500">
              <Target className="w-12 h-12 text-teal-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-neutral-400 text-lg leading-relaxed">Designing platforms built for sustainable, intelligent growth and technical resilience.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="group p-10 rounded-[2.5rem] bg-white/2 border border-white/5 hover:border-teal-500/30 transition-all duration-500">
              <Rocket className="w-12 h-12 text-teal-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
              <p className="text-neutral-400 text-lg leading-relaxed">To empower founders with engineering expertise that scales their vision globally.</p>
            </div>
          </Reveal>
        </section>

        {/* ================= WHY FOUNDERS TRUST US ================= */}
        <section className="py-24 px-6 bg-white/1 border-y border-white/5">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <Reveal>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-10">Why Founders <br/><span className="text-teal-400 italic">Trust Us</span></h2>
              <div className="space-y-8">
                {[
                  { t: "Architecture First", d: "We build for scale before we build for speed." },
                  { t: "Radical Transparency", d: "No black boxes. You own every line of code." },
                  { t: "Disciplined Engineering", d: "Zero technical debt as a standard, not a goal." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 items-start">
                    <div className="mt-1 bg-teal-500/20 p-2 rounded-lg"><CheckCircle2 className="text-teal-400 w-5 h-5" /></div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{item.t}</h4>
                      <p className="text-neutral-500">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 group">
                <Image src="/image/trust.png" alt="Trust Us" fill className="object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-[#0B0F0E] to-transparent" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= HOW WE WORK ================= */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <Reveal><h2 className="text-5xl md:text-7xl font-bold text-center mb-20 tracking-tighter">How We <span className="text-teal-400 italic">Work</span></h2></Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Deep Audit", icon: <Search />, desc: "Analyzing your current bottlenecks." },
              { title: "Strategic Design", icon: <Workflow />, desc: "Architecting the future state." },
              { title: "Rapid Execution", icon: <Code2 />, desc: "Building with modular efficiency." }
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-12 rounded-[2.5rem] bg-white/1 border border-white/5 text-center group hover:bg-white/3 transition-all">
                  <div className="w-20 h-20 bg-teal-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-teal-400 group-hover:rotate-12 transition-transform">
                    {step.icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-4">{step.title}</h4>
                  <p className="text-neutral-500 text-lg leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= FOUNDER SECTION ================= */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <Reveal>
            <div className="grid md:grid-cols-12 gap-12 items-center bg-white/2 border border-white/5 rounded-[3rem] p-12 md:p-16 shadow-2xl backdrop-blur-3xl">
              <div className="md:col-span-5 relative group">
                <div className="absolute -inset-4 bg-teal-500/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative aspect-4/5 rounded-4xl bg-neutral-900 border border-white/10 overflow-hidden">
                  <Image src="/images/founder.jpg" alt="Founder" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                </div>
              </div>
              <div className="md:col-span-7">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter text-white">
                  Built for what you <br /> <span className="text-teal-400 italic font-light">are becoming.</span>
                </h2>
                <blockquote className="text-neutral-300 text-xl md:text-2xl italic border-l-4 border-teal-500/50 pl-8 font-light">
                  "Growth exposes structural limitations. We design systems that turn those limitations into advantages."
                </blockquote>
                <div className="mt-10 pt-10 border-t border-white/10">
                  <span className="text-white font-bold text-2xl block">Umesh Yadav</span>
                  <span className="text-teal-500/60 text-sm tracking-[0.3em] uppercase font-semibold mt-1 block">Lead Engineer & Founder</span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

      </div>
      <CTASection />
    </div>
  );
}