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
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm uppercase tracking-widest text-teal-500 font-medium">
            Our Services
          </p>

          <h1 className="mt-4 text-[44px] leading-[1.15] md:text-[56px] lg:text-[64px] font-semibold max-w-xl">
            Solutions designed to{" "}
            <span className="text-teal-500">scale</span> your business
          </h1>

          <p className="mt-6 text-base md:text-lg text-gray-600 max-w-xl">
            We help startups and growing companies build reliable software,
            automate operations, and launch scalable digital products.
          </p>
        </motion.div>

        {/* RIGHT SIDE ILLUSTRATION — THIS WAS MISSING BEFORE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* soft background glow */}
          <div className="absolute -inset-10 bg-teal-200/20 blur-3xl rounded-full" />

          {/* ACTUAL ILLUSTRATION */}
          <motion.img
            src="/illustrations/services-hero.svg"
            alt="Services illustration"
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
