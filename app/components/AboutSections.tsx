"use client";


import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Layers,
  User,
  Eye,
  Target,
  Code,
  Smartphone,
  Cpu,
  Briefcase,
  GitBranch,
  CheckCircle,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

/* ---------------- BASIC FADE (HERO ONLY) ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

/* ---------------- ICON FLOAT (VERY SLOW) ---------------- */
const floatSlow = {
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};



/* ---------------- SAFE SCROLL REVEAL (CARDS ONLY) ---------------- */
function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0.9 1", "0.35 1"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const blur = useTransform(scrollYProgress, [0, 1], ["4px", "0px"]);
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        filter: blur,
        y,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ================= MAIN ================= */
export default function AboutSections() {
  return (
    <section className="w-full">
      {/* ================= HERO ================= */}
      <div className="max-w-6xl mx-auto px-6">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-semibold"
        >
          About <span className="text-teal-500">GlobalcoreTech</span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-3xl text-gray-600"
        >
          We are a technology-driven company focused on building scalable digital
          solutions that help businesses grow efficiently. Our expertise spans
          SaaS platforms, custom software, mobile applications, and AI-powered
          automation.
        </motion.p>
      </div>

      {/* ================= FOUNDER MESSAGE ================= */}
      <div className="mt-24 bg-gradient-to-br from-teal-50 via-white to-teal-100 py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-semibold">Founder’s Message</h2>
            <p className="mt-4 text-gray-600">
              Founded by <strong>Umesh Yadav</strong>, the company is built on the
              belief that technology should solve real business problems and
              create measurable impact.
            </p>
            <p className="mt-4 text-gray-600">
              The focus has always been on practical, scalable solutions aligned
              with long-term business goals.
            </p>
          </div>

          <ScrollReveal>
            <div className="glass-card p-12 flex justify-center">
              <motion.div variants={floatSlow} animate="animate">
                <User className="w-28 h-28 text-teal-500" strokeWidth={1.2} />
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ================= VISION / MISSION ================= */}
      <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10">
        <ScrollReveal>
          <div className="glass-card p-8">
            <Eye className="w-10 h-10 text-teal-500 mb-4" />
            <h3 className="text-xl font-semibold">Our Vision</h3>
            <p className="mt-2 text-gray-600">
              To become a globally trusted technology partner by delivering
              innovative, reliable, and scalable digital solutions.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="glass-card p-8">
            <Target className="w-10 h-10 text-teal-500 mb-4" />
            <h3 className="text-xl font-semibold">Our Mission</h3>
            <p className="mt-2 text-gray-600">
              To help startups and enterprises leverage technology effectively
              through customized, future-ready solutions.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* ================= WHAT WE DO ================= */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-16">
            What We Do
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Layers />, title: "SaaS Product Development" },
              { icon: <Code />, title: "Custom Software Solutions" },
              { icon: <Smartphone />, title: "Website & Mobile App Development" },
              { icon: <Cpu />, title: "AI Automation & Workflow Optimization" },
              { icon: <Briefcase />, title: "IT Consultancy & Support" },
            ].map((item, i) => (
              <ScrollReveal key={i}>
                <div className="glass-card p-8">
                  <motion.div
                    variants={floatSlow}
                    animate="animate"
                    className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mb-4"
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* ================= OUR APPROACH ================= */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-semibold text-center mb-16">
          Our Approach
        </h2>

        <div className="grid md:grid-cols-5 gap-6">
          {[
            "Understand the Business",
            "Design the Solution",
            "Build with Quality",
            "Deliver on Time",
            "Support Long-Term Growth",
          ].map((step, i) => (
            <ScrollReveal key={i}>
              <div className="glass-card p-6 text-center">
                <GitBranch className="w-8 h-8 text-teal-500 mx-auto mb-3" />
                <p className="font-medium text-gray-700">{step}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ================= WHY CLIENTS TRUST US ================= */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-16">
            Why Clients Trust Us
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <User />, text: "Founder-led involvement" },
              { icon: <CheckCircle />, text: "Clear communication" },
              { icon: <ShieldCheck />, text: "Scalable solutions" },
              { icon: <HeartHandshake />, text: "Long-term partnership" },
            ].map((item, i) => (
              <ScrollReveal key={i}>
                <div className="glass-card p-8 text-center">
                  <motion.div
                    variants={floatSlow}
                    animate="animate"
                    className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mx-auto mb-4"
                  >
                    {item.icon}
                  </motion.div>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* ================= FINAL NOTE ================= */}
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <ScrollReveal>
          <p className="text-xl text-gray-700">
            Driven by purpose, execution excellence, and a strong commitment to
            helping businesses succeed through smart use of technology.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
