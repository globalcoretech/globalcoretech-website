"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Cpu, BarChart } from "lucide-react";

const advantages = [
  {
    title: "Zero Latency Build",
    desc: "Optimized workflows that deliver high-performance products 2x faster than traditional agencies.",
    icon: Zap,
  },
  {
    title: "Fortress Security",
    desc: "Enterprise-grade security protocols baked into every line of code we ship.",
    icon: Shield,
  },
  {
    title: "Modern Tech Stack",
    desc: "Leveraging Next.js 15, AI-agentic workflows, and Edge computing for future-proof solutions.",
    icon: Cpu,
  },
  {
    title: "Data-Driven ROI",
    desc: "Every feature we build is measured against business growth and user engagement metrics.",
    icon: BarChart,
  },
];

export default function PartnerSection() {
  return (
    <section className="py-32 px-6 border-y border-white/5 bg-[#090D0C]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-none mb-6">
              Why top brands <br />
              <span className="text-teal-400 italic font-light">trust us.</span>
            </h2>
            <p className="text-neutral-500 text-lg mb-8 leading-relaxed">
              We don't just build apps; we architect digital assets that drive revenue and scale effortlessly.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {advantages.map((adv, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-3xl bg-white/3 border border-white/5 hover:border-teal-500/20 transition-all group"
              >
                <div className="flex items-start gap-6">
                  <div className="bg-teal-500/10 p-4 rounded-2xl text-teal-400 group-hover:bg-teal-500 group-hover:text-black transition-all duration-300">
                    <adv.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{adv.title}</h3>
                    <p className="text-neutral-500 group-hover:text-neutral-400 transition-colors">
                      {adv.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}