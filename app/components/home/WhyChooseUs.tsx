"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe, Users, Clock, Award } from "lucide-react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const reasons = [
  {
    id: "01", title: "Military-Grade Security",
    desc: "Architecting impenetrable digital fortresses. Every system built with end-to-end encryption, zero-trust architecture, and SOC2 compliance.",
    icon: ShieldCheck, color: "#34d399", border: "border-emerald-500/20", glow: "rgba(52,211,153,0.1)",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800",
    stat: "256-bit AES", statLabel: "Encryption",
  },
  {
    id: "02", title: "Ultra-Fast Delivery",
    desc: "Advanced agile workflows ensure your product launches in record time — completely tested, documented, and market-ready from day one.",
    icon: Zap, color: "#fbbf24", border: "border-yellow-500/20", glow: "rgba(251,191,36,0.1)",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800",
    stat: "2x Faster", statLabel: "Than Industry Avg",
  },
  {
    id: "03", title: "Global Scalability",
    desc: "Cloud-native systems engineered to handle extreme load — from 100 to 1 million concurrent users, with zero latency degradation.",
    icon: Globe, color: "#60a5fa", border: "border-blue-500/20", glow: "rgba(96,165,250,0.1)",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
    stat: "99.99%", statLabel: "Uptime SLA",
  },
  {
    id: "04", title: "Deep AI Integration",
    desc: "Beyond standard code — we infuse intelligence into your product using LLMs, agents, and ML pipelines for automated decision making.",
    icon: Award, color: "#c084fc", border: "border-purple-500/20", glow: "rgba(192,132,252,0.1)",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=800",
    stat: "GPT-4 / Claude", statLabel: "AI Stack",
  },
  {
    id: "05", title: "24/7 Dedicated Support",
    desc: "The engagement doesn't end at launch. Our engineering team continuously monitors, updates, and scales your systems around the clock.",
    icon: Clock, color: "#f472b6", border: "border-pink-500/20", glow: "rgba(244,114,182,0.1)",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800",
    stat: "< 2hr", statLabel: "Response SLA",
  },
  {
    id: "06", title: "Strategic Partnership",
    desc: "We're not vendors — we're your long-term technical partners. Every line of code written with your business growth as the north star.",
    icon: Users, color: "#2dd4bf", border: "border-teal-500/20", glow: "rgba(45,212,191,0.1)",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800",
    stat: "100%", statLabel: "Retention Rate",
  },
];

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header only — lightweight
    gsap.fromTo(".wcu-title",
      { y: 60, opacity: 0, filter: "blur(8px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.12, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%", once: true } }
    );

    // Cards — simple scroll reveal only, NO pin (CSS sticky handles stacking)
    gsap.utils.toArray<HTMLElement>(".stack-card").forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true } }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-[#050505] overflow-hidden border-t border-white/5">

      {/* BG */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <motion.div animate={{ y: ["-100%","200%"] }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          className="absolute left-[12%] w-px h-80 bg-linear-to-b from-transparent via-teal-500/30 to-transparent opacity-20" />
        <motion.div animate={{ y: ["-100%","200%"] }} transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 6 }}
          className="absolute right-[12%] w-px h-80 bg-linear-to-b from-transparent via-purple-500/30 to-transparent opacity-20" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 px-6">

        {/* Header */}
        <div className="py-36 text-center">
          <div className="wcu-title inline-flex items-center gap-3 px-5 py-2 rounded-full border border-teal-500/20 bg-teal-500/5 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-teal-400 text-[9px] font-black tracking-[0.5em] uppercase">Why GlobalCore</span>
          </div>
          <h2 className="wcu-title text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-[0.82] mb-6">
            The <span className="text-teal-400 italic" style={{ fontFamily: "Georgia, serif" }}>GCT</span> Edge
          </h2>
          <p className="wcu-title text-neutral-500 text-lg font-light uppercase tracking-[0.3em] border-t border-white/5 pt-8 max-w-xl mx-auto">
            Precision Engineering // Global Scale // Zero Compromise
          </p>
        </div>

        {/* Stacking Cards — CSS sticky, no GSAP pin */}
        <div className="relative flex flex-col gap-5 pb-24">
          {reasons.map((r, index) => {
            const Icon = r.icon;
            return (
              <div key={index}
                className="stack-card w-full rounded-[3rem] border border-white/[0.07] bg-[#0b0b0b] overflow-hidden"
                style={{ boxShadow: `0 0 40px ${r.color}08`, position: "sticky", top: `${72 + index * 12}px` }}>

                  {/* Top image strip */}
                  <div className="relative h-28 w-full overflow-hidden">
                    <img src={r.img} alt={r.title}
                      className="w-full h-full object-cover grayscale opacity-40" />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#0b0b0b]" />
                    {/* Animated glow line */}
                    <div className="absolute bottom-0 left-0 right-0 h-px opacity-40" style={{ background: r.color }} />
                  </div>

                  <div className="p-8 md:p-16 flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-20 relative">
                    {/* Left glow */}
                    <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-30"
                      style={{ background: r.glow }} />

                    {/* Icon */}
                    <div className="shrink-0 relative">
                      <div className="w-24 h-24 md:w-40 md:h-40 rounded-4xl border flex items-center justify-center relative overflow-hidden shadow-2xl"
                        style={{ borderColor: `${r.color}25`, background: `${r.color}08` }}>
                        <Icon size={60} style={{ color: r.color }} className="md:hidden" />
                        <Icon size={80} style={{ color: r.color }} className="hidden md:block" />
                        <div className="absolute inset-0 bg-linear-to-tr from-white/2 to-transparent" />
                      </div>
                      {/* Stat badge */}
                      <div className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-xl border text-center"
                        style={{ background: "#050505", borderColor: `${r.color}30` }}>
                        <p className="font-black text-sm leading-none" style={{ color: r.color }}>{r.stat}</p>
                        <p className="text-neutral-600 text-[8px] font-black uppercase tracking-widest mt-0.5">{r.statLabel}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 relative z-10">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="h-px w-12" style={{ background: `${r.color}60` }} />
                        <span className="font-black tracking-[0.5em] uppercase text-[10px]" style={{ color: r.color }}>
                          Advantage // {r.id}
                        </span>
                      </div>
                      <h3 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-6">
                        {r.title}
                      </h3>
                      <p className="text-neutral-400 text-base md:text-xl font-light leading-relaxed max-w-2xl">
                        {r.desc}
                      </p>
                    </div>
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}