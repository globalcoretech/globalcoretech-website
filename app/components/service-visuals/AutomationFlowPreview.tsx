"use client";

import { motion } from "framer-motion";
import { Database, Cpu, Zap } from "lucide-react";

export default function AutomationFlowPreview() {
  const steps = [
    {
      id: 1,
      title: "Data Input",
      desc: "Raw data integration from APIs, CRMs, or live feeds.",
      icon: Database,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      glow: "shadow-[0_0_30px_rgba(59,130,246,0.2)]"
    },
    {
      id: 2,
      title: "AI Processing",
      desc: "Neural networks analyze, clean, and extract insights.",
      icon: Cpu,
      color: "text-teal-400",
      bg: "bg-teal-500/10",
      border: "border-teal-500/30",
      glow: "shadow-[0_0_30px_rgba(45,212,191,0.3)]"
    },
    {
      id: 3,
      title: "Automated Action",
      desc: "Triggers smart workflows, reports, or alerts instantly.",
      icon: Zap,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      glow: "shadow-[0_0_30px_rgba(16,185,129,0.2)]"
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* HEADING */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            AI Automation <span className="text-teal-400">Live Flow</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-neutral-400 max-w-2xl mx-auto"
          >
            Watch how raw data transforms into actionable results in real-time through our intelligent processing pipeline.
          </motion.p>
        </div>

        {/* ANIMATED PIPELINE */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4 mt-12">
          
          {/* Connecting Line (Background Track) */}
          <div className="absolute top-12 left-[10%] w-[80%] h-1 bg-white/5 hidden md:block rounded-full" />

          {/* Glowing Animated Line (The Data Flowing) */}
          <motion.div
            className="absolute top-12 left-[10%] h-1 bg-linear-to-r from-blue-500 via-teal-400 to-emerald-500 hidden md:block rounded-full z-0"
            initial={{ width: "0%" }}
            whileInView={{ width: "80%" }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
          />

          {/* Steps */}
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.3, duration: 0.6 }}
                className="relative z-10 flex flex-col items-center w-full md:w-1/3"
              >
                {/* Glowing Node */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-24 h-24 rounded-full border ${step.border} ${step.bg} ${step.glow} flex items-center justify-center mb-8 backdrop-blur-md relative group cursor-default transition-all duration-300`}
                >
                  {/* Pulse effect for middle AI node */}
                  {step.id === 2 && (
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-teal-400/20"
                    />
                  )}
                  <Icon size={32} className={`${step.color} relative z-10`} />
                </motion.div>

                {/* Glassmorphic Text Card */}
                <div className="text-center bg-white/3 border border-white/10 p-6 rounded-2xl backdrop-blur-sm w-full relative overflow-hidden group hover:border-teal-500/30 hover:bg-white/5 transition-all duration-300">
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}