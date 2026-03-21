"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.from(ref.current, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%", // Jab element 85% screen par aaye
        toggleActions: "play none none reverse"
      }
    });
  }, { scope: ref });

  return <div ref={ref}>{children}</div>;
}