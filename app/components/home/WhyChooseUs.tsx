"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe, Users, Clock, Award } from "lucide-react";

const reasons = [
  {
    title: "Military-Grade Security",
    desc: "Aapka data aur architecture hamesha encrypted aur secure rehta hai.",
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-500/5"
  },
  {
    title: "Ultra-Fast Delivery",
    desc: "Hum agile methodology use karte hain taaki aapka product record time mein launch ho.",
    icon: Zap,
    color: "text-yellow-400",
    bg: "bg-yellow-500/5"
  },
  {
    title: "Global Scalability",
    desc: "Aisi systems jo 100 se lekar 1 million users tak bina ruke handle kar sakein.",
    icon: Globe,
    color: "text-blue-400",
    bg: "bg-blue-500/5"
  },
  {
    title: "Expert AI Integration",
    desc: "Sirf code nahi, hum aapke workflow mein intelligence (AI) infuse karte hain.",
    icon: Award,
    color: "text-purple-400",
    bg: "bg-purple-500/5"
  },
  {
    title: "24/7 Dedicated Support",
    desc: "Launch ke baad bhi hum hamesha aapke sath hain, har scale par.",
    icon: Clock,
    color: "text-pink-400",
    bg: "bg-pink-500/5"
  },
  {
    title: "Client-Centric Approach",
    desc: "Hum sirf vendor nahi, aapke growth partner bankar kaam karte hain.",
    icon: Users,
    color: "text-teal-400",
    bg: "bg-teal-500/5"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-32 px-6 bg-[#0B0F0E] relative overflow-hidden">
      {/* Background Glows for Depth */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Why Partner with <span className="text-teal-400 italic">Globalcore</span>?
          </motion.h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            We combine technical excellence with business strategy to deliver results that matter.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-3xl border border-white/5 bg-white/2 hover:bg-white/4 transition-all duration-500 overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-transparent via-transparent to-white/5`} />

                <div className={`w-14 h-14 rounded-2xl ${reason.bg} border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon size={28} className={`${reason.color} group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]`} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{reason.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed group-hover:text-neutral-400 transition-colors">
                  {reason.desc}
                </p>

                {/* Decorative Line on Hover */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 bg-teal-400 w-0 group-hover:w-full transition-all duration-500"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}