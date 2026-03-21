"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, PenTool, Code2, Rocket, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    num: "01",
    title: "Discovery & Audit",
    desc: "We dissect your current ecosystem — mapping every bottleneck, legacy debt, and hidden opportunity for 10x growth.",
    icon: Search, color: "#3b82f6", glow: "rgba(59,130,246,0.12)",
    stat: "2–5 Days", tag: "Input Phase",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
  },
  {
    num: "02",
    title: "Strategic Blueprint",
    desc: "Not wireframes — a full technical architecture designed for extreme scalability, security, and speed.",
    icon: PenTool, color: "#a78bfa", glow: "rgba(167,139,250,0.12)",
    stat: "7–14 Days", tag: "Design Phase",
    img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800",
  },
  {
    num: "03",
    title: "Precision Engineering",
    desc: "Zero-Debt engineering philosophy — clean, performant, secure code with modular architecture that lasts.",
    icon: Code2, color: "#2dd4bf", glow: "rgba(45,212,191,0.12)",
    stat: "4–12 Weeks", tag: "Build Phase",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800",
  },
  {
    num: "04",
    title: "Global Deployment",
    desc: "Seamless rollout with high-availability infrastructure, CI/CD pipelines, and 24/7 performance monitoring.",
    icon: Rocket, color: "#f59e0b", glow: "rgba(245,158,11,0.12)",
    stat: "Ongoing", tag: "Scale Phase",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
  },
];

export default function ExecutionPipeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<SVGPathElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  useGSAP(() => {
    if (!isMounted) return;

    // Header reveal
    gsap.fromTo(".pipe-title",
      { y: 80, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.15, duration: 1.2, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } }
    );

    // Cards — stagger fly-in
    gsap.fromTo(".step-card",
      { opacity: 0, y: 80, scale: 0.93 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.14, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: ".steps-grid", start: "top 80%", once: true,
          onEnter: () => setVisible(true) } }
    );

    // SVG line draw
    if (lineRef.current) {
      const len = lineRef.current.getTotalLength();
      gsap.set(lineRef.current, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        scrollTrigger: { trigger: ".steps-grid", start: "top 60%", end: "bottom 80%", scrub: 2 }
      });
    }
  }, [isMounted]);

  if (!isMounted) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <section ref={sectionRef} className="py-40 relative bg-[#050505] overflow-hidden border-t border-white/5">

      {/* Blueprint BG */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle, #2dd4bf 0.5px, transparent 0.5px),
              linear-gradient(to right, #2dd4bf 0.5px, transparent 0.5px),
              linear-gradient(to bottom, #2dd4bf 0.5px, transparent 0.5px)`,
            backgroundSize: "64px 64px, 64px 64px, 64px 64px"
          }} />
        <div className="absolute inset-0 bg-linear-to-b from-[#050505] via-transparent to-[#050505]" />
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vh] rounded-full bg-teal-500/4 blur-[120px]" />
        {/* Mono labels */}
        <div className="absolute top-1/3 left-6 font-mono text-[8px] text-teal-400/20 tracking-widest leading-loose hidden lg:block">
          <p>SCALE_REF: 1.0</p>
          <p>FLOW: SEQ_01</p>
          <p>STREAMS: ACTIVE</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-28 gap-10">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-px bg-teal-400" />
              <span className="text-teal-400 font-black tracking-[0.5em] uppercase text-[9px]">Strategic Framework</span>
            </div>
            <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.82]">
              <span className="block pipe-title">How we</span>
              <span className="block pipe-title text-teal-400 italic" style={{ fontFamily: "Georgia, serif" }}>execute.</span>
            </h2>
          </div>
          <p className="pipe-title text-neutral-500 max-w-sm text-lg md:text-xl font-light leading-relaxed border-r-2 border-teal-500/20 pr-8 lg:text-right">
            Precision engineering meets high-end strategy — building assets that lead markets and outlast trends.
          </p>
        </div>

        {/* Grid */}
        <div className="relative steps-grid">

          {/* SVG connector line */}
          <div className="absolute top-1/2 left-0 w-full hidden lg:block overflow-visible opacity-25 -translate-y-1/2">
            <svg width="100%" height="2" viewBox="0 0 1200 2" fill="none" preserveAspectRatio="none">
              <path ref={lineRef} d="M 0 1 L 1200 1" stroke="#2dd4bf" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="step-card group relative rounded-[2.5rem] border border-white/[0.07] overflow-hidden transition-all duration-700 hover:border-white/20"
                  style={{ background: "#0a0a0a" }}>

                  {/* Top image strip */}
                  <div className="relative h-36 overflow-hidden">
                    <img src={step.img} alt={step.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-2000 scale-105 group-hover:scale-100" />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#0a0a0a]" />
                    {/* Phase badge */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                      <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: step.color }}>{step.tag}</span>
                    </div>
                    {/* Num watermark */}
                    <div className="absolute top-2 right-4 font-black text-6xl leading-none select-none" style={{ color: `${step.color}15` }}>
                      {step.num}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 relative">
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at top, ${step.glow} 0%, transparent 70%)` }} />

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300"
                      style={{ background: `${step.color}10`, borderColor: `${step.color}25` }}>
                      <Icon size={22} style={{ color: step.color }} />
                    </div>

                    <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight leading-none relative z-10">
                      {step.title}
                    </h3>
                    <p className="text-neutral-500 text-sm font-light leading-relaxed group-hover:text-neutral-300 transition-colors mb-6 relative z-10" style={{ minHeight: "80px" }}>
                      {step.desc}
                    </p>

                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: step.color }} />
                        <span className="font-mono text-[9px] text-neutral-600 uppercase tracking-widest">{step.stat}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                        <ArrowRight size={12} className="text-white/30 group-hover:text-white/60 transition-colors" />
                      </div>
                    </div>

                    {/* Bottom line wipe */}
                    <div className="mt-6 h-px w-8 group-hover:w-full transition-all duration-700"
                      style={{ background: step.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}