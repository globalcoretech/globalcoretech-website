"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Search, PenTool, Code2, Rocket, ArrowRight } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    title: "Discovery & Audit",
    desc: "We dissect your current ecosystem to find bottlenecks and hidden opportunities for 10x growth.",
    icon: Search,
    color: "from-blue-500/20 to-cyan-500/20",
    border: "group-hover:border-blue-500/50"
  },
  {
    title: "Strategic Blueprint",
    desc: "Not just wireframes—we build a technical architecture designed for extreme scalability and speed.",
    icon: PenTool,
    color: "from-purple-500/20 to-pink-500/20",
    border: "group-hover:border-purple-500/50"
  },
  {
    title: "Precision Engineering",
    desc: "Our engineers build with a 'Zero-Debt' philosophy, ensuring clean, performant, and secure code.",
    icon: Code2,
    color: "from-teal-500/20 to-emerald-500/20",
    border: "group-hover:border-teal-500/50"
  },
  {
    title: "Global Deployment",
    desc: "Seamless rollout with high-availability infrastructure and 24/7 performance monitoring.",
    icon: Rocket,
    color: "from-orange-500/20 to-red-500/20",
    border: "group-hover:border-orange-500/50"
  },
];

export default function ExecutionPipeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="py-32 relative bg-[#0B0F0E] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
              How we <span className="italic text-neutral-500 font-light text-4xl md:text-6xl">execute.</span>
            </h2>
          </div>
          <p className="text-neutral-500 max-w-xs md:text-right text-lg">
            A battle-tested process designed to take your idea from concept to market leader.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative p-8 rounded-[2.5rem] border border-white/5 bg-white/2 backdrop-blur-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${step.border}`}
            >
              <div className={`absolute inset-0 bg-linear-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="text-6xl font-black text-white/3 absolute -top-4 -right-2 italic">0{i+1}</div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                  <step.icon size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{step.title}</h3>
                <p className="text-neutral-500 group-hover:text-neutral-300 transition-colors leading-relaxed mb-6">
                  {step.desc}
                </p>
                <div className="w-8 h-0.5 bg-white/20 group-hover:w-full group-hover:bg-teal-500/50 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}