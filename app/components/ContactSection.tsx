"use client";

import { motion, easeOut } from "framer-motion";
import ContactForm from "@/components/ContactForm";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: easeOut,
    },
  }),
};

const floatCard = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: easeOut,
    },
  },
};

export default function ContactSection() {
  return (
    <section className="relative z-20 -mt-40 pb-32">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        
        {/* LEFT COPY */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pt-20"
        >
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl font-semibold text-white"
          >
            Start a conversation
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-4 text-gray-400 max-w-md"
          >
            Tell us what you’re building. We’ll help you shape it into a
            scalable, production-ready product.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-10 space-y-4 text-gray-300"
          >
            <p>📧 contact@globlcoretech.com</p>
            <p>📞 +91 78791 30175</p>
            <p>📍 India</p>
          </motion.div>
        </motion.div>

        {/* FLOATING GLASS FORM */}
        <motion.div
          variants={floatCard}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
