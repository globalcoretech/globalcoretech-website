"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);
  const buttonRef    = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  useGSAP(() => {
    if (!isMounted) return;

    // Card entrance
    gsap.fromTo(cardRef.current,
      { scale: 0.85, opacity: 0, y: 80 },
      { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: "expo.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%", once: true } }
    );

    // Text reveal
    gsap.from(".cta-text", {
      opacity: 0, y: 30, filter: "blur(8px)", stagger: 0.15, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: cardRef.current, start: "top 72%", once: true }
    });

    // Magnetic button
    const btn = buttonRef.current;
    if (btn) {
      const onMove = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4, ease: "power2.out" });
      };
      const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.3)" });
      btn.addEventListener("mousemove", onMove as any);
      btn.addEventListener("mouseleave", onLeave as any);
    }

    // Mouse glow follow
    const card = cardRef.current;
    if (card) {
      const glow = card.querySelector(".cta-glow") as HTMLElement;
      card.addEventListener("mousemove", (e: any) => {
        const r = card.getBoundingClientRect();
        gsap.to(glow, { x: e.clientX - r.left - 160, y: e.clientY - r.top - 160, duration: 0.8, ease: "power3.out" });
      });
    }
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <section ref={containerRef} className="relative py-32 px-6 bg-[#050505] overflow-hidden border-t border-white/5">

      {/* Dot BG */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle, #2dd4bf 1px, transparent 1px)`, backgroundSize: "36px 36px" }} />

      {/* Ambient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vh] rounded-full bg-teal-500/4 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div ref={cardRef}
          className="relative rounded-[3.5rem] border border-white/8 bg-[#0b0b0b] px-8 py-24 md:py-28 text-center overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">

          {/* Mouse glow aura */}
          <div className="cta-glow absolute top-0 left-0 w-80 h-80 bg-teal-500/[0.07] blur-[100px] rounded-full pointer-events-none" />

          {/* Top border glint */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-teal-400/40 to-transparent" />
          {/* Bottom border glint */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative z-10 flex flex-col items-center">

            {/* Badge */}
            <div className="cta-text inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-500/[0.07] border border-teal-500/20 mb-10 backdrop-blur-xl">
              <Sparkles size={12} className="text-teal-400" />
              <span className="text-teal-400 text-[9px] font-black tracking-[0.5em] uppercase">Currently Accepting Projects</span>
            </div>

            {/* Heading */}
            <h2 className="cta-text text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.82] uppercase mb-8">
              Transform your <br className="hidden md:block" />
              <span className="text-teal-400 italic" style={{ fontFamily: "Georgia, serif" }}>digital</span> legacy.
            </h2>

            {/* Subtext */}
            <p className="cta-text text-neutral-400 text-lg md:text-xl font-light leading-relaxed max-w-xl mx-auto mb-14 border-l border-white/10 pl-8 text-left">
              Don&apos;t settle for average. Architect high-performance software and AI solutions that dominate the market and compound over time.
            </p>

            {/* Buttons */}
            <div className="cta-text flex flex-col sm:flex-row justify-center items-center gap-6">

              {/* Primary — magnetic */}
              <div ref={buttonRef} className="relative group">
                <Link href="/contact"
                  className="inline-flex items-center gap-3 rounded-full bg-teal-400 px-10 py-5 text-base font-black text-black uppercase tracking-widest transition-all hover:bg-white hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(45,212,191,0.25)] hover:shadow-[0_25px_60px_rgba(45,212,191,0.4)]">
                  Start a Project
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Secondary */}
              <Link href="/services"
                className="text-white/50 hover:text-white font-black tracking-widest uppercase text-[11px] border-b border-white/10 hover:border-teal-400 transition-all pb-1">
                View our services
              </Link>
            </div>
          </div>

          {/* Corner mono text */}
          <div className="absolute bottom-8 left-8 font-mono text-[8px] text-white/4 tracking-widest hidden md:block uppercase">
            System_Ready // v4.0.2<br />
            GCT_Network_Active
          </div>
          <div className="absolute top-8 right-8 inline-flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="font-mono text-[8px] text-teal-400/40 uppercase tracking-widest">Live</span>
          </div>
        </div>
      </div>
    </section>
  );
}