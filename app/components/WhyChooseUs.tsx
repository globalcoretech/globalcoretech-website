"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    title: "Business-First Thinking",
    desc: "We focus on your business goals first, then design technology that drives real growth and outcomes.",
  },
  {
    title: "Clean & Scalable Architecture",
    desc: "Our systems are built with modern stacks, clean code, and scalability in mind from day one.",
  },
  {
    title: "Practical AI & Automation",
    desc: "No buzzwords. We implement AI and automation where it actually saves time, cost, and effort.",
  },
  {
    title: "Long-Term Partnership",
    desc: "We work as an extended team with transparency, ownership, and long-term commitment.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Why Choose <span className="text-teal-500">GlobalcoreTech</span>
          </h2>
          <p className="mt-4 text-gray-600">
            We don’t just build software — we help you solve real problems with the right technology.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
              className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8
                         hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
