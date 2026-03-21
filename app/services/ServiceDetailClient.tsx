"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  Cpu, Shield, Zap, CheckCircle2, Target, ArrowRight,
  ArrowUpRight, Terminal, Clock, Star,
  Rocket, Globe, Smartphone, BarChart3,
  ChevronRight, Award, TrendingUp, Lock
} from "lucide-react";
import BackgroundElements from "@/components/BackgroundElements";
import WebsitePreview from "@/components/service-visuals/WebsitePreview";
import MobileAppPreview from "@/components/service-visuals/MobileAppPreview";
import AutomationFlowPreview from "@/components/service-visuals/AutomationFlowPreview";
import SaaSDashboardPreview from "@/components/service-visuals/SaaSDashboardPreview";
import ArchitectureDiagram from "../components/ArchitectureDiagram";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type ServiceData = {
  slug: string;
  title: string;
  heroSubtitle: string;
  overview: string;
  techStack: string[];
  idealFor: string[];
  benefits: { title: string; desc: string }[];
  whyChoose?: string[];
  ctaTitle: string;
  ctaDescription: string;
};

// ── Per-service config ────────────────────────────────────────────────────────
const SERVICE_CONFIG: Record<string, {
  color: string;
  icon: any;
  img: string;
  heroImg: string;
  tagline: string;
  stats: { val: string; label: string }[];
  process: { step: string; title: string; desc: string }[];
  trustPoints: string[];
}> = {
  "web-apps": {
    color: "#a78bfa",
    icon: Globe,
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200",
    heroImg: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1200",
    tagline: "We don't just build websites — we engineer digital growth machines.",
    stats: [
      { val: "<500ms", label: "Avg Load Time" },
      { val: "100/100", label: "Lighthouse Score" },
      { val: "3×", label: "Avg Traffic Growth" },
      { val: "99.99%", label: "Uptime Guarantee" },
    ],
    process: [
      { step: "01", title: "Discovery & Audit", desc: "Analyse your current digital presence, competitors, and growth opportunities." },
      { step: "02", title: "UI/UX Architecture", desc: "Wireframes, design systems, and prototypes built for conversion — tested before code." },
      { step: "03", title: "Engineering Sprint", desc: "Next.js 15, TypeScript, and zero-debt code with full test coverage." },
      { step: "04", title: "Launch & Scale", desc: "CI/CD pipelines, monitoring, and 24/7 post-launch support included." },
    ],
    trustPoints: [
      "Core Web Vitals optimized — Google loves fast sites",
      "Mobile-first responsive across all screen sizes",
      "SEO architecture baked in from day one",
      "Hosted on Vercel / AWS with 99.99% uptime SLA",
      "Full source code ownership — no vendor lock-in ever",
    ],
  },
  "mobile-apps": {
    color: "#f59e0b",
    icon: Smartphone,
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200",
    heroImg: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200",
    tagline: "Apps users don't just download — they keep opening every single day.",
    stats: [
      { val: "60fps", label: "Smooth Animations" },
      { val: "4.8★", label: "Avg App Rating" },
      { val: "iOS+Android", label: "Both Platforms" },
      { val: "Offline", label: "First Architecture" },
    ],
    process: [
      { step: "01", title: "Product Scoping", desc: "User research, persona mapping, and feature prioritisation for a winning MVP." },
      { step: "02", title: "Design & Prototype", desc: "Figma prototypes tested with real users before a single line of code is written." },
      { step: "03", title: "Cross-Platform Build", desc: "React Native with native modules for peak performance on both iOS and Android." },
      { step: "04", title: "Store Submission", desc: "App Store & Play Store optimisation, submission, and ongoing monitoring." },
    ],
    trustPoints: [
      "Single codebase for iOS & Android — no compromise on quality",
      "Push notifications with deep linking support built-in",
      "Offline-first — fully functional without internet connection",
      "App Store Optimization (ASO) included in delivery",
      "React Native Reanimated for buttery 60fps animations",
    ],
  },
  "ai-automation": {
    color: "#34d399",
    icon: Cpu,
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1200",
    heroImg: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1200",
    tagline: "Your best employee — never sleeps, never quits, costs 90% less.",
    stats: [
      { val: "80%", label: "Task Reduction" },
      { val: "24/7", label: "Always Running" },
      { val: "40%", label: "Cost Savings" },
      { val: "<1s", label: "AI Response Time" },
    ],
    process: [
      { step: "01", title: "Workflow Audit", desc: "Identify repetitive tasks, data flows, and the highest-ROI automation targets." },
      { step: "02", title: "AI Blueprint", desc: "Design LLM pipelines, agent architecture, and all integration touchpoints." },
      { step: "03", title: "Build & Train", desc: "Develop custom models, RAG systems, and AI agents trained on your proprietary data." },
      { step: "04", title: "Deploy & Monitor", desc: "Production deployment with real-time monitoring and human-in-loop fallbacks." },
    ],
    trustPoints: [
      "GPT-4 / Claude / Gemini — we pick the best model for your case",
      "RAG systems trained exclusively on your proprietary data",
      "Human-in-loop fallbacks for all critical business decisions",
      "GDPR-compliant data handling and processing pipeline",
      "Full audit trail for every single AI decision made",
    ],
  },
  "saas-platforms": {
    color: "#2dd4bf",
    icon: BarChart3,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
    heroImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
    tagline: "Build once. Charge monthly. Scale infinitely.",
    stats: [
      { val: "MRR", label: "Revenue Model Built-in" },
      { val: "Multi", label: "Tenant Architecture" },
      { val: "Stripe", label: "Billing Integrated" },
      { val: "99.9%", label: "Uptime SLA" },
    ],
    process: [
      { step: "01", title: "Product Architecture", desc: "Multi-tenancy, auth flows, and subscription tiers all designed upfront." },
      { step: "02", title: "Core Platform Build", desc: "Authentication, billing, onboarding flows, and dashboard scaffolding." },
      { step: "03", title: "Feature Sprints", desc: "Rapid 2-week sprints with continuous deployment and real user feedback loops." },
      { step: "04", title: "Growth Infrastructure", desc: "Analytics, A/B testing framework, and scaling infrastructure for hypergrowth." },
    ],
    trustPoints: [
      "Stripe subscriptions, invoicing & webhooks fully integrated",
      "Multi-tenant data isolation — true enterprise-grade security",
      "Role-based access control (RBAC) built into the core",
      "Full analytics dashboard and user insights from day one",
      "Investor-ready, scalable architecture from the ground up",
    ],
  },
  "cloud-solutions": {
    color: "#60a5fa",
    icon: Rocket,
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
    heroImg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
    tagline: "Infrastructure that never fails, scales automatically, and costs less.",
    stats: [
      { val: "99.99%", label: "Uptime SLA" },
      { val: "Auto", label: "Scaling Built-in" },
      { val: "40%", label: "Cost Reduction" },
      { val: "0", label: "Planned Downtime" },
    ],
    process: [
      { step: "01", title: "Infrastructure Audit", desc: "Assess current setup, identify bottlenecks, single points of failure, and cost leaks." },
      { step: "02", title: "Architecture Design", desc: "Multi-region, fault-tolerant blueprint with Infrastructure-as-Code (IaC)." },
      { step: "03", title: "Migration & Setup", desc: "Zero-downtime migration, containerisation with Docker/K8s, and CI/CD setup." },
      { step: "04", title: "24/7 Monitoring", desc: "Alerting, auto-healing, and monthly cost optimisation review calls." },
    ],
    trustPoints: [
      "AWS / GCP / Azure — we work with your preferred cloud provider",
      "Terraform / Pulumi IaC — no manual config, fully reproducible",
      "Docker + Kubernetes for enterprise container orchestration",
      "Automated backups with point-in-time recovery capability",
      "SOC2-ready security configuration and compliance tooling",
    ],
  },
};


// ── Categorized Tech Stacks per service ──────────────────────────────────────
type TechItem = { name: string; badge?: string };
type TechCategory = { label: string; techs: TechItem[] };

const TECH_STACKS: Record<string, TechCategory[]> = {
  "web-apps": [
    { label: "Frontend", techs: [
      { name: "Next.js 15", badge: "Core" }, { name: "React 19" }, { name: "TypeScript" },
      { name: "Tailwind CSS" }, { name: "Framer Motion" }, { name: "GSAP" },
    ]},
    { label: "Backend & API", techs: [
      { name: "Node.js" }, { name: "tRPC" }, { name: "REST API" },
      { name: "GraphQL" }, { name: "Prisma ORM" },
    ]},
    { label: "Database", techs: [
      { name: "PostgreSQL", badge: "Primary" }, { name: "Redis" }, { name: "PlanetScale" }, { name: "Supabase" },
    ]},
    { label: "Infrastructure & Deploy", techs: [
      { name: "Vercel", badge: "Recommended" }, { name: "AWS" }, { name: "Docker" },
      { name: "GitHub Actions CI/CD" }, { name: "Cloudflare CDN" },
    ]},
    { label: "Monitoring & SEO", techs: [
      { name: "Sentry" }, { name: "Datadog" }, { name: "Google Analytics 4" }, { name: "Umami" },
    ]},
  ],
  "mobile-apps": [
    { label: "Core Framework", techs: [
      { name: "React Native", badge: "Core" }, { name: "Expo SDK 51" }, { name: "TypeScript" },
    ]},
    { label: "Navigation & UI", techs: [
      { name: "Expo Router" }, { name: "React Navigation" }, { name: "NativeWind" },
      { name: "Reanimated 3", badge: "60fps" }, { name: "Lottie" },
    ]},
    { label: "Backend & Realtime", techs: [
      { name: "Firebase", badge: "Realtime" }, { name: "Supabase" }, { name: "tRPC" },
      { name: "REST API" }, { name: "WebSockets" },
    ]},
    { label: "State & Storage", techs: [
      { name: "Zustand" }, { name: "React Query" }, { name: "MMKV Storage" }, { name: "SQLite" },
    ]},
    { label: "Push & Auth", techs: [
      { name: "Expo Notifications" }, { name: "Clerk Auth" }, { name: "Firebase Auth" }, { name: "Biometrics" },
    ]},
    { label: "Release & Monitoring", techs: [
      { name: "EAS Build", badge: "Expo" }, { name: "Sentry" }, { name: "CodePush" }, { name: "TestFlight" },
    ]},
  ],
  "ai-automation": [
    { label: "AI Models & APIs", techs: [
      { name: "OpenAI GPT-4o", badge: "Primary" }, { name: "Anthropic Claude" },
      { name: "Google Gemini" }, { name: "Mistral" }, { name: "Ollama (Local)" },
    ]},
    { label: "AI Frameworks", techs: [
      { name: "LangChain", badge: "Orchestration" }, { name: "LangGraph" },
      { name: "LlamaIndex" }, { name: "AutoGen" }, { name: "CrewAI" },
    ]},
    { label: "Vector & RAG", techs: [
      { name: "Pinecone", badge: "Vector DB" }, { name: "Weaviate" },
      { name: "Chroma" }, { name: "PGVector" }, { name: "Embeddings API" },
    ]},
    { label: "Backend & APIs", techs: [
      { name: "Python FastAPI", badge: "Core" }, { name: "Node.js" },
      { name: "Celery" }, { name: "Redis Queue" }, { name: "WebSockets" },
    ]},
    { label: "Data & Pipelines", techs: [
      { name: "Apache Kafka" }, { name: "Airflow" }, { name: "Pandas" },
      { name: "PostgreSQL" }, { name: "MongoDB" },
    ]},
    { label: "Infrastructure", techs: [
      { name: "AWS Lambda" }, { name: "Docker" }, { name: "Kubernetes" },
      { name: "GitHub Actions" }, { name: "Datadog" },
    ]},
  ],
  "saas-platforms": [
    { label: "Frontend", techs: [
      { name: "Next.js 15", badge: "Core" }, { name: "TypeScript" }, { name: "Tailwind CSS" },
      { name: "Radix UI" }, { name: "Recharts" },
    ]},
    { label: "Auth & Users", techs: [
      { name: "Clerk", badge: "Recommended" }, { name: "NextAuth.js" },
      { name: "Auth0" }, { name: "RBAC Custom" },
    ]},
    { label: "Billing & Payments", techs: [
      { name: "Stripe", badge: "Primary" }, { name: "Stripe Webhooks" },
      { name: "Paddle" }, { name: "Lemon Squeezy" },
    ]},
    { label: "Backend & Database", techs: [
      { name: "Node.js" }, { name: "tRPC" }, { name: "Prisma ORM" },
      { name: "PostgreSQL" }, { name: "Redis" }, { name: "PlanetScale" },
    ]},
    { label: "Email & Notifications", techs: [
      { name: "Resend", badge: "Preferred" }, { name: "SendGrid" },
      { name: "Postmark" }, { name: "Push API" },
    ]},
    { label: "Analytics & Deploy", techs: [
      { name: "Vercel", badge: "Deploy" }, { name: "PostHog Analytics" },
      { name: "Sentry" }, { name: "AWS S3" }, { name: "Cloudflare" },
    ]},
  ],
  "cloud-solutions": [
    { label: "Cloud Providers", techs: [
      { name: "AWS", badge: "Primary" }, { name: "Google Cloud" },
      { name: "Azure" }, { name: "DigitalOcean" },
    ]},
    { label: "Containerisation", techs: [
      { name: "Docker", badge: "Core" }, { name: "Kubernetes" },
      { name: "Helm Charts" }, { name: "Amazon ECS" }, { name: "EKS" },
    ]},
    { label: "Infrastructure as Code", techs: [
      { name: "Terraform", badge: "Primary" }, { name: "Pulumi" },
      { name: "AWS CDK" }, { name: "Ansible" },
    ]},
    { label: "CI/CD Pipelines", techs: [
      { name: "GitHub Actions", badge: "Preferred" }, { name: "GitLab CI" },
      { name: "CircleCI" }, { name: "Jenkins" }, { name: "ArgoCD" },
    ]},
    { label: "Observability", techs: [
      { name: "Datadog", badge: "Full Stack" }, { name: "Grafana" },
      { name: "Prometheus" }, { name: "PagerDuty" }, { name: "Sentry" },
    ]},
    { label: "Security & Networking", techs: [
      { name: "Cloudflare WAF" }, { name: "AWS VPC" },
      { name: "HashiCorp Vault" }, { name: "Let's Encrypt" }, { name: "AWS IAM" },
    ]},
  ],
};

export default function ServiceDetailClient({ service }: { service: ServiceData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImgRef   = useRef<HTMLDivElement>(null);

  const cfg   = SERVICE_CONFIG[service.slug] || SERVICE_CONFIG["web-apps"];
  const color = cfg.color;

  const getArchType = () => {
    if (service.slug.includes("ai"))    return "ai-automation";
    if (service.slug.includes("saas"))  return "saas-development";
    return "web-development";
  };

  useGSAP(() => {
    gsap.fromTo(".sd-badge",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.7, delay: 0.2, ease: "back.out(1.7)" }
    );
    gsap.fromTo(".sd-h-line",
      { y: "110%", opacity: 0 },
      { y: "0%", opacity: 1, stagger: 0.08, duration: 1.3, delay: 0.3, ease: "expo.out" }
    );
    gsap.fromTo(".sd-sub",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 1, delay: 0.8, ease: "power3.out" }
    );
    gsap.fromTo(".sd-feat-card",
      { opacity: 0, x: 40, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, stagger: 0.1, duration: 0.9, delay: 0.6, ease: "power3.out" }
    );
    gsap.to(heroImgRef.current, {
      yPercent: -8,
      scrollTrigger: { trigger: heroImgRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 }
    });
    gsap.utils.toArray<HTMLElement>(".sd-sec-title").forEach(el => {
      gsap.fromTo(el,
        { y: 50, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true } }
      );
    });
    gsap.fromTo(".sd-process-step",
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, stagger: 0.12, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".sd-process-list", start: "top 80%", once: true } }
    );
    gsap.fromTo(".sd-benefit-card",
      { opacity: 0, y: 40, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.9, ease: "power4.out",
        scrollTrigger: { trigger: ".sd-benefits-grid", start: "top 80%", once: true } }
    );
    gsap.fromTo(".sd-trust-item",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, stagger: 0.08, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".sd-trust-list", start: "top 82%", once: true } }
    );
    gsap.fromTo(".sd-tech-tag",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, stagger: 0.05, duration: 0.5, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".sd-tech-grid", start: "top 82%", once: true } }
    );
    gsap.fromTo(".sd-ideal-item",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".sd-ideal-list", start: "top 82%", once: true } }
    );
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-[#020202] pb-20 relative overflow-hidden text-white">
      <BackgroundElements />

      {/* Ambient orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[140px]"
          style={{ background: `${color}07` }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-violet-500/4 blur-[160px]" />
      </div>
      {/* Noise */}
      <div className="fixed inset-0 z-1 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize:"128px" }} />

      <div className="relative z-10">

        {/* ══════════════════════════════════
            1. HERO — Cinematic 2-col
        ══════════════════════════════════ */}
        <section className="min-h-screen grid lg:grid-cols-2">

          {/* Left */}
          <div className="px-8 md:px-16 pt-32 pb-16 flex flex-col justify-center">
            <div className="sd-badge inline-flex items-center gap-3 px-5 py-2 rounded-full border bg-white/3 backdrop-blur-md mb-10 w-fit"
              style={{ borderColor: `${color}30` }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
              <Terminal size={11} style={{ color }} />
              <span className="text-[9px] font-black tracking-[0.5em] uppercase" style={{ color }}>
                {service.heroSubtitle}
              </span>
            </div>

            {/* Multi-line headline */}
            <div className="mb-6">
              {service.title.split(" ").reduce((acc: string[][], word) => {
                const last = acc[acc.length - 1];
                if (!last || last.join(" ").length + word.length > 14) acc.push([word]);
                else last.push(word);
                return acc;
              }, []).map((lineWords, li) => (
                <div key={li} className="overflow-hidden">
                  <h1 className="sd-h-line text-[10vw] md:text-[5.5vw] font-black tracking-tighter leading-[0.85] uppercase"
                    style={{ color: li === 0 ? "white" : li === 1 ? color : "white" }}>
                    {lineWords.join(" ")}
                  </h1>
                </div>
              ))}
            </div>

            <p className="sd-sub text-neutral-400 text-lg font-light max-w-md leading-relaxed mb-3 border-l-2 pl-6 italic"
              style={{ borderColor: `${color}40` }}>
              {cfg.tagline}
            </p>
            <p className="sd-sub text-neutral-600 text-sm font-light max-w-md leading-relaxed mb-10">
              {service.overview}
            </p>

            <div className="sd-sub flex flex-wrap items-center gap-4 mb-10">
              <Link href="/contact">
                <div className="group flex items-center gap-3 px-8 py-4 rounded-full font-black uppercase tracking-widest text-[11px] transition-all duration-300 hover:scale-105 cursor-pointer"
                  style={{ background: color, color: "#000" }}>
                  Start Your Project
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link href="/services">
                <div className="group flex items-center gap-2 text-neutral-600 hover:text-white border border-white/8 px-5 py-4 rounded-full hover:border-white/20 transition-all text-[10px] font-black uppercase tracking-widest cursor-pointer">
                  All Services <ArrowUpRight size={12} />
                </div>
              </Link>
            </div>

            {/* Mini trust badges */}
            <div className="sd-sub flex flex-wrap gap-2">
              {[
                { icon: Shield, text: "NDA Protected" },
                { icon: Clock,  text: "24h Response" },
                { icon: Award,  text: "Code Ownership" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.07] bg-white/2">
                  <b.icon size={11} className="text-teal-400" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500">{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image + floating stat cards */}
          <div className="relative h-full min-h-screen hidden lg:flex items-center justify-center overflow-hidden">
            <div ref={heroImgRef} className="absolute inset-0 w-full h-[115%] -top-[7.5%]">
              <img src={cfg.heroImg} alt={service.title}
                className="w-full h-full object-cover grayscale" />
              <div className="absolute inset-0"
                style={{ background: `linear-gradient(to right, #020202 0%, transparent 40%, ${color}08 100%)` }} />
              <div className="absolute inset-0 bg-linear-to-b from-[#020202]/30 via-transparent to-[#020202]/50" />
            </div>
            <div className="relative z-10 grid grid-cols-2 gap-4 p-12">
              {cfg.stats.map((stat, i) => (
                <div key={i} className="sd-feat-card p-5 rounded-2xl border border-white/9 backdrop-blur-xl text-center"
                  style={{ background: "rgba(2,2,2,0.75)", boxShadow: i === 0 ? `0 0 30px ${color}15` : "none" }}>
                  <p className="text-2xl font-black tracking-tighter mb-1" style={{ color: i === 0 ? color : "white" }}>
                    {stat.val}
                  </p>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-neutral-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            2. STATS STRIP
        ══════════════════════════════════ */}
        <section className="border-y border-white/6 py-6">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/6">
            {cfg.stats.map((stat, i) => (
              <div key={i} className="px-8 py-3 text-center">
                <p className="text-2xl font-black tracking-tighter mb-1" style={{ color }}>{stat.val}</p>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-neutral-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════
            3. LIVE PROTOTYPE
        ══════════════════════════════════ */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-[9px] uppercase tracking-[0.5em] font-black mb-3 block" style={{ color }}>
              Live System Prototype
            </span>
            <h2 className="sd-sec-title text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.85]">
              See it in <span className="italic" style={{ color, fontFamily: "Georgia,serif" }}>action.</span>
            </h2>
          </div>
          <div className="rounded-[2.5rem] overflow-hidden border border-white/[0.07]" style={{ background: "#0a0a0a" }}>
            <div className="h-14 border-b border-white/6 px-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="font-mono text-[9px] text-neutral-600 uppercase tracking-[0.4em] ml-3">
                  Live_System_Prototype // {service.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
                <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color }}>Active</span>
              </div>
            </div>
            <div className="p-6 md:p-12">
              {service.slug === "web-apps"        && <WebsitePreview />}
              {service.slug === "saas-platforms"  && <SaaSDashboardPreview />}
              {service.slug === "mobile-apps"     && <MobileAppPreview />}
              {service.slug === "ai-automation"   && <AutomationFlowPreview />}
              {service.slug === "cloud-solutions" && <SaaSDashboardPreview />}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            4. PROCESS TIMELINE
        ══════════════════════════════════ */}
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.5em] font-black mb-4 block" style={{ color }}>
                Our Process
              </span>
              <h2 className="sd-sec-title text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
                How we <br /><span className="italic" style={{ color, fontFamily: "Georgia,serif" }}>do it.</span>
              </h2>
              <p className="text-neutral-500 text-base font-light leading-relaxed border-l-2 pl-5"
                style={{ borderColor: `${color}40` }}>
                A proven 4-phase process used across 150+ successful projects — no guesswork, just results.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="sd-process-list flex flex-col">
                {cfg.process.map((step, i) => (
                  <div key={i} className="sd-process-step group flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-black text-sm shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{ borderColor: color, color, background: `${color}10` }}>
                        {step.step}
                      </div>
                      {i < cfg.process.length - 1 && (
                        <div className="w-px mt-2 mb-0" style={{ background: `${color}20`, height: "52px" }} />
                      )}
                    </div>
                    <div className="pb-10 pt-1">
                      <h3 className="font-black text-xl uppercase tracking-tight mb-2 group-hover:text-teal-50 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-neutral-500 text-sm font-light leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            5. BENEFITS + IDEAL FOR
        ══════════════════════════════════ */}
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Ideal For */}
            <div className="lg:col-span-4">
              <h2 className="sd-sec-title text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
                <Target size={20} style={{ color }} /> Who it&apos;s for
              </h2>
              <div className="sd-ideal-list flex flex-col gap-3 mb-8">
                {service.idealFor.map((item, i) => (
                  <div key={i} className="sd-ideal-item group flex items-center gap-4 p-5 rounded-2xl border border-white/6 bg-white/2 hover:border-white/15 transition-all duration-300">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                    <span className="text-neutral-400 text-sm font-medium group-hover:text-white transition-colors">{item}</span>
                    <ChevronRight size={14} className="text-neutral-700 ml-auto group-hover:text-white/40 transition-colors" />
                  </div>
                ))}
              </div>
              {/* Why Choose */}
              {service.whyChoose && (
                <div className="p-6 rounded-2xl border border-white/6 bg-white/2">
                  <div className="flex items-center gap-3 mb-4">
                    <Star size={15} style={{ color }} />
                    <span className="font-black text-sm uppercase tracking-widest">Why clients choose us</span>
                  </div>
                  {service.whyChoose.map((w, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                      <CheckCircle2 size={12} style={{ color }} />
                      <span className="text-neutral-400 text-[11px] font-light">{w}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Benefits */}
            <div className="lg:col-span-8">
              <h2 className="sd-sec-title text-3xl font-black uppercase tracking-tighter mb-8">Business Impact</h2>
              <div className="sd-benefits-grid grid sm:grid-cols-2 gap-4">
                {service.benefits.map((b, i) => (
                  <div key={i} className="sd-benefit-card group relative p-7 rounded-2xl border border-white/6 overflow-hidden transition-all duration-500 hover:border-white/20"
                    style={{ background: "#0a0a0a" }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at top left, ${color}08 0%, transparent 60%)` }} />
                    <div className="w-10 h-10 rounded-xl border flex items-center justify-center mb-5 relative z-10 group-hover:scale-110 transition-transform"
                      style={{ background: `${color}10`, borderColor: `${color}25`, color }}>
                      <TrendingUp size={18} />
                    </div>
                    <h4 className="text-lg font-black mb-2 uppercase tracking-tight relative z-10">{b.title}</h4>
                    <p className="text-neutral-500 text-sm font-light leading-relaxed relative z-10 group-hover:text-neutral-300 transition-colors">{b.desc}</p>
                    <div className="mt-5 h-px w-5 group-hover:w-full transition-all duration-700 relative z-10"
                      style={{ background: color }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            6. TRUST — Why Trust Us
        ══════════════════════════════════ */}
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/[0.07]" style={{ aspectRatio: "4/3" }}>
                <img src={cfg.img} alt={service.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-2000" />
                <div className="absolute inset-0 bg-linear-to-t from-[#020202] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-xl border border-white/10 bg-black/60">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
                    <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color }}>Production Ready</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-xl border border-white/10 bg-black/60">
                    <Lock size={10} className="text-neutral-500" />
                    <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">NDA Protected</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Trust points */}
            <div className="lg:col-span-7">
              <span className="font-mono text-[9px] uppercase tracking-[0.5em] font-black mb-4 block" style={{ color }}>
                Why Trust Us
              </span>
              <h2 className="sd-sec-title text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.85] mb-10">
                Built to <br /><span className="italic" style={{ color, fontFamily: "Georgia,serif" }}>last.</span>
              </h2>

              <div className="sd-trust-list flex flex-col gap-3 mb-8">
                {cfg.trustPoints.map((point, i) => (
                  <div key={i} className="sd-trust-item group flex items-center gap-5 p-5 rounded-2xl border border-white/6 bg-white/2 hover:border-white/15 transition-all duration-300">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${color}10`, color }}>
                      <CheckCircle2 size={15} />
                    </div>
                    <span className="text-neutral-300 text-sm font-light group-hover:text-white transition-colors">{point}</span>
                  </div>
                ))}
              </div>

              {/* Guarantee */}
              <div className="p-6 rounded-2xl border flex items-center gap-5"
                style={{ borderColor: `${color}25`, background: `${color}05` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${color}15`, color }}>
                  <Shield size={22} />
                </div>
                <div>
                  <p className="font-black text-base text-white mb-1">30-Day Quality Guarantee</p>
                  <p className="text-neutral-500 text-sm font-light">If we miss a milestone, you don't pay for that sprint. Period.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            7. ARCHITECTURE — Cinematic
        ══════════════════════════════════ */}
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
          {/* Header */}
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-16">
            <div className="lg:col-span-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.5em] font-black mb-4 block" style={{ color }}>
                System Logic
              </span>
              <h2 className="sd-sec-title text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.82]">
                How it <br />
                <span className="italic" style={{ color, fontFamily: "Georgia,serif" }}>connects.</span>
              </h2>
            </div>
            <p className="lg:col-span-6 text-neutral-500 text-base font-light leading-relaxed border-l-2 pl-6 lg:mb-2"
              style={{ borderColor: `${color}30` }}>
              Every layer of your {service.title} system — from frontend to database to deployment — visualised as a cohesive, zero-downtime pipeline.
            </p>
          </div>

          {/* Diagram card — cinematic wrapper */}
          <div className="relative rounded-[2.5rem] overflow-hidden border border-white/[0.07]"
            style={{ background: "linear-gradient(135deg, #0c0c0c 0%, #080808 100%)", boxShadow: `0 0 120px ${color}0a` }}>

            {/* Top bar */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="font-mono text-[9px] text-neutral-600 uppercase tracking-[0.4em] ml-2">
                  System_Architecture // {service.title}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
                  <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color }}>Live</span>
                </div>
                <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/3 border border-white/6">
                  <span className="font-mono text-[9px] text-neutral-600 uppercase tracking-widest">v4.0 // Production</span>
                </div>
              </div>
            </div>

            {/* Glow orb inside */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
              style={{ background: `${color}06` }} />

            {/* Diagram */}
            <div className="p-6 md:p-16 relative z-10">
              <ArchitectureDiagram type={getArchType()} />
            </div>

            {/* Bottom strip — layer legend */}
            <div className="border-t border-white/5 px-8 py-4 flex flex-wrap items-center gap-6">
              {[
                { dot: "#2dd4bf", label: "Frontend Layer" },
                { dot: "#a78bfa", label: "API / Logic Layer" },
                { dot: "#f59e0b", label: "Database Layer" },
                { dot: "#60a5fa", label: "Infrastructure" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.dot }} />
                  <span className="font-mono text-[9px] text-neutral-600 uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            8. TECH STACK — Categorized
        ══════════════════════════════════ */}
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left label */}
            <div className="lg:col-span-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.5em] font-black mb-4 block" style={{ color }}>
                Tech Stack
              </span>
              <h2 className="sd-sec-title text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
                What we <br /><span className="italic" style={{ color, fontFamily: "Georgia,serif" }}>build with.</span>
              </h2>
              <p className="text-neutral-600 text-sm font-light leading-relaxed max-w-xs">
                Every technology chosen for a reason — performance, scalability, and long-term maintainability. We recommend the right stack for your project scale.
              </p>
            </div>

            {/* Right — Categorized stack */}
            <div className="lg:col-span-8 sd-tech-grid">
              {(TECH_STACKS[service.slug] || TECH_STACKS["web-apps"]).map((category, ci) => (
                <div key={ci} className="mb-8 last:mb-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px w-6" style={{ background: color }} />
                    <span className="font-mono text-[9px] uppercase tracking-[0.4em] font-black" style={{ color }}>
                      {category.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.techs.map((tech, ti) => (
                      <div key={ti}
                        className="sd-tech-tag group flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.07] bg-white/2 hover:border-white/20 hover:bg-white/4 transition-all duration-300 cursor-default">
                        <span className="text-sm font-black text-neutral-400 group-hover:text-white transition-colors tracking-tight">
                          {tech.name}
                        </span>
                        {tech.badge && (
                          <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md"
                            style={{ background: `${color}20`, color }}>
                            {tech.badge}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Scale recommendation note */}
              <div className="mt-8 p-5 rounded-2xl border border-white/6 bg-white/2 flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${color}10`, color }}>
                  <Zap size={15} />
                </div>
                <div>
                  <p className="font-black text-sm text-white mb-1">Stack scales with your project</p>
                  <p className="text-neutral-600 text-[11px] font-light leading-relaxed">
                    For an MVP we use a leaner stack. For enterprise-scale, we add Redis, Kubernetes, and multi-region infra. We always recommend what your actual scale needs — nothing more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            8.5 ROADMAP TEASER — Between tech & CTA
        ══════════════════════════════════ */}
        <section className="py-16 px-6 max-w-5xl mx-auto">
          <div className="relative rounded-4xl overflow-hidden border p-8 md:p-10 flex flex-col md:flex-row items-center gap-8"
            style={{ borderColor: "rgba(255,255,255,0.06)", background: "#0a0a0a" }}>
            {/* Left glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at left, ${color}06 0%, transparent 60%)` }} />

            {/* Icon */}
            <div className="relative shrink-0 w-16 h-16 rounded-2xl border flex items-center justify-center"
              style={{ background: `${color}10`, borderColor: `${color}25` }}>
              <Rocket size={28} style={{ color }} />
            </div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left relative z-10">
              <p className="font-mono text-[9px] uppercase tracking-[0.5em] font-black mb-2" style={{ color }}>
                Not Sure Where to Start?
              </p>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none mb-2 text-white">
                Generate your free <span className="italic" style={{ color, fontFamily: "Georgia,serif" }}>roadmap.</span>
              </h3>
              <p className="text-neutral-600 text-sm font-light max-w-sm">
                Describe your idea — get a custom tech stack, timeline, and build phases in seconds. Free, no sign-up.
              </p>
            </div>

            {/* CTA */}
            <Link href="/roadmap-generator" className="shrink-0 relative z-10">
              <div className="group flex items-center gap-3 px-7 py-4 rounded-full font-black uppercase tracking-widest text-[10px] transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
                style={{ background: color, color: "#000" }}>
                Try It Free
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>

        {/* ══════════════════════════════════
            9. BOTTOM CTA
        ══════════════════════════════════ */}
        <section className="py-24 px-6 max-w-5xl mx-auto">
          <div className="relative rounded-[2.5rem] border overflow-hidden text-center px-8 py-20"
            style={{ borderColor: `${color}20`, background: "#0a0a0a", boxShadow: `0 0 100px ${color}08` }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
              style={{ borderColor: `${color}25`, background: `${color}08` }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
              <span className="text-[9px] font-black tracking-[0.5em] uppercase" style={{ color }}>
                Currently Accepting Projects
              </span>
            </div>

            <h2 className="sd-sec-title text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.82] mb-6">
              {service.ctaTitle || "Ready to build?"}<br />
              <span className="italic" style={{ color, fontFamily: "Georgia,serif" }}>Let&apos;s talk.</span>
            </h2>
            <p className="text-neutral-500 text-lg font-light max-w-md mx-auto mb-10 leading-relaxed">
              {service.ctaDescription || "Get a technical scoping call within 24 hours. No fluff, just clarity."}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <div className="group flex items-center gap-3 px-10 py-5 rounded-full font-black uppercase tracking-widest text-[11px] transition-all duration-300 hover:scale-105 cursor-pointer"
                  style={{ background: color, color: "#000" }}>
                  Start Your Project
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <a href="https://wa.me/+917879130175" target="_blank" rel="noreferrer">
                <div className="flex items-center gap-2 px-6 py-5 rounded-full border border-white/10 text-neutral-500 hover:text-white hover:border-white/25 transition-all text-[10px] font-black uppercase tracking-widest cursor-pointer">
                  WhatsApp Us
                </div>
              </a>
            </div>

            <div className="absolute bottom-6 right-8 font-mono text-[8px] text-white/4 uppercase tracking-widest hidden md:block">
              GCT_SYSTEM_READY // v4.0
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}