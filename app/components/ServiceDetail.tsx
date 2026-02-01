"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const services: Record<string, any> = {
  "website-development": {
    title: "Website Development",
    desc:
      "We build modern, high-performing websites that reflect your brand and convert visitors into customers.",
    illustration: "/illustrations/website.svg",
    features: [
      "Custom UI/UX design",
      "Responsive & mobile-first layouts",
      "SEO-friendly structure",
      "Fast performance & security",
      "Scalable architecture",
    ],
    process: [
      "Requirement analysis",
      "UI/UX design",
      "Development",
      "Testing & optimization",
      "Launch & support",
    ],
  },

  "custom-software": {
    title: "Custom Software Development",
    desc:
      "Tailor-made software solutions designed around your exact business workflows.",
    illustration: "/illustrations/saas-dashboard.svg",
    features: [
      "Business process automation",
      "CRM / ERP systems",
      "Admin dashboards",
      "API & third-party integrations",
    ],
    process: [
      "Business analysis",
      "System architecture",
      "Development",
      "QA & deployment",
    ],
  },

  "mobile-app-development": {
    title: "Mobile App Development",
    desc:
      "High-performance mobile applications that deliver seamless user experiences.",
    illustration: "/illustrations/mobile-apps.svg",
    features: [
      "Android & iOS apps",
      "Cross-platform solutions",
      "UI/UX focused design",
      "Secure backend integration",
    ],
    process: [
      "App planning",
      "Design",
      "Development",
      "Store deployment",
    ],
  },

  "ai-business-automation": {
    title: "AI & Business Automation Solutions",
    desc:
      "We help businesses automate repetitive tasks, streamline workflows, and improve decision-making using AI-powered automation systems.",
    illustration: "/illustrations/ai-automation.svg",

    features: [
      "Manual workflows & processes automation",
      "Customer support (AI chatbots)",
      "Data processing & reporting",
      "CRM & internal tools automation",
      "Repetitive operational tasks",
    ],

    process: [
      "Process analysis",
      "Automation strategy",
      "AI model & system design",
      "Integration & deployment",
      "Monitoring & optimization",
    ],

    solutions: [
      "AI chatbots & assistants",
      "Workflow automation systems",
      "AI integrations with existing software",
      "Custom AI tools for operations",
    ],

    bestFor: [
      "Growing businesses",
      "Operations-heavy teams",
      "Companies scaling fast",
    ],
  },

  "support-maintenance": {
    title: "Support & Maintenance",
    desc:
      "Reliable ongoing support to keep your systems secure and optimized.",
    illustration: "/illustrations/globe.svg",
    features: [
      "Bug fixing",
      "Performance optimization",
      "Security updates",
      "Regular backups",
    ],
    process: [
      "Monitoring",
      "Issue resolution",
      "Continuous improvements",
    ],
  },
};

export default function ServiceDetail({ slug }: { slug: string }) {
  const service = services[slug];

  if (!service) {
    return (
      <div className="text-center py-40">
        <h1 className="text-3xl font-semibold">Service not found</h1>
        <Link href="/services" className="text-teal-500 mt-4 block">
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6">
      {/* HERO */}
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-semibold">
            {service.title}
          </h1>
          <p className="mt-4 text-gray-600 max-w-xl">
            {service.desc}
          </p>
        </motion.div>

        <motion.img
          src={service.illustration}
          alt={service.title}
          className="w-full max-w-md mx-auto"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* WHAT YOU GET */}
      <div className="mt-28 glass-card p-12">
        <h2 className="text-2xl font-semibold">What We Automate</h2>
        <ul className="mt-6 grid md:grid-cols-2 gap-4 text-gray-700">
          {service.features.map((f: string, i: number) => (
            <li key={i}>• {f}</li>
          ))}
        </ul>
      </div>

      {service.solutions && (
        <div className="mt-24 glass-card p-12">
          <h2 className="text-2xl font-semibold">AI Solutions We Build</h2>
          <ul className="mt-6 grid md:grid-cols-2 gap-4 text-gray-700">
            {service.solutions.map((s: string, i: number) => (
              <li key={i}>• {s}</li>
            ))}
          </ul>
        </div>
      )}

      {service.bestFor && (
        <div className="mt-24">
          <h2 className="text-2xl font-semibold text-center">
            Best For
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {service.bestFor.map((b: string, i: number) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-sm"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-32 bg-black rounded-3xl p-16 text-center text-white">
        <h2 className="text-3xl font-semibold">
          Ready to automate your business?
        </h2>
        <p className="mt-4 text-white/80">
          Let’s discuss how AI can transform your operations.
        </p>

        <Link
          href="/contact"
          className="inline-block mt-8 px-8 py-4 rounded-full bg-teal-500 text-black font-medium hover:bg-teal-400 transition"
        >
          Talk to Us
        </Link>
      </div>
    </section>
  );
}
