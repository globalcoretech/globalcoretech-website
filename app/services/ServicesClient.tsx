"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Rocket, Globe, Cpu, ArrowRight,
  CheckCircle2, AlertCircle, Sparkles,
  Smartphone, Zap, Shield, Star, ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import CTASection from "@/components/CTA";
import ServicesHero from "./ServicesHero";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const serviceData = [
  {
    title: "SaaS Ecosystems",
    slug: "/services/saas-platforms",
    icon: Rocket,
    desc: "Robust multi-tenant platforms with subscription, billing, and payment integrations built to scale from day one.",
    tags: ["Stripe", "Auth", "AWS", "Multi-tenant"],
    color: "#2dd4bf",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
    stat: "10x", statLabel: "Scale Ready",
    num: "01",
  },
  {
    title: "Web Development",
    slug: "/services/web-apps",
    icon: Globe,
    desc: "High-performance digital assets optimized for Core Web Vitals, SEO, and real business growth at enterprise velocity.",
    tags: ["Next.js 15", "TypeScript", "Prisma"],
    color: "#a78bfa",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800",
    stat: "<500ms", statLabel: "Load Time",
    num: "02",
  },
  {
    title: "AI Automation",
    slug: "/services/ai-automation",
    icon: Cpu,
    desc: "Cutting-edge AI workflows, LLM integrations, and intelligent agents that automate repetitive tasks and decisions.",
    tags: ["OpenAI", "LangChain", "Python", "Agents"],
    color: "#34d399",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=800",
    stat: "80%", statLabel: "Task Reduction",
    num: "03",
  },
  {
    title: "Mobile Development",
    slug: "/services/mobile-apps",
    icon: Smartphone,
    desc: "High-quality cross-platform iOS & Android apps with smooth 60fps performance, great UX, and offline-first architecture.",
    tags: ["React Native", "Expo", "Firebase"],
    color: "#f59e0b",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800",
    stat: "60fps", statLabel: "Performance",
    num: "04",
  },
];

const comparisonRows = [
  { problem: "Hard-coded & Slow",           solution: "API-First & Scalable" },
  { problem: "Frequent Downtime",           solution: "99.99% Uptime SLA" },
  { problem: "Security as Afterthought",    solution: "Built-in Encryption" },
  { problem: "Messy Documentation",         solution: "Self-Documenting Code" },
  { problem: "Vendor Lock-in",              solution: "Open, Portable Systems" },
  { problem: "Bloated Tech Debt",           solution: "Zero-Debt Engineering" },
];

const industries = [
  { name: "B2B SaaS",    color: "#2dd4bf" },
  { name: "E-commerce",  color: "#a78bfa" },
  { name: "FinTech",     color: "#34d399" },
  { name: "AI Labs",     color: "#f59e0b" },
  { name: "Healthcare",  color: "#f472b6" },
  { name: "Web3",        color: "#60a5fa" },
  { name: "EdTech",      color: "#fb923c" },
  { name: "Logistics",   color: "#a3e635" },
];

export default function ServicesClient() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useGSAP(() => {
    // Section titles
    gsap.utils.toArray<HTMLElement>(".sc-title").forEach(el => {
      gsap.fromTo(el,
        { y: 60, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true } }
      );
    });
    // Service cards
    gsap.fromTo(".svc-card",
      { opacity: 0, y: 70, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: ".svc-grid", start: "top 80%", once: true } }
    );
    // Comparison rows
    gsap.fromTo(".cmp-row",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, stagger: 0.08, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".cmp-table", start: "top 80%", once: true } }
    );
    // Industry tiles
    gsap.fromTo(".ind-tile",
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, stagger: 0.06, duration: 0.6, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".ind-grid", start: "top 80%", once: true } }
    );
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="bg-[#020202] text-white selection:bg-teal-500/30 overflow-x-hidden">

      {/* HERO */}
      <ServicesHero />

      {/* ═══════════════════════════════════════════
          SERVICES GRID — Editorial Layout
      ═══════════════════════════════════════════ */}
      <section className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div>
            <span className="text-teal-500 font-mono text-[9px] uppercase tracking-[0.5em] font-black block mb-4">001 / Core Services</span>
            <h2 className="sc-title text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
              What we <br /><span className="text-teal-400 italic" style={{ fontFamily:"Georgia,serif" }}>build.</span>
            </h2>
          </div>
          <p className="text-neutral-600 text-sm max-w-xs font-light leading-relaxed">
            Four core service pillars — each engineered for extreme performance, scalability, and zero technical debt.
          </p>
        </div>

        <div className="svc-grid grid md:grid-cols-2 gap-6">
          {serviceData.map((item, i) => (
            <Link key={i} href={item.slug}>
              <div
                className="svc-card group relative rounded-[2.5rem] border border-white/[0.07] overflow-hidden transition-all duration-500 hover:border-white/20 cursor-pointer"
                style={{ background: "#0a0a0a" }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}>

                {/* Image strip */}
                <div className="relative h-44 overflow-hidden">
                  <img src={item.img} alt={item.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-2000 scale-105 group-hover:scale-100" />
                  <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#0a0a0a]" />
                  {/* Num watermark */}
                  <div className="absolute top-4 right-5 font-black text-7xl leading-none select-none opacity-[0.08] text-white">{item.num}</div>
                  {/* Stat badge */}
                  <div className="absolute top-4 left-5 px-3 py-1.5 rounded-xl bg-black/60 border backdrop-blur-md"
                    style={{ borderColor: `${item.color}30` }}>
                    <p className="font-black text-sm leading-none" style={{ color: item.color }}>{item.stat}</p>
                    <p className="text-neutral-600 text-[8px] font-black uppercase tracking-widest mt-0.5">{item.statLabel}</p>
                  </div>
                  {/* Color tint on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: `linear-gradient(to bottom, ${item.color}10, transparent)` }} />
                </div>

                {/* Content */}
                <div className="p-8 relative">
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at top, ${item.color}08 0%, transparent 70%)` }} />

                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl border flex items-center justify-center relative z-10"
                        style={{ background: `${item.color}10`, borderColor: `${item.color}25` }}>
                        <item.icon size={20} style={{ color: item.color }} />
                      </div>
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-[0.4em] font-black" style={{ color: item.color }}>Service_{item.num}</span>
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all">
                      <ArrowUpRight size={14} className="text-white/30 group-hover:text-white/70 transition-colors" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-black mb-3 uppercase tracking-tight text-white group-hover:text-teal-50 transition-colors relative z-10">
                    {item.title}
                  </h3>
                  <p className="text-neutral-500 text-sm font-light leading-relaxed mb-6 relative z-10 group-hover:text-neutral-300 transition-colors">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 relative z-10">
                    {item.tags.map((tag, j) => (
                      <span key={j} className="text-[9px] uppercase tracking-widest px-3 py-1 rounded-lg border border-white/[0.07] text-neutral-600 group-hover:border-white/15 group-hover:text-neutral-400 transition-all">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 h-px w-6 group-hover:w-full transition-all duration-700 relative z-10"
                    style={{ background: item.color }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          COMPARISON TABLE
      ═══════════════════════════════════════════ */}
      <section className="py-32 px-6 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <span className="text-teal-500 font-mono text-[9px] uppercase tracking-[0.5em] font-black block mb-4">002 / Why Us</span>
          <h2 className="sc-title text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-5">
            Standard vs <br />
            <span className="text-teal-400 italic" style={{ fontFamily:"Georgia,serif" }}>GlobalCore</span>
          </h2>
          <p className="text-neutral-600 text-sm font-light">Why system-first architecture beats feature-first development.</p>
        </div>

        <div className="cmp-table rounded-[2.5rem] overflow-hidden border border-white/[0.07]" style={{ background: "#0a0a0a" }}>
          {/* Header */}
          <div className="grid grid-cols-2 border-b border-white/6">
            <div className="p-6 text-center border-r border-white/6">
              <span className="text-neutral-600 text-[10px] font-black uppercase tracking-[0.4em]">Traditional Agency</span>
            </div>
            <div className="p-6 text-center">
              <span className="text-teal-400 text-[10px] font-black uppercase tracking-[0.4em]">Our Strategic Build</span>
            </div>
          </div>
          {comparisonRows.map((row, i) => (
            <div key={i} className="cmp-row grid grid-cols-2 border-b border-white/4 last:border-0 group hover:bg-white/2 transition-colors">
              <div className="p-7 flex items-center gap-4 border-r border-white/4 text-sm">
                <AlertCircle size={16} className="text-red-500/40 shrink-0" />
                <span className="text-neutral-600 italic">{row.problem}</span>
              </div>
              <div className="p-7 flex items-center gap-4 text-sm">
                <CheckCircle2 size={16} className="text-teal-400 shrink-0" />
                <span className="text-white font-medium">{row.solution}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHO WE SERVE
      ═══════════════════════════════════════════ */}
      <section className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4">
            <span className="text-teal-500 font-mono text-[9px] uppercase tracking-[0.5em] font-black block mb-4">003 / Industries</span>
            <h2 className="sc-title text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
              Who we <br /><span className="text-teal-400 italic" style={{ fontFamily:"Georgia,serif" }}>serve.</span>
            </h2>
            <p className="text-neutral-500 text-base font-light leading-relaxed max-w-xs border-l-2 border-teal-500/20 pl-5">
              From stealth startups to global enterprises — we provide the technical leverage needed to dominate your market.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="ind-grid grid grid-cols-2 sm:grid-cols-4 gap-4">
              {industries.map((ind, i) => (
                <div key={i}
                  className="ind-tile group relative p-6 rounded-2xl border border-white/[0.07] bg-white/2 hover:border-white/20 transition-all duration-300 text-center overflow-hidden cursor-default">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(ellipse at center, ${ind.color}10 0%, transparent 70%)` }} />
                  <div className="w-2 h-2 rounded-full mx-auto mb-3 relative z-10" style={{ background: ind.color }} />
                  <span className="text-sm font-black text-neutral-400 group-hover:text-white transition-colors uppercase tracking-tight relative z-10">
                    {ind.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRUST STRIP
      ═══════════════════════════════════════════ */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
          {[
            { val: "150+", label: "Projects Shipped" },
            { val: "99.99%", label: "Uptime SLA" },
            { val: "8+",    label: "Countries" },
            { val: "< 2hr", label: "Support Response" },
          ].map((item, i) => (
            <div key={i} className="px-8 text-center">
              <p className="text-3xl font-black text-white tracking-tighter mb-1">{item.val}</p>
              <p className="text-neutral-600 text-[9px] font-black uppercase tracking-[0.3em]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}