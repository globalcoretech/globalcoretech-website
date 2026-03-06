"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { BrainCircuit, Layout, Smartphone, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";
import { MouseEvent } from "react";

const services = [
  {
    title: "AI Automation",
    desc: "Custom LLMs and workflow automation to scale your operations effortlessly.",
    icon: BrainCircuit,
    href: "/services/ai-automation", // Slug: ai-automation
    size: "md:col-span-2",
    color: "rgba(45, 212, 191, 0.15)" 
  },
  {
    title: "Web Apps",
    desc: "High-performance, SEO-ready Next.js web applications.",
    icon: Layout,
    href: "/services/web-development", // Slug: web-development
    size: "md:col-span-1",
    color: "rgba(59, 130, 246, 0.15)"
  },
  {
    title: "Mobile Apps",
    desc: "Cross-platform iOS & Android solutions with React Native.",
    icon: Smartphone,
    href: "/services/mobile-development", // Slug: mobile-development
    size: "md:col-span-1",
    color: "rgba(168, 85, 247, 0.15)"
  },
  {
    title: "SaaS Ecosystems",
    desc: "Scalable multi-tenant platforms with full Stripe & Auth integration.",
    icon: BarChart3,
    href: "/services/saas-development", // Slug: saas-development
    size: "md:col-span-2",
    color: "rgba(16, 185, 129, 0.15)"
  }
];

function ServiceCard({ service, index }: { service: any; index: number }) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <Link href={service.href} className={`${service.size} block group`}>
      <motion.div
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="relative h-full p-8 rounded-[2.5rem] border border-white/10 bg-[#0D1312] overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:border-white/20"
      >
        {/* SPOTLIGHT EFFECT */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-300"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                ${service.color},
                transparent 80%
              )
            `,
          }}
        />

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-teal-500/50 transition-all duration-500">
              <service.icon size={30} className="text-neutral-400 group-hover:text-teal-400 transition-colors" />
            </div>

            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
              {service.title}
            </h3>
            <p className="text-neutral-500 group-hover:text-neutral-300 leading-relaxed mb-10 transition-colors max-w-sm">
              {service.desc}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-sm font-bold text-white tracking-widest uppercase group-hover:text-teal-400 transition-colors">
            Explore <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function ServicesSection() {
  return (
    <section className="py-32 px-6 bg-[#0B0F0E]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span className="text-teal-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
              What we do
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">
              World Class <span className="italic text-neutral-500">Engineering.</span>
            </h2>
          </div>
          <p className="text-neutral-500 text-lg max-w-xs md:text-right">
            We help ambitious companies build digital products that define industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}