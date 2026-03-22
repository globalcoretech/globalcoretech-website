"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import {
  Search, Code2, Rocket, PenTool, Terminal, Activity,
  Globe, Fingerprint, Target, Zap, ArrowRight, Layers,
  ChevronDown, Cpu, Shield, Star
} from "lucide-react";
import Image from "next/image";
import CTASection from "@/components/CTA";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// ─── Text Scramble Hook ───────────────────────────────────────────────────────
function useScramble(text: string, trigger: boolean) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01";
  useEffect(() => {
    if (!trigger) return;
    let iter = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split("").map((char, i) =>
          char === " " ? " " : i < iter ? char : chars[Math.floor(Math.random() * chars.length)]
        ).join("")
      );
      if (iter >= text.length) clearInterval(interval);
      iter += 1.2;
    }, 35);
    return () => clearInterval(interval);
  }, [trigger]);
  return display;
}

// ─── Counter Hook ─────────────────────────────────────────────────────────────
function useCounter(end: number, trigger: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [trigger]);
  return count;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const techStack = [
  { name: "AWS", color: "#FF9900" }, { name: "Next.js", color: "#ffffff" },
  { name: "OpenAI", color: "#74aa9c" }, { name: "Anthropic", color: "#d97757" },
  { name: "Docker", color: "#2496ed" }, { name: "Kubernetes", color: "#326ce5" },
  { name: "Stripe", color: "#635bff" }, { name: "Supabase", color: "#3ecf8e" },
  { name: "TypeScript", color: "#3178c6" }, { name: "Vercel", color: "#ffffff" },
];

const phases = [
  {
    num: "01", title: "AUDIT", sub: "Deep Recon",
    icon: <Search size={20} />,
    desc: "We dissect your current architecture — mapping every technical bottleneck, legacy debt, and scaling risk before writing a single line.",
    stat: "2–5 Day Sprint", color: "#2dd4bf",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
  },
  {
    num: "02", title: "DESIGN", sub: "System Blueprint",
    icon: <PenTool size={20} />,
    desc: "Cloud-native architecture blueprints, API contracts, and database schemas — designed for 10x scale from day one.",
    stat: "7–14 Day Sprint", color: "#a78bfa",
    img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200",
  },
  {
    num: "03", title: "BUILD", sub: "Zero Debt Execution",
    icon: <Code2 size={20} />,
    desc: "Modular, tested, documented code delivery. No shortcuts. Every component built to be replaced, upgraded, or scaled independently.",
    stat: "4–12 Week Build", color: "#f59e0b",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200",
  },
  {
    num: "04", title: "SCALE", sub: "Global Rollout",
    icon: <Rocket size={20} />,
    desc: "CI/CD pipelines, auto-scaling infra, 99.99% uptime SLAs. We don't just ship — we operate with you post-launch.",
    stat: "Ongoing / Retainer", color: "#2dd4bf",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
  },
];

const metrics = [
  { val: 20, suffix: "M+", label: "Revenue Architected", prefix: "$", icon: <Activity size={24} /> },
  { val: 50, suffix: "+",  label: "Products Shipped",    prefix: "",  icon: <Rocket size={24} /> },
  { val: 99, suffix: "%",  label: "Client Retention",    prefix: "",  icon: <Star size={24} /> },
  { val: 8,  suffix: "+",  label: "Countries Served",    prefix: "",  icon: <Globe size={24} /> },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function AboutClient() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const stackRef       = useRef<HTMLDivElement>(null);
  const cursorRef      = useRef<HTMLDivElement>(null);
  const cursorDotRef   = useRef<HTMLDivElement>(null);

  const [isMounted,       setIsMounted]       = useState(false);
  const [heroReady,       setHeroReady]       = useState(false);
  const [metricsVisible,  setMetricsVisible]  = useState(false);
  const [activePhase,     setActivePhase]     = useState(0);

  const h1Line1 = useScramble("WE BUILD", heroReady);
  const h1Line2 = useScramble("SYSTEMS", heroReady);

  const c0 = useCounter(metrics[0].val, metricsVisible);
  const c1 = useCounter(metrics[1].val, metricsVisible);
  const c2 = useCounter(metrics[2].val, metricsVisible);
  const c3 = useCounter(metrics[3].val, metricsVisible);
  const counts = [c0, c1, c2, c3];

  useEffect(() => {
    setIsMounted(true);
    const t = setTimeout(() => setHeroReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  // ── Magnetic Cursor ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isMounted) return;
    const cursor = cursorRef.current;
    const dot    = cursorDotRef.current;
    if (!cursor || !dot) return;

    let mx = 0, my = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", onMove);

    let rafId: number;
    const animate = () => {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      cursor.style.transform = `translate(${cx - 20}px, ${cy - 20}px)`;
      dot.style.transform    = `translate(${mx - 4}px, ${my - 4}px)`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const enter = () => gsap.to(cursor, { scale: 2.5, duration: 0.3, ease: "power2.out" });
    const leave = () => gsap.to(cursor, { scale: 1,   duration: 0.3, ease: "power2.out" });
    const els = document.querySelectorAll("a, button, .mag");
    els.forEach(el => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [isMounted]);

  // ── GSAP Animations ──────────────────────────────────────────────────────────
  useGSAP(() => {
    if (!isMounted) return;

    // Hero reveals
    gsap.fromTo(".hero-line",
      { y: "110%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1.4, stagger: 0.15, ease: "expo.out", delay: 0.2 }
    );
    gsap.fromTo(".hero-sub",
      { opacity: 0, y: 30 },
      { opacity: 1,  y: 0,  duration: 1,   delay: 0.9, ease: "power3.out" }
    );
    gsap.fromTo(".hero-badge",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1,   duration: 0.8, delay: 0.3, ease: "back.out(1.7)" }
    );
    gsap.to(".scroll-hint", {
      y: 6, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2
    });

    // Split text headings
    document.querySelectorAll<HTMLElement>(".split-reveal").forEach((el) => {
      const split = new SplitText(el, { type: "chars" });
      gsap.from(split.chars, {
        opacity: 0, y: 80, rotateX: -90, stagger: 0.02, duration: 0.9, ease: "back.out(1.5)",
        scrollTrigger: { trigger: el, start: "top 85%", once: true }
      });
    });

    // Marquee
    gsap.to(".marquee-track", {
      xPercent: -50, duration: 30, repeat: -1, ease: "linear"
    });

    // Phase cards — CSS sticky handles stacking, GSAP only for entrance
    const cards = gsap.utils.toArray<HTMLElement>(".phase-card");
    cards.forEach((card, i) => {
      // Active phase detection via scroll
      ScrollTrigger.create({
        trigger: card,
        start: "top 40%",
        end: "bottom 40%",
        onEnter:     () => setActivePhase(i),
        onEnterBack: () => setActivePhase(i),
      });
      // Simple entrance animation only
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true } }
      );
    });

    // Counter trigger — CSS handles bento reveal animation
    ScrollTrigger.create({
      trigger: ".metrics-section",
      start: "top 80%",
      once: true,
      onEnter: () => setMetricsVisible(true),
    });

    // Line wipes
    gsap.utils.toArray<HTMLElement>(".line-wipe").forEach((el) => {
      gsap.from(el, {
        scaleX: 0, transformOrigin: "left", duration: 1.5, ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true }
      });
    });

    // Founder parallax
    gsap.to(".founder-img-inner", {
      yPercent: -8,
      scrollTrigger: {
        trigger: ".founder-section", start: "top bottom", end: "bottom top", scrub: 1.5
      }
    });

  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <>
      {/* Magnetic Cursor */}
      <div ref={cursorRef}    className="fixed top-0 left-0 w-10 h-10 rounded-full border border-teal-400/60 pointer-events-none z-9999 mix-blend-difference hidden lg:block" />
      <div ref={cursorDotRef} className="fixed top-0 left-0 w-2  h-2  rounded-full bg-teal-400 pointer-events-none z-9999 hidden lg:block" />

      <div ref={containerRef} className="relative bg-[#020202] text-white overflow-x-hidden selection:bg-teal-500/30">

        {/* Noise grain overlay */}
        <div className="fixed inset-0 z-1 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px",
          }}
        />

        {/* Ambient orbs */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] left-[10%]  w-[60vw] h-[60vw] rounded-full bg-teal-500/6   blur-[140px]" />
          <div className="absolute bottom-[10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-500/5 blur-[160px]" />
          <div className="absolute top-[55%] left-[35%]  w-[30vw] h-[30vw] rounded-full bg-amber-500/3  blur-[100px]" />
        </div>

        <div className="relative z-10">

          {/* ═══════════ 1. HERO ═══════════════════════════════════════════════ */}
          <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden">
            {/* Subtle column grid */}
            <div className="absolute inset-0 pointer-events-none hidden lg:grid grid-cols-12 opacity-[0.03]">
              {Array.from({ length: 13 }).map((_, i) => (
                <div key={i} className="border-l border-white h-full" />
              ))}
            </div>

            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 items-center">

              {/* ── Left: Text ── */}
              <div className="lg:col-span-7">
                {/* Badge */}
                <div className="hero-badge inline-flex items-center gap-3 px-5 py-2 rounded-full border border-teal-500/25 bg-teal-500/6 backdrop-blur-md mb-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <Terminal size={12} className="text-teal-400" />
                  <span className="text-teal-400 text-[9px] font-black tracking-[0.6em] uppercase">GlobalCore Tech // Est. 2024</span>
                  <span className="text-teal-400/40 text-[9px] font-mono">v4.0.1</span>
                </div>

                {/* Giant headline — 3 lines */}
                <div className="overflow-hidden mb-1">
                  <h1 className="hero-line text-[17vw] md:text-[11vw] font-black tracking-[-0.04em] leading-[0.82] uppercase italic text-white">
                    {h1Line1}
                  </h1>
                </div>
                <div className="overflow-hidden mb-1">
                  <h1 className="hero-line text-[17vw] md:text-[11vw] font-black tracking-[-0.04em] leading-[0.82] uppercase italic"
                    style={{ WebkitTextStroke: "2px #2dd4bf", color: "transparent" }}>
                    {h1Line2}
                  </h1>
                </div>
                <div className="overflow-hidden mb-10">
                  <h1 className="hero-line text-[17vw] md:text-[11vw] font-black tracking-[-0.04em] leading-[0.82] uppercase italic text-teal-400">
                    THAT WIN.
                  </h1>
                </div>

                {/* Sub copy + CTA arrow */}
                <div className="hero-sub flex flex-col sm:flex-row items-start sm:items-center gap-8">
                  <p className="text-neutral-500 text-lg md:text-xl font-light max-w-md leading-relaxed border-l-2 border-teal-500/30 pl-6">
                    We architect high-performance modular ecosystems — from zero-to-scale — for startups and enterprises that refuse mediocrity.
                  </p>
                  <div
                    className="mag group flex items-center gap-4 cursor-pointer shrink-0"
                    onClick={() => document.getElementById("process-section")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <div className="w-14 h-14 rounded-full border border-teal-500/30 flex items-center justify-center group-hover:bg-teal-500 group-hover:border-teal-500 transition-all duration-300">
                      <ArrowRight size={20} className="text-teal-400 group-hover:text-black transition-colors" />
                    </div>
                    <span className="text-white font-black uppercase tracking-widest text-xs">Our Process</span>
                  </div>
                </div>
              </div>

              {/* ── Right: Hero Visual ── */}
              <div className="hero-sub lg:col-span-5 relative hidden lg:block">
                {/* Main image card */}
                <div className="relative rounded-[2.5rem] overflow-hidden border border-white/8 shadow-[0_0_80px_rgba(45,212,191,0.08)]" style={{ aspectRatio: "4/5" }}>
                  <Image
                    src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=900"
                    alt="GlobalCore Tech — Engineering"
                    fill
                    className="object-cover grayscale"
                    sizes="40vw"
                    priority
                  />
                  {/* Teal tint overlay */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(2,2,2,0.5) 0%, rgba(45,212,191,0.06) 100%)" }} />
                  {/* Bottom fade */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#020202] via-transparent to-transparent opacity-60" />

                  {/* Floating code snippet card */}
                  <div className="absolute top-6 left-6 right-6 bg-black/70 border border-teal-500/20 rounded-2xl p-4 backdrop-blur-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-teal-500/70" />
                      <span className="ml-2 text-neutral-600 font-mono text-[9px]">system.ts</span>
                    </div>
                    <div className="font-mono text-[10px] leading-relaxed space-y-0.5">
                      <p><span className="text-purple-400">const</span> <span className="text-teal-400">system</span> <span className="text-white">= {`{`}</span></p>
                      <p className="pl-4"><span className="text-blue-400">scale</span><span className="text-white">:</span> <span className="text-orange-400">&apos;infinite&apos;</span><span className="text-white">,</span></p>
                      <p className="pl-4"><span className="text-blue-400">uptime</span><span className="text-white">:</span> <span className="text-orange-400">&apos;99.99%&apos;</span><span className="text-white">,</span></p>
                      <p className="pl-4"><span className="text-blue-400">debt</span><span className="text-white">:</span> <span className="text-teal-400">0</span><span className="text-white">,</span></p>
                      <p><span className="text-white">{`}`}</span></p>
                    </div>
                  </div>

                  {/* Bottom status pill */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-teal-500/20 backdrop-blur-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                      <span className="font-mono text-[9px] text-teal-400 uppercase tracking-widest">Systems Online</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                      <span className="font-mono text-[9px] text-white/60 uppercase tracking-widest">v4.0.1</span>
                    </div>
                  </div>
                </div>

                {/* Floating metric card — top right */}
                <div className="absolute -top-4 -right-4 bg-[#0c0c0c] border border-teal-500/20 rounded-2xl px-5 py-4 backdrop-blur-xl shadow-2xl">
                  <p className="text-2xl font-black text-teal-400 tracking-tighter">99.99%</p>
                  <p className="text-neutral-600 text-[9px] uppercase tracking-widest font-black mt-0.5">Uptime SLA</p>
                </div>

                {/* Floating metric card — bottom left */}
                <div className="absolute -bottom-4 -left-4 bg-[#0c0c0c] border border-white/10 rounded-2xl px-5 py-4 backdrop-blur-xl shadow-2xl">
                  <p className="text-2xl font-black text-white tracking-tighter">8+</p>
                  <p className="text-neutral-600 text-[9px] uppercase tracking-widest font-black mt-0.5">Countries</p>
                </div>
              </div>

            </div>



            {/* Scroll hint */}
            <div className="scroll-hint absolute right-8 bottom-10 flex flex-col items-center gap-2 opacity-50">
              <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-[0.3em]">scroll</span>
              <ChevronDown size={14} className="text-teal-500" />
            </div>
          </section>

          {/* ═══════════ 2. MARQUEE ════════════════════════════════════════════ */}
          <div className="py-7 border-y border-white/5 overflow-hidden relative">
            <div className="flex items-center marquee-track" style={{ width: "200%" }}>
              {[...techStack, ...techStack, ...techStack, ...techStack].map((t, i) => (
                <div key={i} className="flex items-center gap-5 px-10 shrink-0">
                  <div className="w-1 h-1 rounded-full bg-white/15" />
                  <span className="text-3xl font-black uppercase tracking-tighter opacity-25 hover:opacity-100 transition-opacity duration-300"
                    style={{ color: t.color }}>
                    {t.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ═══════════ 3. MISSION ════════════════════════════════════════════ */}
          <section className="py-32 px-6 max-w-7xl mx-auto border-b border-white/5">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-2">
                <span className="text-teal-500 font-mono text-[9px] uppercase tracking-[0.5em] font-black">001 / Mission</span>
                <div className="line-wipe h-px bg-teal-500/40 mt-3" />
              </div>
              <div className="lg:col-span-10">
                <h2 className="split-reveal text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-16">
                  We don&apos;t just build products. We engineer{" "}
                  <span className="text-teal-400 italic" style={{ fontFamily: "Georgia, serif" }}>competitive advantages.</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-5">
                  {[
                    { icon: <Shield size={18} />, t: "Zero Compromise",  d: "Every decision made with long-term engineering health in mind. No quick fixes that become tomorrow's fires." },
                    { icon: <Zap    size={18} />, t: "Velocity First",   d: "From concept to production in weeks, not quarters. Speed is architecture when done right." },
                    { icon: <Layers size={18} />, t: "Modular by Design", d: "Every system we build can be scaled, replaced, or extended independently. No monolithic traps." },
                  ].map((item, i) => (
                    <div key={i} className="mag group p-8 rounded-3xl border border-white/5 bg-white/2 hover:border-teal-500/25 hover:bg-teal-500/4 transition-all duration-500 cursor-pointer">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-6 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <h4 className="font-black uppercase tracking-tight mb-3">{item.t}</h4>
                      <p className="text-neutral-500 text-sm leading-relaxed font-light">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════ 4. PHASES — Card Stack ═══════════════════════════════ */}
          <section ref={stackRef} id="process-section" className="relative px-6 border-b border-white/5" style={{ paddingTop: "10vh", paddingBottom: "15vh" }}>

            {/* Sticky nav sidebar (desktop) */}
            <div className="sticky top-[10vh] z-30 max-w-7xl mx-auto pointer-events-none hidden lg:block" style={{ height: 0 }}>
              <div className="absolute left-0 top-0 flex flex-col gap-2">
                <span className="text-teal-500 font-mono text-[9px] uppercase tracking-[0.5em] font-black mb-2">002 / Process</span>
                {phases.map((p, i) => (
                  <div key={i} className={`flex items-center gap-3 transition-all duration-400 ${activePhase === i ? "opacity-100" : "opacity-20"}`}>
                    <div className={`h-px transition-all duration-400 ${activePhase === i ? "w-10 bg-teal-400" : "w-4 bg-white/20"}`} />
                    <span className="font-mono text-[10px] uppercase tracking-widest">{p.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section heading */}
            <div className="max-w-7xl mx-auto mb-24">
              <h2 className="split-reveal text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85]">
                How we <br />
                <span className="text-teal-400 italic" style={{ fontFamily: "Georgia, serif" }}>operate.</span>
              </h2>
            </div>

            {/* Cards */}
            <div className="max-w-7xl mx-auto space-y-[10vh]">
              {phases.map((phase, i) => (
                <div key={i} className="phase-card sticky top-[8vh]">
                  <div className="rounded-[2.5rem] border border-white/7 overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, #0b0b0b 0%, #080808 100%)`,
                      boxShadow: `0 0 80px ${phase.color}12`,
                    }}>
                    <div className="grid lg:grid-cols-2" style={{ minHeight: "72vh" }}>

                      {/* Content */}
                      <div className="p-12 lg:p-20 flex flex-col justify-between relative z-10">
                        <div>
                          <div className="flex items-start justify-between mb-10">
                            <div className="flex items-center gap-4">
                              <div className="w-11 h-11 rounded-xl flex items-center justify-center border"
                                style={{ borderColor: `${phase.color}30`, background: `${phase.color}10`, color: phase.color }}>
                                {phase.icon}
                              </div>
                              <div>
                                <span className="font-mono text-[9px] uppercase tracking-[0.5em] font-black" style={{ color: phase.color }}>Phase_{phase.num}</span>
                                <p className="text-neutral-600 text-[10px] font-light">{phase.sub}</p>
                              </div>
                            </div>
                            <span className="font-black text-8xl text-white/4 select-none">{phase.num}</span>
                          </div>

                          <h3 className="text-6xl md:text-8xl font-black uppercase tracking-[-0.04em] leading-[0.82] mb-8 text-white">
                            {phase.title}
                          </h3>
                          <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed max-w-md">
                            {phase.desc}
                          </p>
                        </div>

                        {/* Timeline bar */}
                        <div className="flex items-center gap-5 pt-10 border-t border-white/6 mt-10">
                          <div className="h-px flex-1 bg-white/7" />
                          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-neutral-600">Timeline</span>
                          <span className="font-black text-sm text-white">{phase.stat}</span>
                          <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center">
                            <ArrowRight size={12} className="text-white/30" />
                          </div>
                        </div>
                      </div>

                      {/* Image */}
                      <div className="relative overflow-hidden min-h-80 lg:min-h-0 border-l border-white/4">
                        <Image
                          src={phase.img}
                          alt={phase.title}
                          fill
                          className="object-cover grayscale hover:grayscale-0 transition-all duration-2000"
                          sizes="50vw"
                        />
                        <div className="absolute inset-0"
                          style={{ background: `linear-gradient(135deg, #0b0b0b80 0%, ${phase.color}12 100%)` }} />
                        <div className="absolute inset-0"
                          style={{ background: "linear-gradient(90deg, #0b0b0b 0%, transparent 35%)" }} />
                        <div className="absolute bottom-8 right-8 font-black text-[14vw] leading-none opacity-[0.04] text-white select-none">
                          {phase.num}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════ 5. METRICS — Bento ═══════════════════════════════════ */}
          <section className="py-40 px-6 max-w-7xl mx-auto metrics-section border-b border-white/5">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-teal-500 font-mono text-[9px] uppercase tracking-[0.5em] font-black block mb-4">003 / Metrics</span>
                <h2 className="split-reveal text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85]">
                  The <span className="text-teal-400 italic" style={{ fontFamily: "Georgia, serif" }}>Proof.</span>
                </h2>
              </div>
              <p className="text-neutral-600 text-sm max-w-xs font-light leading-relaxed">
                Numbers don&apos;t lie. Here&apos;s what GlobalCore Tech has delivered across projects, clients, and continents.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5" style={{ gridAutoRows: "260px" }}>

              {metrics.map((m, i) => (
                <div key={i}
                  className={`bento-item rounded-[2.5rem] border border-white/6 p-10 flex flex-col justify-between relative overflow-hidden group mag cursor-pointer hover:border-teal-500/20
                    ${i === 0 ? "md:col-span-6" : i === 1 ? "md:col-span-6" : i === 2 ? "md:col-span-4" : "md:col-span-8"}`}
                  style={{
                    background: "#0a0a0a",
                    opacity: metricsVisible ? 1 : 0,
                    transform: metricsVisible ? "translateY(0px) scale(1)" : "translateY(40px) scale(0.96)",
                    transition: `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`,
                  }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "radial-gradient(ellipse at top right, rgba(45,212,191,0.06) 0%, transparent 60%)" }} />
                  <div className="text-teal-400/50 z-10 relative group-hover:text-teal-400 transition-colors">{m.icon}</div>
                  <div className="z-10 relative">
                    <div className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-white mb-3">
                      {m.prefix}{counts[i]}{m.suffix}
                    </div>
                    <p className="text-neutral-600 uppercase tracking-[0.3em] text-[10px] font-black">{m.label}</p>
                  </div>
                </div>
              ))}

              {/* Identity card */}
              <div className="bento-item md:col-span-12 rounded-[2.5rem] bg-[#080808] border border-white/6 p-12 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden group"
                style={{
                  opacity: metricsVisible ? 1 : 0,
                  transform: metricsVisible ? "translateY(0px) scale(1)" : "translateY(40px) scale(0.96)",
                  transition: "opacity 0.7s ease 0.48s, transform 0.7s ease 0.48s",
                }}>
                <div className="relative shrink-0">
                  <Fingerprint size={90} className="text-teal-500 opacity-15 group-hover:opacity-30 transition-opacity duration-700" />
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-teal-400 shadow-[0_0_20px_#2dd4bf] animate-scanner z-10" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-3">
                    Identity Verified.<br /><span className="text-teal-400">Trust Engineered.</span>
                  </h3>
                  <p className="text-neutral-600 text-sm font-light">Every client partnership begins with a signed NDA, transparent SLAs, and zero ambiguity.</p>
                </div>
                <div className="shrink-0 flex flex-col gap-2 font-mono text-[9px] text-neutral-700 uppercase tracking-widest">
                  {["NDA_SIGNED", "SLA_ACTIVE", "ISO_COMPLIANT", "GDPR_READY"].map(t => (
                    <div key={t} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-500/40" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════ 6. FOUNDER ════════════════════════════════════════════ */}
          <section className="founder-section py-40 px-6 max-w-7xl mx-auto border-b border-white/5">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-start">

              {/* Image */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-[2.5rem] overflow-hidden bg-neutral-900 border border-white/7" style={{ aspectRatio: "3/4" }}>
                  <div className="founder-img-inner absolute inset-0 w-full h-[115%] top-[-7.5%]">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800"
                      alt="Umesh Yadav — Founder, GlobalCore Tech"
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-2000"
                      sizes="40vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-[#020202] via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                      <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-teal-400">Available for Projects</span>
                    </div>
                  </div>
                </div>
                {/* Floating stat */}
                <div className="absolute -right-2 lg:-right-6 top-1/3 bg-[#0c0c0c] border border-white/10 rounded-2xl p-5 backdrop-blur-xl shadow-2xl">
                  <p className="text-3xl font-black text-white">150+</p>
                  <p className="text-neutral-500 text-[9px] uppercase tracking-widest font-black mt-1">Projects<br />Delivered</p>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-7 pt-4">
                <span className="text-teal-500 font-mono text-[9px] uppercase tracking-[0.5em] font-black block mb-6">004 / Founder</span>
                <h2 className="split-reveal text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.82] mb-12">
                  Built for <br />
                  <span className="text-teal-400 italic" style={{ fontFamily: "Georgia, serif" }}>tomorrow.</span>
                </h2>

                <blockquote className="text-neutral-400 text-xl md:text-2xl font-light leading-relaxed border-l-2 border-teal-500/30 pl-8 mb-14 italic">
                  &quot;Growth exposes structural limitations. We design systems that turn those limitations into compounding advantages.&quot;
                </blockquote>

                <div className="flex items-center gap-5 mb-14">
                  <div className="w-1 h-14 bg-teal-400" />
                  <div>
                    <p className="text-white font-black text-2xl uppercase tracking-tighter">Umesh Yadav</p>
                    <p className="text-neutral-500 text-sm font-light mt-1">Founder & Lead Architect, GlobalCore Tech</p>
                  </div>
                </div>

                {/* Skill bars */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Full-Stack Engineering", level: 95 },
                    { label: "AI / Automation",        level: 90 },
                    { label: "System Architecture",    level: 92 },
                    { label: "Product Strategy",       level: 88 },
                  ].map((skill, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-white/2 border border-white/5">
                      <p className="font-black text-sm uppercase tracking-tight mb-3">{skill.label}</p>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500 rounded-full shadow-[0_0_8px_#2dd4bf]"
                          style={{ width: `${skill.level}%` }} />
                      </div>
                      <p className="text-neutral-600 text-[10px] font-mono mt-2">{skill.level}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>


        <CTASection />

        <style jsx global>{`
          * { cursor: none !important; }
          @keyframes scan {
            0%, 100% { transform: translateY(0px);   opacity: 0.3; }
            50%       { transform: translateY(86px);  opacity: 1;   }
          }
          .animate-scanner { animation: scan 2.5s ease-in-out infinite; }
        `}</style>

        </div>{/* closes relative z-10 */}
      </div>{/* closes containerRef */}
    </>
  );
}