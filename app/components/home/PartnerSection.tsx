"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Zap, Shield, Cpu, BarChart, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const advantages = [
  {
    title: "Zero Latency Build",
    desc: "Optimized workflows delivering products 2x faster than the industry standard without cutting corners.",
    icon: Zap, color: "#fbbf24",
    className: "md:col-span-2", xOffset: -80,
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600",
    stat: "2× Faster",
  },
  {
    title: "Fortress Security",
    desc: "Military-grade encryption baked into every layer from auth to data at rest.",
    icon: Shield, color: "#34d399",
    className: "md:col-span-1", xOffset: 80,
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600",
    stat: "256-bit",
  },
  {
    title: "Modern Tech Stack",
    desc: "Next.js 15, TypeScript, AI-Agentic architecture built for global scale and longevity.",
    icon: Cpu, color: "#60a5fa",
    className: "md:col-span-1", xOffset: -40,
    img: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=600",
    stat: "Next.js 15",
  },
  {
    title: "Data-Driven ROI",
    desc: "Every pixel and pipeline precision-engineered for conversion, retention, and compounding growth.",
    icon: BarChart, color: "#c084fc",
    className: "md:col-span-2", xOffset: 40,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600",
    stat: "+340% Avg ROI",
  },
];

export default function PartnerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef      = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  useGSAP(() => {
    if (!isMounted) return;

    // Header
    gsap.fromTo(".bp-title",
      { y: 60, opacity: 0, filter: "blur(8px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.12, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%", once: true } }
    );

    // Cards 3D entrance
    gsap.utils.toArray<HTMLElement>(".kinetic-card").forEach((card, i) => {
      gsap.from(card, {
        x: advantages[i].xOffset, z: -250, rotateX: 8, opacity: 0, duration: 1.2, ease: "power4.out",
        scrollTrigger: { trigger: card, start: "top 92%", toggleActions: "play none none reverse", once: true }
      });
    });

    // Mouse tilt
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      gsap.to(gridRef.current, {
        rotateY: x, rotateX: -y,
        duration: 1.2, ease: "power2.out", transformPerspective: 1400,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isMounted]);

  if (!isMounted) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <section ref={containerRef} className="py-40 px-6 bg-[#050505] relative overflow-hidden border-t border-white/5">

      {/* Blueprint BG */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle, #2dd4bf 1px, transparent 1px),
              linear-gradient(to right, #2dd4bf 0.5px, transparent 0.5px),
              linear-gradient(to bottom, #2dd4bf 0.5px, transparent 0.5px)`,
            backgroundSize: "72px 72px, 72px 72px, 72px 72px"
          }} />
        <div className="absolute inset-0 bg-linear-to-b from-[#050505] via-transparent to-[#050505]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.12]">
          <motion.circle cx="80%" cy="20%" r="90" stroke="#2dd4bf" strokeWidth="0.5" fill="none" strokeDasharray="5 5"
            animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
          <motion.path d="M0 350 L2000 350" stroke="#2dd4bf" strokeWidth="0.5" fill="none"
            animate={{ x: [-2000, 2000] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} />
        </svg>
        <div className="absolute bottom-8 right-8 font-mono text-[8px] text-teal-500/20 tracking-widest leading-loose text-right hidden lg:block">
          <p>COORD_X: 42.091</p>
          <p>SYSTEM: STABLE 99.9%</p>
          <p>ARCH: GLOBALCORE_V4</p>
        </div>
        <div className="absolute left-3 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-teal-500/15 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-28">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-14 bg-teal-400/50" />
            <span className="text-teal-400 font-black tracking-[0.5em] uppercase text-[9px]">Technical Schematic</span>
          </div>
          <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.82] uppercase mb-10">
            <span className="block bp-title">The Blueprint</span>
            <span className="block bp-title text-teal-400 italic" style={{ fontFamily: "Georgia, serif" }}>of Excellence.</span>
          </h2>
          <p className="bp-title text-neutral-500 text-xl font-light max-w-2xl border-l-2 border-teal-500/20 pl-8 leading-relaxed">
            Precision engineering meets high-end architectural strategy to build digital assets that never fail and always compound.
          </p>
        </div>

        {/* 3D Bento grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ transformStyle: "preserve-3d" }}>
          {advantages.map((adv, i) => (
            <div key={i}
              className={`kinetic-card group relative rounded-[2.5rem] border border-white/[0.07] overflow-hidden transition-all duration-700 hover:border-teal-500/25 ${adv.className}`}
              style={{ transformStyle: "preserve-3d", background: "#0a0a0a" }}>

              {/* Image strip top */}
              <div className="relative h-32 overflow-hidden">
                <img src={adv.img} alt={adv.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1500 scale-105 group-hover:scale-100" />
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#0a0a0a]" />
                <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md">
                  <span className="font-black text-[10px]" style={{ color: adv.color }}>{adv.stat}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 relative" style={{ transform: "translateZ(20px)" }}>
                {/* Hover glow */}
                <div className="absolute -bottom-12 -right-12 w-60 h-60 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `${adv.color}15` }} />

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10"
                  style={{ background: `${adv.color}10`, borderColor: `${adv.color}25`, transform: "translateZ(50px)" }}>
                  <adv.icon size={26} style={{ color: adv.color }} />
                </div>

                <div className="relative z-10" style={{ transform: "translateZ(25px)" }}>
                  <h3 className="text-2xl font-black text-white mb-3 tracking-tight uppercase group-hover:text-teal-50 transition-colors">
                    {adv.title}
                  </h3>
                  <p className="text-neutral-500 text-sm font-light leading-relaxed group-hover:text-neutral-300 transition-colors mb-6">
                    {adv.desc}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="h-px w-6 group-hover:w-16 transition-all duration-700" style={{ background: adv.color }} />
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                    <ArrowUpRight size={13} className="text-white/25 group-hover:text-white/60 transition-colors" />
                  </div>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-10 h-10 border-b border-l border-white/5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}