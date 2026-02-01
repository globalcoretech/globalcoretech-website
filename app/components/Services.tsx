"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const services = [
  {
    title: "Website Development",
    slug: "website-development",
    desc:
      "Modern, responsive, and high-performing websites that represent your brand and convert visitors into customers.",
    illustration: "/illustrations/website.svg",
  },
  {
    title: "Custom Software Development",
    slug: "custom-software",
    desc:
      "Tailor-made software solutions designed around your business workflows to automate operations and improve efficiency.",
    illustration: "/illustrations/saas.svg",
  },
  {
    title: "Mobile App Development",
    slug: "mobile-app-development",
    desc:
      "High-performance mobile applications with intuitive UI/UX that engage users and support business goals.",
    illustration: "/illustrations/mobile.svg",
  },
  {
    title: "AI & Business Automation Solutions",
    slug: "ai-business-automation",
    desc:
      "AI-powered automation systems that streamline workflows, reduce manual effort, and improve operational efficiency.",
    illustration: "/illustrations/ai.svg",
  },
  {
    title: "Support & Maintenance",
    slug: "support-maintenance",
    desc:
      "Ongoing support and maintenance to keep your digital systems secure, optimized, and running smoothly.",
    illustration: "/illustrations/support.svg",
  },
];

export default function Services() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-32">
      {/* ================= HEADER ================= */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <h1 className="text-4xl md:text-5xl font-semibold">
          Our <span className="text-teal-500">Services</span>
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          We provide end-to-end software development and AI-powered solutions
          designed to solve real business problems, improve efficiency, and
          support long-term growth.
        </p>
      </motion.div>

      {/* ================= SERVICES LIST ================= */}
      <div className="mt-24 space-y-28">
        {services.map((service) => (
          <motion.div
            key={service.slug}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            {/* TEXT CARD */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="glass-card p-10 rounded-3xl"
            >
              <h2 className="text-2xl font-semibold">
                {service.title}
              </h2>

              <p className="mt-4 text-gray-600 max-w-lg">
                {service.desc}
              </p>

              <Link
                href={`/services/${service.slug}`}
                className="
                  inline-flex items-center gap-2
                  mt-6 px-6 py-3 rounded-full
                  bg-black text-white text-sm
                  hover:bg-teal-500 hover:text-black
                  transition-all
                "
              >
                View Details →
              </Link>
            </motion.div>

            {/* ILLUSTRATION */}
            <motion.img
              src={service.illustration}
              alt={service.title}
              className="w-full max-w-md mx-auto"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* ================= BRIDGE / TRANSITION ================= */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        className="mt-32 max-w-3xl"
      >
        <p className="text-xl font-medium">
          Services are just tools.
        </p>

        <p className="mt-3 text-gray-600 text-lg">
          What truly matters is how these solutions are applied to your
          business challenges. That’s where our approach makes the
          difference.
        </p>
      </motion.div>
    </section>
  );
}
