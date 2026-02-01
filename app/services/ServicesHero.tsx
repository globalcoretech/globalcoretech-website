"use client";

import { motion } from "framer-motion";

export default function ServicesHero() {
  return (
    <section className="w-full py-32 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Eyebrow */}
          <p className="text-sm uppercase tracking-widest text-teal-500 font-medium">
            Our Services
          </p>

          {/* Title */}
          <h1 className="mt-4 text-[44px] leading-[1.15] md:text-[56px] lg:text-[64px] font-semibold max-w-xl">
            Solutions designed to{" "}
            <span className="text-teal-500">scale</span>{" "}
            your business
          </h1>

          {/* Description */}
          <p className="mt-6 text-base md:text-lg text-gray-600 max-w-xl">
            We help startups and growing companies build reliable software,
            automate operations, and launch scalable digital products with
            confidence.
          </p>

          {/* CTA */}
          <div className="mt-10 flex gap-4">
            <a
              href="#services"
              className="px-7 py-3 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition"
            >
              Explore Services
            </a>

            <a
              href="/contact"
              className="px-7 py-3 rounded-full border border-gray-300 text-sm hover:border-black transition"
            >
              Talk to an Expert
            </a>
          </div>
        </motion.div>

        {/* RIGHT ILLUSTRATION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Soft Glow */}
          <div className="absolute -inset-10 bg-teal-200/20 blur-3xl rounded-full" />

          {/* Illustration */}
          <motion.img
            src="/illustrations/services-hero.svg"
            alt="Our Services Illustration"
            className="relative w-full max-w-md mx-auto"
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

      </div>
    </section>
  );
}
