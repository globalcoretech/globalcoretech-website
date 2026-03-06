"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

export default function MagneticButton({
  href,
  children,
  className = "",
}: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    x.set(offsetX * 0.25);
    y.set(offsetY * 0.25);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div style={{ x: springX, y: springY }} className="relative">
      {/* GLOW RING */}
      <div className="pointer-events-none absolute -inset-1 rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 bg-teal-400/30" />

      <Link
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group relative z-10 ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
