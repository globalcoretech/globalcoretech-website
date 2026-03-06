"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Cpu, Shield, Zap, CheckCircle2, Target, ArrowRight } from "lucide-react";

// Components
import BackgroundElements from "@/components/BackgroundElements";
import WebsitePreview from "@/components/service-visuals/WebsitePreview";
import MobileAppPreview from "@/components/service-visuals/MobileAppPreview";
import AutomationFlowPreview from "@/components/service-visuals/AutomationFlowPreview";
import SaaSDashboardPreview from "@/components/service-visuals/SaaSDashboardPreview";
import ArchitectureDiagram from "../components/ArchitectureDiagram";

type ServiceData = {
  title: string;
  heroSubtitle: string;
  overview: string;
  techStack: string[];
  idealFor: string[];
  benefits: { title: string; desc: string; }[];
  ctaTitle: string;
  ctaDescription: string;
};

export default function ServiceDetailClient({ service }: { service: ServiceData }) {
  
  const getArchitectureType = () => {
    const title = service.title.toLowerCase();
    if (title.includes("ai")) return "ai-automation";
    if (title.includes("saas")) return "saas-development";
    return "web-development";
  };

  return (
    <main className="min-h-screen bg-[#0B0F0E] pt-32 pb-20 relative overflow-hidden text-white">
      
      {/* Premium Background Elements */}
      <BackgroundElements />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ================= HERO SECTION ================= */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6 backdrop-blur-sm">
               <span className="text-teal-400 text-[10px] font-bold uppercase tracking-widest">{service.heroSubtitle}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter leading-none">
              {service.title.split(' ').map((word, i) => (
                <span key={i} className={i === service.title.split(' ').length - 1 ? "text-teal-400 italic font-serif" : ""}>
                  {word}{" "}
                </span>
              ))}
            </h1>
            <p className="text-neutral-400 text-lg mb-10 max-w-xl leading-relaxed font-light">{service.overview}</p>
            <Link href="/contact" className="group inline-flex items-center gap-3 rounded-full bg-teal-400 px-10 py-5 text-black font-bold hover:bg-teal-300 transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)]">
              Start Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Quick Core Pillars */}
          <div className="grid gap-4">
             {[
               { icon: <Cpu />, title: "Scalable Architecture", desc: "Engineered for rapid growth." },
               { icon: <Shield />, title: "Enterprise Security", desc: "Military-grade data protection." },
               { icon: <Zap />, title: "High Performance", desc: "Sub-500ms server response." }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4 + (i * 0.1) }}
                 className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-6 hover:bg-white/10 transition-all cursor-default backdrop-blur-md"
               >
                  <div className="text-teal-400">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-neutral-500 text-sm">{item.desc}</p>
                  </div>
               </motion.div>
             ))}
          </div>
        </div>

        {/* ================= DYNAMIC VISUAL PREVIEW ================= */}
        <div className="mb-40 rounded-[3rem] overflow-hidden border border-white/5 bg-white/5 p-4 md:p-12 shadow-2xl backdrop-blur-md">
          <div className="mb-8 flex items-center justify-between px-4">
             <div className="flex gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest italic items-center">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="ml-4 tracking-[0.3em]">Live System Prototype</span>
             </div>
          </div>
          {service.title.includes("Web") && <WebsitePreview />}
          {service.title.includes("SaaS") && <SaaSDashboardPreview />}
          {service.title.includes("Mobile") && <MobileAppPreview />}
          {service.title.includes("AI") && <AutomationFlowPreview />}
        </div>

        {/* ================= IDEAL FOR & BENEFITS ================= */}
        <div className="grid lg:grid-cols-3 gap-16 mb-40">
           <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 tracking-tighter italic">
                <Target className="text-teal-400" /> Ideal For
              </h2>
              <div className="space-y-4">
                {service.idealFor.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 font-medium hover:border-teal-400/30 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.8)]" /> {item}
                  </div>
                ))}
              </div>
           </div>

           <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-8 tracking-tighter">Business Leverage</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                 {service.benefits.map((benefit, i) => (
                   <div key={i} className="p-8 rounded-3xl bg-teal-500/5 border border-teal-500/10 hover:border-teal-500/30 transition-all backdrop-blur-sm group">
                      <CheckCircle2 className="text-teal-400 mb-4 w-8 h-8 group-hover:scale-110 transition-transform" />
                      <h4 className="text-xl font-bold mb-2">{benefit.title}</h4>
                      <p className="text-neutral-400 text-sm leading-relaxed">{benefit.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* ================= SYSTEM ARCHITECTURE ================= */}
        <div className="mb-40 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight italic text-teal-400">System Logic</h2>
          <p className="text-neutral-500 mb-16 max-w-2xl mx-auto">Visualizing the high-performance pipeline we build for your {service.title}.</p>
          <div className="bg-white/5 rounded-[3rem] p-8 md:p-20 border border-white/5 backdrop-blur-md">
            <ArchitectureDiagram type={getArchitectureType()} />
          </div>
        </div>

        {/* ================= TECH STACK GRID ================= */}
        <div className="text-center py-20 border-t border-white/5">
          <h2 className="text-neutral-600 uppercase tracking-[0.4em] font-bold text-[10px] mb-16">Advanced Technology Stack</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {service.techStack.map((tech, i) => (
              <span key={i} className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-neutral-400 font-bold tracking-tight hover:text-teal-400 hover:border-teal-500/30 transition-all cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}