"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code2, TrendingUp } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Understand the Business",
    desc:
      "We deeply understand your goals, users, challenges, and workflows before proposing any technical solution.",
    icon: Search,
  },
  {
    step: "02",
    title: "Design the Right Solution",
    desc:
      "We design clean, scalable systems and user experiences aligned with long-term business growth.",
    icon: PenTool,
  },
  {
    step: "03",
    title: "Build with Quality",
    desc:
      "Using modern stacks and clean architecture, we build reliable software that performs at scale.",
    icon: Code2,
  },
  {
    step: "04",
    title: "Optimize & Grow",
    desc:
      "We continuously optimize, automate, and improve systems as your business evolves.",
    icon: TrendingUp,
  },
];

export default function HowWeHelpTimeline() {
  return (
    <section className="w-full py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <p className="text-sm uppercase tracking-widest text-teal-500 font-medium">
          How We Help
        </p>

        <h2 className="
          mt-4
          text-[40px] leading-[1.15]
          md:text-[56px]
          lg:text-[64px]
          font-semibold
          max-w-5xl
        ">
          Turning ideas into{" "}
          <span className="text-teal-500">scalable</span>, real-world solutions
        </h2>

        <p className="mt-6 text-base md:text-lg text-gray-600 max-w-3xl">
          We don’t just build software. We help businesses solve real problems
          using the right mix of technology, strategy, and execution.
        </p>

        {/* TIMELINE WRAPPER */}
        <div className="relative mt-20">

          {/* DESKTOP VERTICAL LINE */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200" />

          <div className="space-y-16">
            {steps.map((item, i) => {
              const Icon = item.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`
                    relative
                    flex
                    flex-col
                    md:flex-row
                    md:items-start
                    ${isLeft ? "md:justify-start" : "md:justify-end"}
                  `}
                >
                  {/* ICON NODE */}
                  <div className="
                    hidden md:flex
                    absolute left-1/2 -translate-x-1/2
                    w-12 h-12
                    rounded-full
                    bg-white
                    border
                    shadow-sm
                    items-center justify-center
                    z-10
                  ">
                    <Icon className="w-5 h-5 text-teal-500" />
                  </div>

                  {/* MOBILE STEPPER */}
                  <div className="flex md:hidden items-start gap-4">
                    <div className="
                      w-10 h-10
                      rounded-full
                      bg-teal-50
                      flex items-center justify-center
                      flex-shrink-0
                    ">
                      <Icon className="w-5 h-5 text-teal-500" />
                    </div>

                    <div className="glass-card rounded-2xl p-6">
                      <span className="text-xs text-teal-500 font-medium">
                        STEP {item.step}
                      </span>

                      <h3 className="mt-1 text-lg font-semibold">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-gray-600 text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* DESKTOP CARD */}
                  <div
                    className={`
                      hidden md:block
                      w-[45%]
                      glass-card
                      rounded-3xl
                      p-8
                      ${isLeft ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"}
                    `}
                  >
                    <span className="text-sm text-teal-500 font-medium">
                      {item.step}
                    </span>

                    <h3 className="mt-2 text-xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-gray-600">
                      {item.desc}
                    </p>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
