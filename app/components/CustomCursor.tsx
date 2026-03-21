"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", mouseMove);

    // Saare buttons aur links par hover effect lagane ke liye
    const interactiveElements = document.querySelectorAll("button, a, input, textarea");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, []);

  // Cursor movement ko smooth banane ke liye Spring physics
  const cursorX = useSpring(mousePosition.x, { damping: 20, stiffness: 250 });
  const cursorY = useSpring(mousePosition.y, { damping: 20, stiffness: 250 });

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-teal-400 rounded-full pointer-events-none z-9999 mix-blend-difference hidden md:block"
      style={{
        translateX: cursorX,
        translateY: cursorY,
        x: "-50%",
        y: "-50%",
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
        opacity: 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  );
}