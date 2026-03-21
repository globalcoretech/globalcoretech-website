"use client";
import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const updateMouse = (e: MouseEvent) => {
      // Direct DOM manipulation hydration safe hota hai useEffect ke andar
      glow.style.opacity = "1";
      glow.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
    };

    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  return (
    <div
      ref={glowRef}
      id="global-mouse-glow"
      className="fixed top-0 left-0 w-150 h-150 bg-teal-500/[0.07] rounded-full blur-[120px] pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500"
    />
  );
}