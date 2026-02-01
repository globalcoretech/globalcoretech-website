"use client";

import { motion } from "framer-motion";

export type Service = {
  title: string;
  desc: string;
  points: string[];
  illustration?: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ServiceDetailClient({
  service,
}: {
  service: Service;
}) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-16 items-center">
      {/* TEXT */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-semibold">
          {service.title}
        </h1>

        <p className="mt-6 text-gray-600 max-w-xl">
          {service.desc}
        </p>

        <ul className="mt-8 space-y-3 text-gray-700">
          {service.points.map((point, i) => (
            <li key={i}>• {point}</li>
          ))}
        </ul>
      </motion.div>

      {/* ILLUSTRATION */}
      {service.illustration && (
        <motion.img
          src={service.illustration}
          alt={service.title}
          className="w-full max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </section>
  );
}
