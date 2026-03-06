"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const PARTICLES = [
  { x: 320,  y: -180 },
  { x: -240, y: 150  },
  { x: 480,  y: 220  },
  { x: -420, y: -90  },
  { x: 150,  y: -320 },
  { x: -80,  y: 280  },
  { x: 560,  y: -260 },
  { x: -350, y: -200 },
  { x: 200,  y: 340  },
  { x: -500, y: 120  },
  { x: 380,  y: -80  },
  { x: -160, y: -350 },
];

export default function ServicesHero() {
  return (
    <section className="relative flex min-h-[95vh] items-center justify-center overflow-hidden">
      {/* GRID */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-screen"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* RADIAL GLOW */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-150 w-150 rounded-full bg-teal-500/10 blur-[180px]" />
      </div>

      {/* FLOATING PARTICLES */}
      {PARTICLES.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-teal-400/40 shadow-[0_0_10px_rgba(45,212,191,0.5)]"
          initial={{ x: pos.x, y: pos.y, opacity: 0 }}
          animate={{
            y: [pos.y, pos.y - 20, pos.y],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{ duration: 4 + i, repeat: Infinity }}
        />
      ))}

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-4xl px-6 text-center flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <p className="text-teal-400 text-xs font-semibold tracking-widest uppercase">
            Engineering Excellence
          </p>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
          Our{" "}
          <span className="text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]">
            Services
          </span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          We design, build, and scale digital products that solve real business problems with scalable architectures.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-teal-400 px-8 py-3.5 text-black font-semibold shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(45,212,191,0.6)]"
          >
            Start a Project
          </Link>

          <Link
            href="/about"
            className="rounded-full border border-white/10 bg-white/5 px-8 py-3.5 font-medium transition-all hover:bg-white/10 hover:border-white/20"
          >
            Learn more
          </Link>
        </div>
      </motion.div>
    </section>
  );
}