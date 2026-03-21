"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, ArrowRight, Lightbulb, Cpu,
  Globe, Smartphone, BarChart3, CheckCircle2,
  Zap, Clock, Layers
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Simulated typewriter cycling through app types
const DEMO_IDEAS = [
  { text: "A SaaS for freelancers to manage invoices...", type: "SaaS Platform",  color: "#2dd4bf", icon: BarChart3 },
  { text: "An AI tool that summarises customer feedback...", type: "AI Tool",      color: "#34d399", icon: Cpu },
  { text: "A mobile app for local food delivery...",       type: "Mobile App",    color: "#f59e0b", icon: Smartphone },
  { text: "An e-commerce store for handmade jewelry...",   type: "E-commerce",    color: "#60a5fa", icon: Globe },
];

const DEMO_RESULT = {
  phases: [
    { label: "Discovery & Architecture", weeks: "2–3 wks", color: "#60a5fa" },
    { label: "Core MVP Build",           weeks: "6–8 wks", color: "#2dd4bf" },
    { label: "Testing & Integration",    weeks: "2–3 wks", color: "#a78bfa" },
    { label: "Launch & Scale",           weeks: "1–2 wks", color: "#34d399" },
  ],
  techs: ["Next.js 15", "TypeScript", "Stripe", "PostgreSQL", "Vercel"],
  mvp: "8–10 weeks",
};

function useTyping(text: string, speed = 45) {
  const [display, setDisplay] = useState("");
  const [done, setDone]       = useState(false);
  useEffect(() => {
    setDisplay(""); setDone(false);
    let i = 0;
    const iv = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i++;
      if (i >= text.length) { clearInterval(iv); setDone(true); }
    }, speed);
    return () => clearInterval(iv);
  }, [text]);
  return { display, done };
}

export default function RoadmapTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [demoIdx, setDemoIdx] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const demo  = DEMO_IDEAS[demoIdx];
  const { display, done } = useTyping(demo.text);
  const DemoIcon = demo.icon;

  // Auto-cycle demos
  useEffect(() => {
    if (!done) return;
    setShowResult(true);
    const t = setTimeout(() => {
      setShowResult(false);
      setTimeout(() => setDemoIdx(i => (i + 1) % DEMO_IDEAS.length), 400);
    }, 3500);
    return () => clearTimeout(t);
  }, [done]);

  useGSAP(() => {
    gsap.fromTo(".rmt-title",
      { y: 60, opacity: 0, filter: "blur(8px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.12, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } }
    );
    gsap.fromTo(".rmt-card",
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0,  scale: 1,   duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true } }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef}
      className="py-32 px-6 relative overflow-hidden border-t border-white/5"
      style={{ background: "#020202" }}>

      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[50vh] rounded-full bg-teal-500/4 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — copy */}
          <div>
            <div className="rmt-title inline-flex items-center gap-3 px-4 py-2 rounded-full border border-teal-500/20 bg-teal-500/6 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-teal-400 text-[9px] font-black tracking-[0.5em] uppercase">Free Tool // No Sign-up</span>
            </div>

            <h2 className="rmt-title text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.82] mb-6">
              Turn your idea <br />
              into a <span className="text-teal-400 italic" style={{ fontFamily: "Georgia,serif" }}>roadmap.</span>
            </h2>

            <p className="rmt-title text-neutral-500 text-lg font-light leading-relaxed max-w-md mb-10 border-l-2 border-teal-500/20 pl-6">
              Describe your product, tell us who it's for — get a complete technical roadmap, recommended tech stack, and timeline estimate. Takes 60 seconds.
            </p>

            {/* Feature bullets */}
            <div className="rmt-title flex flex-col gap-3 mb-10">
              {[
                { icon: Zap,          text: "Instant results — no waiting, no sign-up" },
                { icon: Layers,       text: "Custom tech stack based on your project type" },
                { icon: Clock,        text: "Realistic timeline + phase-by-phase breakdown" },
                { icon: CheckCircle2, text: "100% free — we get a lead, you get a blueprint" },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
                    <f.icon size={12} className="text-teal-400" />
                  </div>
                  <span className="text-neutral-500 text-sm font-light">{f.text}</span>
                </div>
              ))}
            </div>

            <Link href="/roadmap-generator">
              <div className="rmt-title group inline-flex items-center gap-4 px-8 py-5 rounded-full bg-teal-400 text-black font-black uppercase tracking-widest text-[11px] hover:bg-white transition-colors duration-300 cursor-pointer">
                <Rocket size={16} />
                Generate My Roadmap — Free
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          {/* Right — animated demo preview */}
          <div className="rmt-card relative">

            {/* Fake terminal window */}
            <div className="rounded-4xl border border-white/8 overflow-hidden"
              style={{ background: "#0a0a0a", boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(45,212,191,0.04)" }}>

              {/* Window chrome */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/6 bg-[#0d0d0d]">
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="font-mono text-[9px] text-neutral-600 uppercase tracking-widest ml-2">
                    roadmap-generator.tsx
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <motion.div className="w-1.5 h-1.5 rounded-full bg-teal-400"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }} />
                  <span className="font-mono text-[9px] text-teal-400 uppercase tracking-widest">Live Demo</span>
                </div>
              </div>

              <div className="p-6 space-y-5">

                {/* Input area simulation */}
                <div className="p-4 rounded-2xl border border-white/6 bg-white/2">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb size={13} className="text-teal-400" />
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-600">Your Idea</span>
                  </div>
                  <div className="font-mono text-[11px] text-teal-300/80 leading-relaxed min-h-9">
                    {display}
                    <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.6, repeat: Infinity }}
                      className="text-teal-400">▋</motion.span>
                  </div>
                </div>

                {/* App type detected */}
                <AnimatePresence>
                  {done && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0,  scale: 1    }}
                      exit={{   opacity: 0, y: -5, scale: 0.97  }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                      style={{ borderColor: `${demo.color}25`, background: `${demo.color}08` }}>
                      <DemoIcon size={14} style={{ color: demo.color }} />
                      <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: demo.color }}>
                        Detected: {demo.type}
                      </span>
                      <CheckCircle2 size={12} className="ml-auto" style={{ color: demo.color }} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Result preview */}
                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                      exit={{   opacity: 0, y: -8  }}
                      transition={{ duration: 0.4 }}
                      className="space-y-3">

                      {/* Phases */}
                      <div className="space-y-2">
                        {DEMO_RESULT.phases.map((phase, i) => (
                          <motion.div key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="flex items-center gap-3 py-2 border-b border-white/4 last:border-0">
                            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: phase.color }} />
                            <span className="text-[10px] text-neutral-400 font-light flex-1">{phase.label}</span>
                            <span className="text-[9px] font-black font-mono" style={{ color: phase.color }}>{phase.weeks}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Tech pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {DEMO_RESULT.techs.map((tech, i) => (
                          <motion.span key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.05 }}
                            className="px-2.5 py-1 rounded-lg border border-white/6 text-[9px] font-black text-neutral-500">
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* MVP time */}
                      <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                        className="flex items-center justify-between pt-2 border-t border-white/5">
                        <span className="text-[9px] font-mono text-neutral-700 uppercase tracking-widest">MVP Ready</span>
                        <span className="text-[11px] font-black text-teal-400">{DEMO_RESULT.mvp}</span>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom bar */}
              <div className="border-t border-white/5 px-5 py-3 bg-[#0d0d0d] flex items-center justify-between">
                <span className="font-mono text-[8px] text-neutral-700 uppercase tracking-widest">
                  Free · No sign-up · 60 seconds
                </span>
                <Link href="/roadmap-generator">
                  <div className="flex items-center gap-1.5 text-teal-400 text-[9px] font-black uppercase tracking-widest hover:text-white transition-colors cursor-pointer">
                    Try it <ArrowRight size={10} />
                  </div>
                </Link>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 px-4 py-2.5 rounded-2xl border border-teal-500/20 bg-[#0a0a0a] shadow-2xl backdrop-blur-xl">
              <p className="text-teal-400 font-black text-sm tracking-tighter">100% Free</p>
              <p className="text-neutral-600 text-[8px] font-black uppercase tracking-widest">No credit card</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}