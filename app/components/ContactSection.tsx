"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-teal-100 -z-10" />

      <div className="max-w-6xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-20">
        {/* ================= LEFT CONTENT ================= */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-4 px-4 py-1 text-sm rounded-full bg-teal-100 text-teal-700">
            Contact Us
          </span>

          <h1 className="text-4xl md:text-5xl font-semibold">
            Let’s build something
            <br />
            <span className="text-teal-500">great together</span>
          </h1>

          <p className="mt-6 text-gray-600 max-w-lg text-lg">
            Tell us about your idea, project, or challenge.  
            Our team will get back to you with the right solution.
          </p>

          <div className="mt-10 space-y-4 text-gray-700">
            <p><strong>Email:</strong> globalcoretechh@gmail.com</p>
            <p><strong>Phone:</strong> +91 95893 00881</p>
            <p><strong>Location:</strong> India</p>
          </div>
        </motion.div>

        {/* ================= FORM CARD ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="
            rounded-3xl
            bg-white/70
            backdrop-blur-xl
            border border-white/60
            shadow-[0_20px_60px_-20px_rgba(0,0,0,0.2)]
            p-10
          "
        >
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                rows={4}
                required
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Tell us about your project"
              />
            </div>

            <button
              type="submit"
              className="
                w-full rounded-full
                px-8 py-4
                bg-black text-white
                hover:bg-gray-800
                transition
              "
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
