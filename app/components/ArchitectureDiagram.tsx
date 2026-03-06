"use client";

import { motion } from "framer-motion";
import { Cpu, Database, Zap, Activity, BrainCircuit, Globe, Server, Layout, Shield, CreditCard } from "lucide-react";

const configs = {
  "ai-automation": {
    title: "Neural Architecture",
    nodes: [
      { id: "llm", icon: BrainCircuit, label: "LLM Engine", desc: "GPT-4 / Claude Core", pos: "top-0 left-0" },
      { id: "vector", icon: Database, label: "Vector Memory", desc: "Pinecone / Memory", pos: "top-0 right-0" },
      { id: "api", icon: Zap, label: "AI Triggers", desc: "Automated Workflows", pos: "bottom-0 left-0" },
      { id: "logic", icon: Activity, label: "Logic Layer", desc: "Reasoning Engine", pos: "bottom-0 right-0" },
    ]
  },
  "web-development": {
    title: "Web Architecture",
    nodes: [
      { id: "frontend", icon: Layout, label: "Next.js UI", desc: "React Framework", pos: "top-0 left-0" },
      { id: "backend", icon: Server, label: "Node.js API", desc: "Serverless Edge", pos: "top-0 right-0" },
      { id: "db", icon: Database, label: "PostgreSQL", desc: "Relational Data", pos: "bottom-0 left-0" },
      { id: "cdn", icon: Globe, label: "Global CDN", desc: "Vercel / AWS", pos: "bottom-0 right-0" },
    ]
  },
  "saas-development": {
    title: "SaaS Ecosystem",
    nodes: [
      { id: "auth", icon: Shield, label: "Multi-Tenant", desc: "Clerk / Auth0", pos: "top-0 left-0" },
      { id: "stripe", icon: CreditCard, label: "Payments", desc: "Stripe Billing", pos: "top-0 right-0" },
      { id: "dashboard", icon: Activity, label: "Metrics", desc: "Real-time Analytics", pos: "bottom-0 left-0" },
      { id: "infra", icon: Server, label: "Scalable Infra", desc: "Docker / AWS", pos: "bottom-0 right-0" },
    ]
  }
};

export default function ArchitectureDiagram({ type }: { type: string }) {
  // Agar type match nahi hua toh default Web wala dikhayega
  const config = configs[type as keyof typeof configs] || configs["web-development"];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">
          {config.title.split(' ')[0]} <span className="text-teal-400">{config.title.split(' ')[1]}</span>
        </h2>
        <p className="text-neutral-500">Custom engineered architecture for {config.title.toLowerCase()}.</p>
      </div>

      <div className="relative h-112.5 w-full max-w-175 mx-auto">
        {/* Central Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
           <div className="w-32 h-32 rounded-[2.5rem] bg-[#0D1312] border-2 border-teal-500/50 flex items-center justify-center backdrop-blur-2xl shadow-[0_0_60px_rgba(45,212,191,0.3)]">
              <Cpu size={40} className="text-teal-400" />
           </div>
        </div>

        {/* Nodes Mapping */}
        {config.nodes.map((node, i) => {
          const Icon = node.icon;
          return (
            <motion.div 
              key={node.id} 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`absolute ${node.pos} flex flex-col items-center`}
            >
              <div className="w-20 h-20 rounded-3xl bg-white/3 border border-white/10 flex items-center justify-center backdrop-blur-xl hover:border-teal-500/50 transition-all duration-300">
                <Icon size={28} className="text-teal-400" />
              </div>
              <h3 className="text-xs font-bold text-white mt-4">{node.label}</h3>
              <p className="text-[10px] text-neutral-500 mt-1 text-center max-w-25">{node.desc}</p>
            </motion.div>
          );
        })}

        {/* Connecting Lines SVG */}
        <svg className="absolute inset-0 w-full h-full -z-10 opacity-20" viewBox="0 0 600 400">
          <motion.path 
            d="M300,200 L120,80 M300,200 L480,80 M300,200 L120,320 M300,200 L480,320"
            fill="none" stroke="#2DD4BF" strokeWidth="1"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5 }}
          />
        </svg>
      </div>
    </section>
  );
}