"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BackgroundElements() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);

  // 1. Hydration mismatch rokne ke liye state
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Jab tak client par mount na ho, kuch render mat karo
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Particles */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute w-1 h-1 bg-teal-500/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Floating Lines */}
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={`line-${i}`}
            className="absolute w-0.5 h-20 bg-linear-to-b from-teal-500/10 to-transparent rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}