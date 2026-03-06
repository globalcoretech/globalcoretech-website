"use client";

import { motion } from "framer-motion";
import { 
  Rocket, Globe, Cpu, ArrowRight, 
  CheckCircle2, AlertCircle, Sparkles, 
  Smartphone, ShieldCheck, Zap 
} from "lucide-react";
import Link from "next/link";
import CTASection from "@/components/CTA";

// Smooth Animation Wrapper
const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// Updated with your exact folder structure/slugs
const serviceData = [
  {
    title: "SaaS Ecosystems",
    slug: "/services/saas-development",
    icon: <Rocket className="w-8 h-8" />,
    desc: "Robust multi-tenant platforms with subscription and payment integrations built-in.",
    tags: ["Stripe", "Auth Integration", "AWS"],
    color: "from-teal-500/20 to-blue-500/20"
  },
  {
    title: "Web Development",
    slug: "/services/web-development",
    icon: <Globe className="w-8 h-8" />,
    desc: "High-performance digital assets optimized for Core Web Vitals and real business growth.",
    tags: ["Next.js 15", "TypeScript", "Prisma"],
    color: "from-purple-500/20 to-teal-500/20"
  },
  {
    title: "AI Automation",
    slug: "/services/ai-automation",
    icon: <Cpu className="w-8 h-8" />,
    desc: "Implementing cutting-edge AI workflows and LLMs to automate repetitive tasks.",
    tags: ["OpenAI", "LangChain", "Python"],
    color: "from-teal-500/20 to-emerald-500/20"
  },
  {
    title: "Mobile Development",
    slug: "/services/mobile-development",
    icon: <Smartphone className="w-8 h-8" />,
    desc: "High-quality iOS and Android apps with smooth performance and great UX.",
    tags: ["React Native", "Expo", "Firebase"],
    color: "from-blue-500/20 to-purple-500/20"
  }
];

export default function ServicesClient() {
  return (
    <div className="bg-[#0B0F0E] text-white selection:bg-teal-500/30 font-sans">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-48 pb-32 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-150 bg-teal-500/5 blur-[120px] pointer-events-none" />
        
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-teal-400 text-xs font-bold uppercase tracking-[0.2em]">Our Expert Solutions</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.85] mb-8">
            Engineering for <br /> <span className="text-teal-400 italic font-serif">Digital Excellence.</span>
          </h1>
          <p className="text-neutral-400 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
            We don't just build apps. We architect systems that fuel revenue, 
            efficiency, and long-term scalability.
          </p>
        </Reveal>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="py-10 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceData.map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Link href={item.slug} className="group relative block h-full">
                {/* Glow Effect on Hover */}
                <div className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-4xl blur-xl`} />
                
                <div className="relative h-full p-8 rounded-4xl bg-white/2 border border-white/5 hover:border-teal-500/40 transition-all duration-500 backdrop-blur-3xl flex flex-col">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-teal-400 mb-6 group-hover:rotate-6 group-hover:bg-teal-500/10 transition-all duration-500">
                    {item.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-teal-400 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-neutral-500 text-sm mb-6 leading-relaxed grow">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="text-[9px] uppercase tracking-widest px-2 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-400">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-400 group-hover:gap-4 transition-all">
                    View Solution <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= COMPARISON SECTION ================= */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Standard vs <span className="text-teal-400 italic font-serif">Globalcore</span></h2>
            <p className="text-neutral-500">Why system-first architecture beats feature-first development.</p>
          </div>

          <div className="rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/1">
            <div className="grid grid-cols-2 bg-white/5 p-6 border-b border-white/10 text-center text-xs font-bold uppercase tracking-widest">
              <div className="text-neutral-500">Traditional Agency</div>
              <div className="text-teal-400">Our Strategic Build</div>
            </div>
            {[
              { p: "Hard-coded & Slow", s: "API-First & Scalable" },
              { p: "Frequent Downtime", s: "99.9% Uptime SLA" },
              { p: "Security as Afterthought", s: "Built-in Encryption" },
              { p: "Messy Documentation", s: "Self-Documenting Code" }
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-2 border-b border-white/5 last:border-0 p-8 hover:bg-white/2 transition-colors">
                <div className="flex items-center gap-3 text-neutral-500 text-sm italic">
                  <AlertCircle className="w-4 h-4 text-red-500/20" /> {row.p}
                </div>
                <div className="flex items-center gap-3 text-white text-sm font-medium border-l border-white/5 pl-8">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" /> {row.s}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ================= WHO WE SERVE ================= */}
      <section className="py-24 px-6 border-t border-white/5 bg-linear-to-b from-transparent to-teal-500/2">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-1">
            <h2 className="text-4xl font-bold tracking-tighter mb-4 text-white">Who We <span className="text-teal-400 italic">Serve.</span></h2>
            <p className="text-neutral-500 leading-relaxed">From stealth startups to global enterprises, we provide the technical leverage needed to win.</p>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {["B2B SaaS", "E-commerce", "FinTech", "AI Labs", "Healthcare", "Web3"].map((n) => (
              <div key={n} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center text-sm font-bold text-neutral-400 hover:border-teal-500/30 transition-all cursor-default">
                {n}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-20">
        <CTASection />
      </div>
    </div>
  );
}