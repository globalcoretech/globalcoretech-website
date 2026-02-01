"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Discover",
    desc: "We understand your goals, users, and constraints before writing a single line of code.",
  },
  {
    step: "02",
    title: "Design",
    desc: "Clean UX and scalable system architecture designed for long-term growth.",
  },
  {
    step: "03",
    title: "Build",
    desc: "High-performance development using modern, reliable technologies.",
  },
  {
    step: "04",
    title: "Scale",
    desc: "Optimization, automation, and continuous improvement as your business grows.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6 py-24">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Our <span className="text-teal-500">Process</span>
          </h2>
          <p className="mt-4 text-gray-600">
            A simple, transparent approach designed to deliver consistent business results.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
              className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8
                         hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <span className="text-sm font-medium text-teal-500">
                {item.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
