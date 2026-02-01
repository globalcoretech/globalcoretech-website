"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const cards = [
  {
    title: "Understand Your Business",
    desc:
      "We start by deeply understanding your goals, challenges, users, and existing workflows before writing a single line of code.",
  },
  {
    title: "Design the Right Solution",
    desc:
      "We design clean, scalable systems and user experiences focused on long-term growth — not short-term hacks.",
  },
  {
    title: "Build with Quality",
    desc:
      "Using modern stacks and clean architecture, we build reliable software that performs and scales with confidence.",
  },
  {
    title: "Grow & Optimize",
    desc:
      "We continuously improve, automate, and optimize systems as your business evolves and scales.",
  },
];

export default function HowWeHelp() {
  return (
    <section className="w-full py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* EYEBROW */}
        <p className="text-sm uppercase tracking-widest text-teal-500 font-medium">
          How We Help
        </p>

        {/* TITLE */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="
            mt-4
            text-[44px] leading-[1.15]
            md:text-[56px]
            lg:text-[64px]
            font-semibold
            max-w-5xl
          "
        >
          Turning ideas into{" "}
          <span className="text-teal-500">scalable</span>, real-world solutions
        </motion.h2>

        {/* DESCRIPTION */}
        <p className="mt-6 text-base md:text-lg text-gray-600 max-w-3xl">
          We don’t just build software. We help businesses solve real problems
          using the right mix of technology, strategy, and execution.
        </p>

        {/* CARDS GRID */}
        <div className="mt-20 grid md:grid-cols-2 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="
                glass-card
                rounded-3xl
                p-8
                transition
              "
            >
              <h3 className="text-xl font-semibold">
                {card.title}
              </h3>
              <p className="mt-3 text-gray-600">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
