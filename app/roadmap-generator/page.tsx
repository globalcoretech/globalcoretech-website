"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Lightbulb, Target, ArrowRight, ArrowLeft,
  CheckCircle2, Globe, Layers, Terminal, Cpu,
  Smartphone, BarChart3, Zap, Clock, Users,
  Edit3, Rocket, Shield, TrendingUp, Code2,
  ChevronRight, Calendar, Star, Download
} from "lucide-react";
import confetti from "canvas-confetti";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Types ─────────────────────────────────────────────────────────────────────
type AppType    = "web-app" | "mobile-app" | "saas" | "ai-tool" | "ecommerce" | "";
type Timeline   = "1-3" | "3-6" | "6-12" | "12+" | "";
type BudgetTier = "mvp" | "growth" | "scale" | "";

interface FormData {
  idea:     string;
  audience: string;
  appType:  AppType;
  timeline: Timeline;
  name:     string;
  email:    string;
  phone:    string;
}

interface RoadmapPhase {
  phase:    string;
  duration: string;
  tasks:    string[];
  color:    string;
}

interface TechStack {
  category: string;
  techs:    string[];
  color:    string;
}

interface RoadmapResult {
  title:      string;
  summary:    string;
  phases:     RoadmapPhase[];
  techStack:  TechStack[];
  complexity: string;
  mvpTime:    string;
  keyRisk:    string;
}

// ── Mock result generator (smart based on inputs) ────────────────────────────
function generateMockResult(data: FormData): RoadmapResult {
  const isAI      = data.appType === "ai-tool";
  const isMobile  = data.appType === "mobile-app";
  const isSaaS    = data.appType === "saas";
  const isEcom    = data.appType === "ecommerce";

  const phases: RoadmapPhase[] = [
    {
      phase: "Discovery & Architecture",
      duration: "2–3 weeks",
      tasks: [
        "Technical requirements & system design",
        "Database schema & API contracts",
        "UI/UX wireframes & design system",
        "Infrastructure planning & DevOps setup",
      ],
      color: "#60a5fa",
    },
    {
      phase: "Core MVP Build",
      duration: data.timeline === "1-3" ? "4–6 weeks" : "6–8 weeks",
      tasks: [
        "Authentication & user management",
        isAI  ? "AI/LLM pipeline integration"
               : isMobile ? "Cross-platform mobile foundation"
               : isSaaS   ? "Multi-tenant architecture & billing"
               : "Core product features & CMS",
        "Database integration & API development",
        "Responsive UI implementation",
      ],
      color: "#2dd4bf",
    },
    {
      phase: "Integration & Testing",
      duration: "2–3 weeks",
      tasks: [
        isEcom ? "Payment gateway & cart logic" : "Third-party integrations",
        "Unit, integration & E2E test suite",
        "Performance optimization & caching",
        "Security audit & penetration testing",
      ],
      color: "#a78bfa",
    },
    {
      phase: "Launch & Scale",
      duration: "1–2 weeks",
      tasks: [
        "CI/CD pipeline & production deploy",
        "Monitoring, alerting & error tracking",
        isMobile ? "App Store & Play Store submission" : "SEO & analytics setup",
        "Post-launch support & iteration",
      ],
      color: "#34d399",
    },
  ];

  const techStack: TechStack[] = [
    {
      category: "Frontend",
      techs: isMobile
        ? ["React Native", "Expo SDK 51", "TypeScript", "NativeWind"]
        : ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
      color: "#a78bfa",
    },
    {
      category: "Backend",
      techs: isAI
        ? ["Python FastAPI", "LangChain", "OpenAI API", "Redis Queue"]
        : ["Node.js", "tRPC / REST API", "Prisma ORM", "PostgreSQL"],
      color: "#2dd4bf",
    },
    {
      category: "Infrastructure",
      techs: isMobile
        ? ["Firebase", "AWS S3", "Expo EAS", "GitHub Actions"]
        : ["Vercel / AWS", "Docker", "GitHub Actions CI/CD", "Cloudflare CDN"],
      color: "#60a5fa",
    },
    {
      category: isSaaS ? "Billing & Auth" : isAI ? "AI & Data" : "Integrations",
      techs: isSaaS
        ? ["Stripe", "Clerk Auth", "PostHog Analytics", "Resend Email"]
        : isAI
        ? ["Pinecone Vector DB", "Embeddings API", "Supabase", "Sentry"]
        : isEcom
        ? ["Stripe Payments", "Algolia Search", "Cloudinary", "SendGrid"]
        : ["Stripe", "Resend", "Sentry", "Google Analytics 4"],
      color: "#f59e0b",
    },
  ];

  const complexityMap: Record<AppType | "", string> = {
    "web-app":   "Medium",
    "mobile-app":"Medium–High",
    "saas":      "High",
    "ai-tool":   "High",
    "ecommerce": "Medium",
    "":          "Medium",
  };

  const mvpMap: Record<Timeline | "", string> = {
    "1-3":  "6–8 weeks",
    "3-6":  "8–12 weeks",
    "6-12": "10–14 weeks",
    "12+":  "12–16 weeks",
    "":     "8–12 weeks",
  };

  return {
    title:      `${data.appType ? APP_TYPES.find(a => a.value === data.appType)?.label : "Digital Product"} Roadmap`,
    summary:    `Based on your idea targeting ${data.audience || "your audience"}, we've mapped a ${complexityMap[data.appType]} complexity build. Your product can reach MVP in ${mvpMap[data.timeline]} using a modern, scalable tech stack.`,
    phases,
    techStack,
    complexity: complexityMap[data.appType],
    mvpTime:    mvpMap[data.timeline],
    keyRisk:    isAI ? "LLM API costs can spike — implement rate limiting early." :
                isMobile ? "App Store review can take 3–7 days — plan accordingly." :
                isSaaS ? "Multi-tenancy complexity — invest in architecture upfront." :
                "Scope creep — lock core features before build starts.",
  };
}

// ── Static data ───────────────────────────────────────────────────────────────
const APP_TYPES = [
  { value: "web-app",    label: "Web App",        icon: Globe,        color: "#a78bfa" },
  { value: "mobile-app", label: "Mobile App",     icon: Smartphone,   color: "#f59e0b" },
  { value: "saas",       label: "SaaS Platform",  icon: BarChart3,    color: "#2dd4bf" },
  { value: "ai-tool",    label: "AI Tool",         icon: Cpu,          color: "#34d399" },
  { value: "ecommerce",  label: "E-commerce",     icon: Layers,       color: "#60a5fa" },
];

const TIMELINES = [
  { value: "1-3",  label: "1–3 months",  sub: "MVP Focus",       color: "#34d399" },
  { value: "3-6",  label: "3–6 months",  sub: "Full Product",    color: "#2dd4bf" },
  { value: "6-12", label: "6–12 months", sub: "Enterprise Scale",color: "#a78bfa" },
  { value: "12+",  label: "12+ months",  sub: "Long-term Build", color: "#f59e0b" },
];

const STEPS = [
  { num: 1, label: "Your Idea",    icon: Lightbulb },
  { num: 2, label: "Audience",     icon: Users },
  { num: 3, label: "App Type",     icon: Layers },
  { num: 4, label: "Timeline",     icon: Calendar },
  { num: 5, label: "Your Details", icon: Users },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function RoadmapGenerator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [step,         setStep]         = useState(1);
  const [formData,     setFormData]     = useState<FormData>({ idea: "", audience: "", appType: "", timeline: "", name: "", email: "", phone: "" });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showRoadmap,  setShowRoadmap]  = useState(false);
  const [result,       setResult]       = useState<RoadmapResult | null>(null);
  const [error,        setError]        = useState("");
  const [charCount,    setCharCount]    = useState(0);

  // GSAP entrance
  useGSAP(() => {
    gsap.fromTo(".rm-hero",
      { y: 50, opacity: 0, filter: "blur(12px)" },
      { y: 0,  opacity: 1, filter: "blur(0px)", duration: 1.4, delay: 0.3, ease: "expo.out" }
    );
    gsap.fromTo(".rm-card",
      { y: 60, opacity: 0, scale: 0.97 },
      { y: 0,  opacity: 1, scale: 1,    duration: 1.2, delay: 0.5, ease: "expo.out" }
    );
  }, { scope: containerRef });

  // Result card 3D tilt
  useEffect(() => {
    if (!showRoadmap) return;
    gsap.fromTo(".rm-result-title",
      { y: 60, opacity: 0 },
      { y: 0,  opacity: 1, stagger: 0.12, duration: 1.2, ease: "expo.out" }
    );
    gsap.fromTo(".rm-phase-card",
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0,  scale: 1, stagger: 0.1, duration: 0.9, ease: "power4.out",
        scrollTrigger: { trigger: ".rm-phases", start: "top 85%" } }
    );
    gsap.fromTo(".rm-tech-card",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, stagger: 0.08, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".rm-techs", start: "top 85%" } }
    );
  }, [showRoadmap]);

  const handleNext = () => {
    if (step === 1) {
      if (formData.idea.trim().length < 25) { setError("Please describe your idea in at least 25 characters."); return; }
    }
    if (step === 2) {
      if (!formData.audience.trim()) { setError("Please describe your target audience."); return; }
    }
    if (step === 3 && !formData.appType) { setError("Please select an app type."); return; }
    if (step === 4 && !formData.timeline)  { setError("Please select a timeline."); return; }
    setError(""); setStep(s => s + 1);
  };

  const handleGenerate = async () => {
    if (!formData.name.trim())  { setError("Please enter your name."); return; }
    if (!formData.email.trim() || !formData.email.includes("@")) { setError("Please enter a valid email address."); return; }
    setError("");
    setIsGenerating(true);

    // Generate roadmap result
    const res = generateMockResult(formData);

    // ── Web3Forms email with full client + project details ───────────────────
    try {
      const appTypeLabel  = APP_TYPES.find(a => a.value === formData.appType)?.label  || formData.appType;
      const timelineLabel = TIMELINES.find(t => t.value === formData.timeline)?.label || formData.timeline;

      const emailBody = new FormData();
      emailBody.append("access_key", "9ca8dc8f-3acf-497d-806c-2808b0a75e33"); // ← apni key yahan daalo
      emailBody.append("subject",    `🚀 New Lead: ${formData.name} — ${appTypeLabel} (${timelineLabel})`);
      emailBody.append("from_name",  "GlobalCore Roadmap Tool");
      // ── Client Details ──
      emailBody.append("client_name",  formData.name);
      emailBody.append("client_email", formData.email);
      emailBody.append("client_phone", formData.phone || "Not provided");
      // ── Project Details ──
      emailBody.append("app_type",     appTypeLabel);
      emailBody.append("timeline",     timelineLabel);
      emailBody.append("idea",         formData.idea);
      emailBody.append("audience",     formData.audience);
      // ── Generated Roadmap ──
      emailBody.append("mvp_time",     res.mvpTime);
      emailBody.append("complexity",   res.complexity);
      emailBody.append("tech_stack",   res.techStack.map(t => `${t.category}: ${t.techs.join(", ")}`).join(" | "));
      emailBody.append("key_risk",     res.keyRisk);
      emailBody.append("source",       "Roadmap Generator");
      emailBody.append("botcheck",     "");

      fetch("https://api.web3forms.com/submit", { method: "POST", body: emailBody })
        .catch(() => {});
    } catch (_) {}
    // ────────────────────────────────────────────────────────────────────────

    setTimeout(() => {
      setResult(res);
      setIsGenerating(false);
      setShowRoadmap(true);
      confetti({ particleCount: 180, spread: 80, origin: { y: 0.55 }, colors: ["#2dd4bf","#a78bfa","#f59e0b","#fff"] });
    }, 2200);
  };

  const reset = () => {
    setShowRoadmap(false); setStep(1);
    setFormData({ idea: "", audience: "", appType: "", timeline: "", name: "", email: "", phone: "" });
    setResult(null); setError("");
  };

  const progress = (step / 5) * 100;

  return (
    <main ref={containerRef} className="bg-[#020202] text-white pt-28 pb-24 px-6 relative overflow-hidden">

      {/* Ambient orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-teal-500/5 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-violet-500/4 blur-[160px]" />
      </div>
      {/* Noise */}
      <div className="fixed inset-0 z-1 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize:"128px" }} />

      <div className="max-w-3xl mx-auto relative z-10">

        {!showRoadmap ? (
          <>
            {/* ── Hero header ── */}
            <div className="rm-hero text-center mb-12">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-teal-500/25 bg-teal-500/6 backdrop-blur-md mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-teal-400 text-[9px] font-black tracking-[0.5em] uppercase">Free // No Sign-up Required</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-4">
                Idea <span className="text-teal-400 italic" style={{ fontFamily:"Georgia,serif" }}>Accelerator</span>
              </h1>
              <p className="text-neutral-500 text-base font-light max-w-md mx-auto leading-relaxed">
                Describe your product idea — get a custom technical roadmap, tech stack recommendations, and timeline estimate in seconds.
              </p>
            </div>

            {/* ── Step indicator ── */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {STEPS.map((s, i) => {
                const done    = step > s.num;
                const current = step === s.num;
                return (
                  <React.Fragment key={s.num}>
                    <div className="flex flex-col items-center gap-1">
                      <motion.div
                        animate={{
                          background: done ? "#2dd4bf" : current ? "rgba(45,212,191,0.15)" : "rgba(255,255,255,0.04)",
                          borderColor: done || current ? "#2dd4bf" : "rgba(255,255,255,0.08)",
                          scale: current ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-9 h-9 rounded-full border-2 flex items-center justify-center">
                        {done
                          ? <CheckCircle2 size={16} className="text-black" />
                          : <s.icon size={14} style={{ color: current ? "#2dd4bf" : "rgba(255,255,255,0.25)" }} />
                        }
                      </motion.div>
                      <span className="text-[8px] font-black uppercase tracking-wider"
                        style={{ color: current ? "#2dd4bf" : done ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)" }}>
                        {s.label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="w-8 h-px mb-5 transition-colors duration-300"
                        style={{ background: step > s.num ? "#2dd4bf" : "rgba(255,255,255,0.08)" }} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* ── Form card ── */}
            <div className="rm-card rounded-[2.5rem] border border-white/8 overflow-hidden"
              style={{ background: "#0a0a0a", boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}>

              {/* Progress bar */}
              <div className="h-1 bg-white/4">
                <motion.div className="h-full bg-teal-400 rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }} />
              </div>

              <div className="p-8 md:p-12">
                <AnimatePresence mode="wait">

                  {/* Step 1 — Idea */}
                  {step === 1 && (
                    <motion.div key="s1"
                      initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -30, opacity: 0 }} transition={{ duration: 0.3 }}
                      className="space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-xl bg-teal-400/10 border border-teal-400/20 flex items-center justify-center">
                            <Lightbulb size={15} className="text-teal-400" />
                          </div>
                          <h2 className="font-black text-xl uppercase tracking-tight">Your Vision</h2>
                        </div>
                        <p className="text-neutral-600 text-sm font-light ml-11">What are you building? Be specific — the more detail, the better your roadmap.</p>
                      </div>
                      <div className="relative">
                        <textarea
                          className="w-full rounded-2xl border border-white/[0.07] bg-white/3 p-5 text-white placeholder:text-neutral-700 outline-none focus:border-teal-500/50 focus:bg-teal-500/3 transition-all duration-300 resize-none text-sm leading-relaxed"
                          rows={5}
                          placeholder="e.g. A SaaS platform for freelancers to manage clients, invoices and contracts in one place. It should have a dashboard, payment tracking, and automated reminders..."
                          value={formData.idea}
                          onChange={e => { setFormData({...formData, idea: e.target.value}); setCharCount(e.target.value.length); setError(""); }}
                        />
                        <div className="absolute bottom-3 right-4 flex items-center gap-2">
                          <span className="text-[9px] font-mono"
                            style={{ color: charCount < 25 ? "rgba(255,255,255,0.2)" : "#2dd4bf" }}>
                            {charCount} chars {charCount < 25 ? `(${25 - charCount} more needed)` : "✓"}
                          </span>
                        </div>
                      </div>
                      {error && <p className="text-red-400/80 text-[11px] font-light italic">{error}</p>}
                      <button onClick={handleNext}
                        className="w-full py-4 rounded-2xl bg-teal-400 text-black font-black uppercase tracking-widest text-[11px] hover:bg-white transition-colors duration-300 flex items-center justify-center gap-3 group">
                        Next — Target Audience
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  )}

                  {/* Step 2 — Audience */}
                  {step === 2 && (
                    <motion.div key="s2"
                      initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -30, opacity: 0 }} transition={{ duration: 0.3 }}
                      className="space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-xl bg-violet-400/10 border border-violet-400/20 flex items-center justify-center">
                            <Users size={15} className="text-violet-400" />
                          </div>
                          <h2 className="font-black text-xl uppercase tracking-tight">Target Audience</h2>
                        </div>
                        <p className="text-neutral-600 text-sm font-light ml-11">Who will use this product? Their profile shapes the tech choices.</p>
                      </div>
                      <input
                        className="w-full rounded-2xl border border-white/[0.07] bg-white/3 px-5 py-4 text-white placeholder:text-neutral-700 outline-none focus:border-violet-500/50 focus:bg-violet-500/3 transition-all duration-300 text-sm"
                        placeholder="e.g. Freelancers & solopreneurs aged 25–45, non-technical, primarily using mobile..."
                        value={formData.audience}
                        onChange={e => { setFormData({...formData, audience: e.target.value}); setError(""); }}
                      />
                      {error && <p className="text-red-400/80 text-[11px] font-light italic">{error}</p>}
                      <div className="flex gap-3">
                        <button onClick={() => setStep(1)}
                          className="flex-1 py-4 rounded-2xl border border-white/[0.07] text-neutral-500 hover:text-white hover:border-white/20 transition-all text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                          <ArrowLeft size={14} /> Back
                        </button>
                        <button onClick={handleNext}
                          className="flex-3 py-4 rounded-2xl bg-violet-500 text-white font-black uppercase tracking-widest text-[11px] hover:bg-violet-400 transition-colors duration-300 flex items-center justify-center gap-3 group">
                          Next — App Type
                          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3 — App Type */}
                  {step === 3 && (
                    <motion.div key="s3"
                      initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -30, opacity: 0 }} transition={{ duration: 0.3 }}
                      className="space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                            <Layers size={15} className="text-amber-400" />
                          </div>
                          <h2 className="font-black text-xl uppercase tracking-tight">What Are You Building?</h2>
                        </div>
                        <p className="text-neutral-600 text-sm font-light ml-11">Select the type that best matches your product.</p>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {APP_TYPES.map(type => {
                          const selected = formData.appType === type.value;
                          return (
                            <button key={type.value}
                              onClick={() => { setFormData({...formData, appType: type.value as AppType}); setError(""); }}
                              className="group p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden"
                              style={{
                                borderColor: selected ? type.color : "rgba(255,255,255,0.07)",
                                background:  selected ? `${type.color}12` : "rgba(255,255,255,0.02)",
                              }}>
                              {selected && (
                                <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center"
                                  style={{ background: type.color }}>
                                  <CheckCircle2 size={10} className="text-black" />
                                </div>
                              )}
                              <type.icon size={20} className="mb-3" style={{ color: type.color }} />
                              <p className="font-black text-sm uppercase tracking-tight"
                                style={{ color: selected ? type.color : "rgba(255,255,255,0.6)" }}>
                                {type.label}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                      {error && <p className="text-red-400/80 text-[11px] font-light italic">{error}</p>}
                      <div className="flex gap-3">
                        <button onClick={() => setStep(2)}
                          className="flex-1 py-4 rounded-2xl border border-white/[0.07] text-neutral-500 hover:text-white hover:border-white/20 transition-all text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                          <ArrowLeft size={14} /> Back
                        </button>
                        <button onClick={handleNext}
                          className="flex-3 py-4 rounded-2xl bg-amber-400 text-black font-black uppercase tracking-widest text-[11px] hover:bg-white transition-colors duration-300 flex items-center justify-center gap-3 group">
                          Next — Timeline
                          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4 — Timeline + Generate */}
                  {step === 4 && (
                    <motion.div key="s4"
                      initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -30, opacity: 0 }} transition={{ duration: 0.3 }}
                      className="space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-xl bg-teal-400/10 border border-teal-400/20 flex items-center justify-center">
                            <Calendar size={15} className="text-teal-400" />
                          </div>
                          <h2 className="font-black text-xl uppercase tracking-tight">Expected Timeline</h2>
                        </div>
                        <p className="text-neutral-600 text-sm font-light ml-11">When do you want to launch? This shapes our phase plan.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {TIMELINES.map(t => {
                          const selected = formData.timeline === t.value;
                          return (
                            <button key={t.value}
                              onClick={() => { setFormData({...formData, timeline: t.value as Timeline}); setError(""); }}
                              className="p-5 rounded-2xl border text-left transition-all duration-300 relative"
                              style={{
                                borderColor: selected ? t.color : "rgba(255,255,255,0.07)",
                                background:  selected ? `${t.color}12` : "rgba(255,255,255,0.02)",
                              }}>
                              {selected && (
                                <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full flex items-center justify-center"
                                  style={{ background: t.color }}>
                                  <CheckCircle2 size={10} className="text-black" />
                                </div>
                              )}
                              <p className="font-black text-lg tracking-tighter mb-0.5"
                                style={{ color: selected ? t.color : "white" }}>{t.label}</p>
                              <p className="text-[10px] font-black uppercase tracking-wider text-neutral-600">{t.sub}</p>
                            </button>
                          );
                        })}
                      </div>
                      {error && <p className="text-red-400/80 text-[11px] font-light italic">{error}</p>}

                      {/* Summary before generate */}
                      <div className="p-4 rounded-2xl border border-white/5 bg-white/2 text-sm text-neutral-500 font-light leading-relaxed">
                        <span className="text-teal-400 font-black text-[9px] uppercase tracking-widest block mb-1">Your Input Summary</span>
                        <span className="text-white/60">{formData.idea.slice(0, 80)}{formData.idea.length > 80 ? "..." : ""}</span>
                        {" · "}
                        <span>{formData.audience.slice(0, 40)}{formData.audience.length > 40 ? "..." : ""}</span>
                        {" · "}
                        <span style={{ color: APP_TYPES.find(a => a.value === formData.appType)?.color }}>
                          {APP_TYPES.find(a => a.value === formData.appType)?.label}
                        </span>
                      </div>

                      <div className="flex gap-3">
                        <button onClick={() => setStep(3)}
                          className="flex-1 py-4 rounded-2xl border border-white/[0.07] text-neutral-500 hover:text-white hover:border-white/20 transition-all text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                          <ArrowLeft size={14} /> Back
                        </button>
                        <button onClick={handleNext}
                          className="flex-3 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 group transition-all duration-300"
                          style={{ background: "#2dd4bf", color: "#000" }}>
                          Next — Your Details
                          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 5 — Contact Details */}
                  {step === 5 && (
                    <motion.div key="s5"
                      initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -30, opacity: 0 }} transition={{ duration: 0.3 }}
                      className="space-y-6">

                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-xl bg-teal-400/10 border border-teal-400/20 flex items-center justify-center">
                            <Users size={15} className="text-teal-400" />
                          </div>
                          <h2 className="font-black text-xl uppercase tracking-tight">Almost There!</h2>
                        </div>
                        <p className="text-neutral-600 text-sm font-light ml-11">
                          Where should we send your roadmap? We&apos;ll also reach out within 24 hours if you&apos;d like us to build it.
                        </p>
                      </div>

                      {/* Name */}
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-600 block">Your Name *</label>
                        <input
                          className="w-full rounded-2xl border border-white/[0.07] bg-white/3 px-5 py-4 text-white placeholder:text-neutral-700 outline-none focus:border-teal-500/50 focus:bg-teal-500/3 transition-all duration-300 text-sm"
                          placeholder="e.g. Rahul Sharma"
                          value={formData.name}
                          onChange={e => { setFormData({...formData, name: e.target.value}); setError(""); }}
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-600 block">Email Address *</label>
                        <input
                          type="email"
                          className="w-full rounded-2xl border border-white/[0.07] bg-white/3 px-5 py-4 text-white placeholder:text-neutral-700 outline-none focus:border-teal-500/50 focus:bg-teal-500/3 transition-all duration-300 text-sm"
                          placeholder="rahul@example.com"
                          value={formData.email}
                          onChange={e => { setFormData({...formData, email: e.target.value}); setError(""); }}
                        />
                      </div>

                      {/* Phone — optional */}
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-600 flex items-center gap-2">
                          WhatsApp / Phone
                          <span className="text-neutral-700 normal-case tracking-normal font-light">(optional — faster response)</span>
                        </label>
                        <input
                          type="tel"
                          className="w-full rounded-2xl border border-white/[0.07] bg-white/3 px-5 py-4 text-white placeholder:text-neutral-700 outline-none focus:border-[#25D366]/40 focus:bg-[#25D366]/3 transition-all duration-300 text-sm"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>

                      {/* Privacy note */}
                      <p className="text-[9px] text-neutral-700 font-light leading-relaxed flex items-start gap-2">
                        <Shield size={11} className="text-neutral-700 mt-0.5 shrink-0" />
                        Your details are only used to send your roadmap and for our team to follow up. We never share your data. No spam — ever.
                      </p>

                      {error && <p className="text-red-400/80 text-[11px] font-light italic">{error}</p>}

                      <div className="flex gap-3">
                        <button onClick={() => setStep(4)}
                          className="flex-1 py-4 rounded-2xl border border-white/[0.07] text-neutral-500 hover:text-white hover:border-white/20 transition-all text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                          <ArrowLeft size={14} /> Back
                        </button>
                        <button onClick={handleGenerate} disabled={isGenerating}
                          className="flex-3 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 group transition-all duration-300 disabled:opacity-70"
                          style={{ background: "#2dd4bf", color: "#000" }}>
                          {isGenerating ? (
                            <>
                              <motion.div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                                animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                              Generating Roadmap...
                            </>
                          ) : (
                            <>
                              <Rocket size={15} />
                              Generate My Roadmap
                              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>

            {/* Bottom note */}
            <p className="text-center text-neutral-700 text-[9px] font-mono uppercase tracking-widest mt-6">
              Free tool · No sign-up · Results in seconds
            </p>
          </>
        ) : result && (

          /* ── RESULT VIEW ── */
          <div className="space-y-10">

            {/* Result header */}
            <div className="text-center">
              <div className="rm-result-title inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/20 bg-teal-500/6 mb-6">
                <CheckCircle2 size={13} className="text-teal-400" />
                <span className="text-teal-400 text-[9px] font-black tracking-[0.5em] uppercase">Roadmap Generated</span>
              </div>
              <h2 className="rm-result-title text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.85] mb-4">
                Your <span className="text-teal-400 italic" style={{ fontFamily:"Georgia,serif" }}>Blueprint</span>
              </h2>
              <p className="rm-result-title text-neutral-500 text-sm font-light max-w-lg mx-auto leading-relaxed">
                {result.summary}
              </p>
            </div>

            {/* Key stats strip */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "MVP Timeline",  val: result.mvpTime,    color: "#2dd4bf", icon: Clock },
                { label: "Complexity",    val: result.complexity, color: "#a78bfa", icon: Layers },
                { label: "Tech Maturity", val: "Production",      color: "#34d399", icon: Shield },
              ].map((s, i) => (
                <div key={i} className="p-5 rounded-2xl border border-white/6 bg-white/2 text-center">
                  <s.icon size={16} className="mx-auto mb-2" style={{ color: s.color }} />
                  <p className="font-black text-lg tracking-tighter" style={{ color: s.color }}>{s.val}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-neutral-600 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Phases */}
            <div className="rm-phases space-y-4">
              <h3 className="font-black text-sm uppercase tracking-[0.4em] text-neutral-600 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/5" /> Build Phases <div className="h-px flex-1 bg-white/5" />
              </h3>
              {result.phases.map((phase, i) => (
                <div key={i} className="rm-phase-card group p-6 rounded-2xl border border-white/6 bg-white/2 hover:border-white/15 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at top left, ${phase.color}08, transparent 60%)` }} />
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-black shrink-0 mt-0.5"
                      style={{ borderColor: phase.color, color: phase.color, background: `${phase.color}12` }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-black uppercase tracking-tight text-base text-white">{phase.phase}</h4>
                        <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg"
                          style={{ background: `${phase.color}15`, color: phase.color }}>{phase.duration}</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {phase.tasks.map((task, j) => (
                          <div key={j} className="flex items-center gap-2 text-[11px] text-neutral-500 font-light">
                            <div className="w-1 h-1 rounded-full shrink-0" style={{ background: phase.color }} />
                            {task}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="rm-techs">
              <h3 className="font-black text-sm uppercase tracking-[0.4em] text-neutral-600 flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-white/5" /> Recommended Stack <div className="h-px flex-1 bg-white/5" />
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {result.techStack.map((cat, i) => (
                  <div key={i} className="rm-tech-card p-5 rounded-2xl border border-white/6 bg-white/2">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-px w-4" style={{ background: cat.color }} />
                      <span className="text-[9px] font-black uppercase tracking-[0.4em]" style={{ color: cat.color }}>
                        {cat.category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.techs.map((tech, j) => (
                        <span key={j} className="px-3 py-1.5 rounded-xl border border-white/6 text-[10px] font-black text-neutral-400 hover:text-white hover:border-white/15 transition-colors cursor-default">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key risk */}
            <div className="p-5 rounded-2xl border border-amber-400/20 bg-amber-400/4 flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-amber-400/10 flex items-center justify-center shrink-0">
                <Zap size={15} className="text-amber-400" />
              </div>
              <div>
                <p className="font-black text-sm text-amber-400 uppercase tracking-tight mb-1">Key Risk to Watch</p>
                <p className="text-neutral-400 text-sm font-light">{result.keyRisk}</p>
              </div>
            </div>

            {/* ── LEAD CAPTURE CTA ── */}
            <div className="relative rounded-4xl border overflow-hidden px-8 py-12 text-center"
              style={{ borderColor: "rgba(45,212,191,0.2)", background: "#0a0a0a", boxShadow: "0 0 80px rgba(45,212,191,0.06)" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-linear-to-r from-transparent via-teal-400/40 to-transparent" />

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/20 bg-teal-500/6 mb-6">
                <Star size={11} className="text-teal-400" fill="#2dd4bf" />
                <span className="text-teal-400 text-[9px] font-black tracking-[0.5em] uppercase">Want This Built?</span>
              </div>

              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.85] mb-4">
                We build exactly <br />
                <span className="text-teal-400 italic" style={{ fontFamily:"Georgia,serif" }}>this.</span>
              </h3>
              <p className="text-neutral-500 text-sm font-light max-w-sm mx-auto leading-relaxed mb-8">
                GlobalCore Tech specialises in building products like yours — fast, scalable, and zero technical debt. Share this roadmap with us and get a scoping call within 24 hours.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href={`/contact?from=roadmap&type=${formData.appType}&timeline=${formData.timeline}`}>
                  <div className="group flex items-center gap-3 px-8 py-4 rounded-full bg-teal-400 text-black font-black uppercase tracking-widest text-[11px] hover:bg-white transition-colors duration-300 cursor-pointer">
                    <Rocket size={14} />
                    Let's Build It
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
                <button onClick={reset}
                  className="flex items-center gap-2 text-neutral-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">
                  <Edit3 size={12} /> Generate Another
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}