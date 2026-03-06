"use client";

import { motion } from "framer-motion";
import Reveal from "../components/animations/Reveal";
import { XCircle, CheckCircle } from "lucide-react";

const problems = [
  "Poor user experience",
  "Low performance & scalability issues",
  "Manual processes & inefficiencies",
  "Systems that don't integrate well",
];

const solutions = [
  "User-centric experience design",
  "Performance-optimized architecture",
  "Smart automation & integrations",
  "Scalable, future-ready systems",
];

export default function ProblemsSolutions() {
  return (
    <section className="relative py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 tracking-tight">
            Why most digital products{" "}
            <span className="text-teal-400">struggle</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Problems */}
          <div className="space-y-4">
            <Reveal>
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <h3 className="text-xl font-semibold text-white">Common problems</h3>
              </div>
            </Reveal>

            {problems.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-red-500/2 hover:border-red-500/30 transition-all duration-300">
                  <XCircle className="text-red-400/70 group-hover:text-red-400 transition-colors" size={24} />
                  <span className="text-neutral-300 text-lg group-hover:text-white transition-colors">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <Reveal>
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                <div className="w-2 h-2 rounded-full bg-teal-400" />
                <h3 className="text-xl font-semibold text-white">How we fix it</h3>
              </div>
            </Reveal>

            {solutions.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-teal-500/2 hover:border-teal-400/30 transition-all duration-300">
                  <CheckCircle className="text-teal-400/70 group-hover:text-teal-400 transition-colors" size={24} />
                  <span className="text-neutral-300 text-lg group-hover:text-white transition-colors">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}