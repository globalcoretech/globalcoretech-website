"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-neutral-950"
    >
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/20 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold tracking-tight text-white"
        >
          Ready to build something{" "}
          <span className="text-teal-400">great</span>?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl text-gray-300"
        >
          Let’s discuss your idea and explore how we can help you build scalable
          software and AI-powered solutions that deliver real business impact.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          <a
            href="/contact"
            className="rounded-full bg-teal-500 px-6 py-4 text-sm font-medium text-black hover:bg-teal-400 transition"
          >
            Contact Us
          </a>

          <a
            href="https://wa.me/919589300881"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 px-6 py-4 text-sm font-medium text-white hover:bg-white/10 transition"
          >
            WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
