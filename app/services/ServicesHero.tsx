"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  Terminal, ArrowRight, ChevronDown,
  Globe, Cpu, Smartphone, BarChart3, Rocket,
  Zap, Shield, TrendingUp
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Text scramble ─────────────────────────────────────────────────────────────
function useScramble(text: string, trigger: boolean, delay = 0) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";
  useEffect(() => {
    if (!trigger) return;
    const t = setTimeout(() => {
      let iter = 0;
      const iv = setInterval(() => {
        setDisplay(text.split("").map((c, i) =>
          c === " " ? " " : i < iter ? c : chars[Math.floor(Math.random() * chars.length)]
        ).join(""));
        if (iter >= text.length) clearInterval(iv);
        iter += 1.5;
      }, 30);
    }, delay);
    return () => clearTimeout(t);
  }, [trigger]);
  return display;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: Globe,      label: "Web Development",  color: "#a78bfa", stat: "<500ms", statL: "Load Time",       href: "/services/web-apps" },
  { icon: Cpu,        label: "AI Automation",     color: "#34d399", stat: "80%",    statL: "Task Reduction",  href: "/services/ai-automation" },
  { icon: Smartphone, label: "Mobile Apps",       color: "#f59e0b", stat: "60fps",  statL: "Performance",     href: "/services/mobile-apps" },
  { icon: BarChart3,  label: "SaaS Platforms",    color: "#2dd4bf", stat: "MRR",    statL: "Revenue Model",   href: "/services/saas-platforms" },
  { icon: Rocket,     label: "Cloud Solutions",   color: "#60a5fa", stat: "99.99%", statL: "Uptime SLA",      href: "/services/cloud-solutions" },
];

const PARTICLES = [
  { x: 62,  y: 18,  size: 1.5, delay: 0   },
  { x: 88,  y: 58,  size: 1,   delay: 1.2 },
  { x: 28,  y: 72,  size: 2,   delay: 0.5 },
  { x: 74,  y: 38,  size: 1,   delay: 2   },
  { x: 14,  y: 48,  size: 1.5, delay: 0.8 },
  { x: 92,  y: 82,  size: 1,   delay: 1.5 },
  { x: 48,  y: 8,   size: 2,   delay: 0.3 },
  { x: 52,  y: 92,  size: 1,   delay: 1.8 },
];

export default function ServicesHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready,       setReady]       = useState(false);
  const [activeCard,  setActiveCard]  = useState(0);

  // Parallax
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const rightY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const leftY  = useTransform(scrollYProgress, [0, 1], ["0%",  "6%"]);

  // Scramble
  const l1 = useScramble("OUR",         ready, 100);
  const l2 = useScramble("SERVICES",    ready, 300);
  const l3 = useScramble("& SOLUTIONS", ready, 600);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Auto-cycle cards
  useEffect(() => {
    const iv = setInterval(() => setActiveCard(c => (c + 1) % SERVICES.length), 2200);
    return () => clearInterval(iv);
  }, []);

  useGSAP(() => {
    gsap.fromTo(".sh-badge",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.7, delay: 0.2, ease: "back.out(1.7)" }
    );
    gsap.fromTo(".sh-line",
      { y: "110%", opacity: 0 },
      { y: "0%", opacity: 1, stagger: 0.1, duration: 1.3, delay: 0.4, ease: "expo.out" }
    );
    gsap.fromTo(".sh-sub",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 1, delay: 1.0, ease: "power3.out" }
    );
    gsap.fromTo(".sh-cta",
      { opacity: 0, y: 20, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.8, delay: 1.2, ease: "back.out(1.5)" }
    );
    gsap.fromTo(".sh-right",
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1.4, delay: 0.6, ease: "expo.out" }
    );
    gsap.fromTo(".svc-pill",
      { opacity: 0, x: 24 },
      { opacity: 1, x: 0, stagger: 0.07, duration: 0.8, delay: 1.0, ease: "power3.out" }
    );
    gsap.to(".sh-scroll", { y: 6, duration: 1.1, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.5 });
    gsap.fromTo(".sh-scroll", { opacity: 0 }, { opacity: 0.5, duration: 1, delay: 2.2 });
    gsap.to(".sh-ticker", { x: "-50%", duration: 22, repeat: -1, ease: "linear" });
  }, { scope: containerRef });

  const active = SERVICES[activeCard];

  return (
    <section ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#020202] flex flex-col">

      {/* ── Background layers ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.08) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
        }} />
      <div className="absolute top-[-15%] left-[-8%]  w-[55vw] h-[55vw] rounded-full bg-teal-500/6   blur-[140px] pointer-events-none" />
      <div className="absolute top-[15%]  right-[-5%] w-[40vw] h-[40vw] rounded-full bg-violet-500/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-8%] left-[25%] w-[50vw] h-[30vw] rounded-full bg-teal-500/4   blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize:"128px" }} />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <motion.div key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: `${p.size * 4}px`, height: `${p.size * 4}px`,
            background: "#2dd4bf",
            boxShadow: `0 0 ${p.size * 8}px rgba(45,212,191,0.6)`,
          }}
          animate={{ y: [-8, 8, -8], opacity: [0.15, 0.6, 0.15] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}

      {/* ── Main grid ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full pt-28 pb-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center min-h-[82vh]">

            {/* LEFT */}
            <motion.div style={{ y: leftY }} className="lg:col-span-6 flex flex-col justify-center">

              <div className="sh-badge inline-flex items-center gap-3 px-5 py-2 rounded-full border border-teal-500/25 bg-teal-500/6 backdrop-blur-md mb-10 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                <Terminal size={11} className="text-teal-400" />
                <span className="text-teal-400 text-[9px] font-black tracking-[0.5em] uppercase">
                  Engineering Excellence // GlobalCore
                </span>
              </div>

              <div className="mb-8">
                <div className="overflow-hidden mb-1">
                  <h1 className="sh-line text-[15vw] md:text-[8.5vw] font-light tracking-tighter leading-[0.82] uppercase text-white">{l1}</h1>
                </div>
                <div className="overflow-hidden mb-1">
                  <h1 className="sh-line text-[15vw] md:text-[8.5vw] font-black tracking-tighter leading-[0.82] uppercase text-transparent"
                    style={{ WebkitTextStroke: "2px #2dd4bf" }}>{l2}</h1>
                </div>
                <div className="overflow-hidden">
                  <h1 className="sh-line text-[15vw] md:text-[8.5vw] font-black tracking-tighter leading-[0.82] uppercase text-teal-400 italic"
                    style={{ fontFamily: "Georgia, serif" }}>{l3}</h1>
                </div>
              </div>

              <p className="sh-sub text-neutral-500 text-lg font-light max-w-lg leading-relaxed mb-10 border-l-2 border-teal-500/20 pl-6">
                We don't just build apps — we architect systems that fuel revenue, efficiency, and long-term scalability. From MVP to global scale.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/contact">
                  <div className="sh-cta group flex items-center gap-3 px-7 py-4 bg-teal-400 rounded-full hover:bg-white transition-colors duration-300 cursor-pointer">
                    <span className="text-black font-black uppercase tracking-widest text-[10px]">Start a Project</span>
                    <ArrowRight size={14} className="text-black group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
                <Link href="/about">
                  <div className="sh-cta group flex items-center gap-3 px-7 py-4 border border-white/10 rounded-full hover:border-teal-500/30 hover:bg-teal-500/4 transition-all duration-300 cursor-pointer">
                    <span className="text-white/50 font-black uppercase tracking-widest text-[10px] group-hover:text-white transition-colors">About Us</span>
                  </div>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="sh-sub flex flex-wrap gap-2">
                {[
                  { icon: Shield,     text: "NDA Protected" },
                  { icon: Zap,        text: "24h Response" },
                  { icon: TrendingUp, text: "Zero Debt Code" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/6 bg-white/2">
                    <b.icon size={11} className="text-teal-400" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500">{b.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div style={{ y: rightY }} className="sh-right lg:col-span-6 relative hidden lg:flex flex-col gap-4">

              {/* Floating "5 Services" badge */}
              <div className="absolute -top-5 -right-2 z-20 px-4 py-2.5 rounded-2xl border border-teal-500/20 bg-[#0a0a0a] shadow-2xl backdrop-blur-xl">
                <p className="text-teal-400 font-black text-base tracking-tighter">5 Services</p>
                <p className="text-neutral-600 text-[8px] font-black uppercase tracking-widest mt-0.5">One Partner</p>
              </div>

              {/* Featured card */}
              <div className="relative rounded-[2.5rem] border border-white/[0.07] overflow-hidden"
                style={{ background: "#0b0b0b", boxShadow: `0 0 80px ${active.color}10` }}>

                {/* Image strip with icon */}
                <div className="relative h-40 overflow-hidden">
                  {/* Animated grid bg */}
                  <div className="absolute inset-0 transition-all duration-700"
                    style={{ background: `linear-gradient(135deg, ${active.color}15 0%, transparent 60%)` }} />
                  <div className="absolute inset-0 opacity-[0.05]"
                    style={{
                      backgroundImage: `linear-gradient(${active.color} 1px, transparent 1px), linear-gradient(90deg, ${active.color} 1px, transparent 1px)`,
                      backgroundSize: "28px 28px",
                    }} />
                  {/* Big icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {(() => {
                      const Icon = active.icon;
                      return (
                        <motion.div key={activeCard}
                          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                          animate={{ scale: 1,   opacity: 0.12, rotate: 0 }}
                          transition={{ duration: 0.5, ease: "backOut" }}>
                          <Icon size={130} style={{ color: active.color }} />
                        </motion.div>
                      );
                    })()}
                  </div>
                  {/* Card footer inside strip */}
                  <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                    <motion.div key={`title-${activeCard}`}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                      <span className="font-mono text-[8px] uppercase tracking-[0.5em] block mb-1"
                        style={{ color: active.color }}>Active // 0{activeCard + 1}</span>
                      <p className="font-black text-xl text-white uppercase tracking-tight leading-none">{active.label}</p>
                    </motion.div>
                    <motion.div key={`stat-${activeCard}`}
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="px-3 py-2 rounded-xl border text-right"
                      style={{ borderColor: `${active.color}25`, background: `${active.color}10` }}>
                      <p className="font-black text-xl leading-none" style={{ color: active.color }}>{active.stat}</p>
                      <p className="text-[8px] font-black uppercase tracking-widest text-neutral-600 mt-0.5">{active.statL}</p>
                    </motion.div>
                  </div>
                  {/* Bottom color line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px transition-all duration-700"
                    style={{ background: active.color, opacity: 0.3 }} />
                </div>

                {/* Bottom metrics */}
                <div className="grid grid-cols-3 divide-x divide-white/5 border-t border-white/5">
                  {[
                    { label: "Timeline", val: "2–12 wks" },
                    { label: "Stack",    val: "Modern" },
                    { label: "Support",  val: "24/7" },
                  ].map((m, i) => (
                    <div key={i} className="py-4 px-5 text-center">
                      <p className="font-black text-sm text-white tracking-tight">{m.val}</p>
                      <p className="text-[8px] font-black uppercase tracking-widest text-neutral-600 mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service selector pills */}
              <div className="flex flex-col gap-2">
                {SERVICES.map((svc, i) => {
                  const Icon = svc.icon;
                  const isActive = activeCard === i;
                  return (
                    <motion.button key={i}
                      className="svc-pill flex items-center gap-4 px-5 py-3 rounded-2xl border text-left w-full cursor-pointer transition-all duration-300"
                      style={{
                        borderColor: isActive ? `${svc.color}30` : "rgba(255,255,255,0.05)",
                        background:  isActive ? `${svc.color}07` : "rgba(255,255,255,0.01)",
                        boxShadow:   isActive ? `0 0 16px ${svc.color}08` : "none",
                      }}
                      onClick={() => setActiveCard(i)}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.15 }}>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                        style={{
                          background: isActive ? `${svc.color}18` : "rgba(255,255,255,0.03)",
                          color: isActive ? svc.color : "rgba(255,255,255,0.2)",
                        }}>
                        <Icon size={15} />
                      </div>
                      <span className="font-black text-sm uppercase tracking-tight flex-1 transition-colors duration-200"
                        style={{ color: isActive ? svc.color : "rgba(255,255,255,0.3)" }}>
                        {svc.label}
                      </span>
                      <div className="flex items-center gap-2">
                        {isActive && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: svc.color, boxShadow: `0 0 6px ${svc.color}` }} />
                        )}
                        <Link href={svc.href}
                          onClick={e => e.stopPropagation()}
                          className="text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg transition-all duration-200 hover:text-black"
                          style={{
                            color: isActive ? svc.color : "rgba(255,255,255,0.1)",
                            background: isActive ? `${svc.color}20` : "transparent",
                          }}>
                          View →
                        </Link>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="sh-scroll absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
        <span className="text-[8px] font-mono text-neutral-600 uppercase tracking-[0.4em]">scroll</span>
        <ChevronDown size={13} className="text-teal-500" />
      </div>

      {/* Bottom ticker */}
      <div className="relative z-10 border-t border-white/5 overflow-hidden py-3 bg-[#020202]/80 backdrop-blur-sm">
        <div className="sh-ticker flex items-center whitespace-nowrap" style={{ width: "200%" }}>
          {[...Array(16)].map((_, i) => (
            <div key={i} className="flex items-center gap-5 px-8 shrink-0">
              <span className="text-[9px] font-black uppercase tracking-[0.5em] text-neutral-700">
                {["SaaS Platforms", "Web Development", "AI Automation", "Mobile Native", "System Architecture", "Cloud Infrastructure"][i % 6]}
              </span>
              <span className="text-teal-500/20">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}