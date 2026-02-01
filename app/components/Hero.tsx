"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* soft background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-200px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-teal-400/20 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1 text-sm text-gray-600 mb-6">
            🚀 Trusted by startups & growing teams
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            Building Scalable Software <br />
            <span className="text-teal-500">& AI Solutions</span> for <br />
            Modern Businesses
          </h1>

          <p className="mt-6 max-w-xl text-gray-600 text-lg">
            We help startups, founders, and enterprises design, build,
            and scale high-performance digital products powered by modern
            technology and AI.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-full bg-black px-6 py-3 text-white text-sm font-medium hover:bg-gray-800 transition">
              Explore Our Services
            </button>
            <button className="rounded-full border px-6 py-3 text-sm font-medium hover:bg-gray-50 transition">
              Contact Us
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <span className="rounded-full border px-4 py-2 text-sm text-gray-600">
              5+ Years Experience
            </span>
            <span className="rounded-full border px-4 py-2 text-sm text-gray-600">
              20+ Projects Delivered
            </span>
            <span className="rounded-full border px-4 py-2 text-sm text-gray-600">
              Startups & Enterprises
            </span>
          </div>
        </motion.div>

        {/* RIGHT PREVIEW CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="rounded-2xl border bg-white shadow-lg">
            <div className="flex items-center justify-between px-4 py-2 border-b text-sm text-gray-600">
              <span>AI-Powered Business Dashboard</span>
              <span className="rounded-full border px-3 py-1 text-xs">
                Live Preview
              </span>
            </div>
            <div className="h-64 rounded-b-2xl bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
