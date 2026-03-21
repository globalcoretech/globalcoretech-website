"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Zap, Layers, Box, Terminal, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Text Scramble ─────────────────────────────────────────────────────────────
function useScramble(text: string, trigger: boolean, delay = 0) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";
  useEffect(() => {
    if (!trigger) return;
    const timeout = setTimeout(() => {
      let iter = 0;
      const iv = setInterval(() => {
        setDisplay(text.split("").map((c, i) =>
          c === " " ? " " : i < iter ? c : chars[Math.floor(Math.random() * chars.length)]
        ).join(""));
        if (iter >= text.length) clearInterval(iv);
        iter += 1.5;
      }, 30);
    }, delay);
    return () => clearTimeout(timeout);
  }, [trigger]);
  return display;
}

export default function HeroSection() {
  const container   = useRef<HTMLDivElement>(null);
  const cursorRef   = useRef<HTMLDivElement>(null);
  const cursorDotRef= useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  const line1 = useScramble("ENGINEERING", ready, 200);
  const line2 = useScramble("THE NEXT", ready, 500);
  const line3 = useScramble("DIGITAL EPOCH", ready, 800);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Magnetic cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    const dot    = cursorDotRef.current;
    if (!cursor || !dot) return;
    let mx = 0, my = 0, cx = 0, cy = 0;
    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", move);
    let raf: number;
    const tick = () => {
      cx += (mx - cx) * 0.1; cy += (my - cy) * 0.1;
      cursor.style.transform = `translate(${cx - 20}px,${cy - 20}px)`;
      dot.style.transform    = `translate(${mx - 3}px,${my - 3}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const in_ = () => gsap.to(cursor, { scale: 2.8, duration: 0.3 });
    const out_ = () => gsap.to(cursor, { scale: 1,   duration: 0.3 });
    document.querySelectorAll("a,button,.mag").forEach(el => {
      el.addEventListener("mouseenter", in_);
      el.addEventListener("mouseleave", out_);
    });
    return () => { document.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  useGSAP(() => {
    // Badge + sub text
    gsap.fromTo(".hero-badge",
      { opacity: 0, scale: 0.8, y: -20 },
      { opacity: 1, scale: 1,   y: 0, duration: 0.8, delay: 0.2, ease: "back.out(1.7)" }
    );
    // Headline lines reveal
    gsap.fromTo(".h-line",
      { y: "100%", opacity: 0 },
      { y: "0%",   opacity: 1, duration: 1.2, stagger: 0.1, delay: 0.4, ease: "expo.out" }
    );
    // Sub content
    gsap.fromTo(".hero-sub",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 1.1, ease: "power3.out" }
    );
    // Cards stagger
    gsap.fromTo(".hero-card",
      { opacity: 0, y: 60, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.12, delay: 1.3, ease: "power4.out" }
    );
    // Scroll hint bounce
    gsap.to(".scroll-hint", {
      y: 6, duration: 1.1, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.5
    });
  }, { scope: container });

  return (
    <>
      {/* Cursor */}
      <div ref={cursorRef}    className="fixed top-0 left-0 w-10 h-10 rounded-full border border-teal-400/60 pointer-events-none z-9999 mix-blend-difference hidden lg:block" />
      <div ref={cursorDotRef} className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-teal-400 pointer-events-none z-9999 hidden lg:block" />

      <section ref={container} className="relative w-full min-h-screen bg-[#050505] overflow-hidden">

        {/* BG Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/image/hero-bg.png"
            alt="Background"
            fill priority
            className="object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-[#050505]" />
          <div className="absolute inset-0 bg-linear-to-r from-[#050505]/60 via-transparent to-[#050505]/30" />
        </div>

        {/* Noise grain */}
        <div className="absolute inset-0 z-1 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize:"128px" }}
        />

        {/* Ambient orb */}
        <div className="absolute top-[-10%] left-[30%] w-[60vw] h-[60vw] rounded-full bg-teal-500/[0.07] blur-[140px] pointer-events-none z-1" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 pt-28 pb-16">

          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-3 px-5 py-2 rounded-full border border-teal-500/30 bg-black/50 backdrop-blur-md mb-12">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <Terminal size={11} className="text-teal-400" />
            <span className="text-[9px] font-black tracking-[0.6em] uppercase text-teal-400">Global Systems Architecture // v4.0</span>
          </div>

          {/* Giant Headline */}
          <div className="mb-12">
            <div className="overflow-hidden mb-1">
              <h1 className="h-line text-[11vw] md:text-[9vw] font-light tracking-tighter leading-[0.88] text-white uppercase">
                {line1}
              </h1>
            </div>
            <div className="overflow-hidden mb-1">
              <h1 className="h-line text-[11vw] md:text-[9vw] font-light tracking-tighter leading-[0.88] text-white uppercase">
                {line2}
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="h-line text-[11vw] md:text-[9vw] font-black tracking-tighter leading-[0.88] uppercase text-transparent"
                style={{ WebkitTextStroke: "2px #2dd4bf" }}>
                {line3}
              </h1>
            </div>
          </div>

          {/* Sub + CTA */}
          <div className="hero-sub flex flex-col items-center gap-8 mb-20">
            <p className="text-neutral-400 text-lg md:text-xl font-light max-w-xl leading-relaxed">
              High-performance software ecosystems built for startups and enterprises that refuse mediocrity.
            </p>
            <div className="flex items-center gap-5">
              <Link href="/contact">
                <div className="mag group flex items-center gap-4 px-8 py-4 bg-teal-400 rounded-full hover:bg-white transition-colors duration-300 cursor-pointer">
                  <span className="text-black font-black uppercase tracking-widest text-[11px]">Scale the Future</span>
                  <ArrowRight size={16} className="text-black group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link href="/services">
                <div className="mag group flex items-center gap-3 cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-teal-500/50 transition-colors">
                    <ArrowRight size={16} className="text-white/50 group-hover:text-teal-400 transition-colors" />
                  </div>
                  <span className="text-white/50 text-[10px] font-black uppercase tracking-widest group-hover:text-white transition-colors">Our Services</span>
                </div>
              </Link>
            </div>
          </div>

          {/* 3 Feature Cards */}
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Zap,    title: "Velocity",   val: "Enterprise", sub: "Latency Optimized",   accent: "teal" },
              { icon: Layers, title: "Structure",  val: "Modular",    sub: "Cloud-Native Core",   accent: "violet" },
              { icon: Box,    title: "Integrity",  val: "Fortified",  sub: "Military-Grade Logic", accent: "amber" },
            ].map((item, i) => (
              <div key={i}
                className="hero-card group relative p-8 rounded-4xl border border-white/10 bg-black/50 backdrop-blur-2xl hover:border-teal-500/30 transition-all duration-500 text-left overflow-hidden">
                {/* Hover glow */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-teal-500/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-7">
                  <item.icon size={20} className="text-teal-400" />
                </div>
                <div className="relative z-10">
                  <span className="text-[9px] font-black text-teal-400/60 uppercase tracking-[0.4em] mb-2 block">{item.title}</span>
                  <h3 className="text-3xl font-black text-white italic mb-1 uppercase tracking-tighter">{item.val}</h3>
                  <div className="h-px w-8 bg-teal-500/40 mt-3 mb-2 group-hover:w-full transition-all duration-700" />
                  <p className="text-neutral-600 text-[9px] font-bold tracking-widest uppercase">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
            <span className="text-[8px] font-mono text-neutral-600 uppercase tracking-[0.4em]">scroll</span>
            <ChevronDown size={14} className="text-teal-500/60" />
          </div>
        </div>

        <style jsx global>{`* { cursor: none !important; }`}</style>
      </section>
    </>
  );
}