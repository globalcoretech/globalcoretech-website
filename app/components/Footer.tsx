"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail, ArrowUpRight, Linkedin, Facebook, Instagram,
  MessageCircle, Terminal, Shield, Clock, MapPin,
  ChevronRight, Zap
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home",      href: "/" },
  { label: "About",     href: "/about" },
  { label: "Services",  href: "/services" },
  { label: "Roadmap",   href: "/roadmap" },
  { label: "Contact",   href: "/contact" },
];

const EXPERTISE_LINKS = [
  { label: "AI Automation",   href: "/services/ai-automation",   color: "#34d399" },
  { label: "Web Apps",        href: "/services/web-apps",        color: "#a78bfa" },
  { label: "Mobile Apps",     href: "/services/mobile-apps",     color: "#f59e0b" },
  { label: "SaaS Platforms",  href: "/services/saas-platforms",  color: "#2dd4bf" },
  { label: "Cloud Solutions", href: "/services/cloud-solutions", color: "#60a5fa" },
];

const SOCIALS = [
  { Icon: Linkedin,  href: "#", label: "LinkedIn" },
  { Icon: Facebook,  href: "#", label: "Facebook" },
  { Icon: Instagram, href: "#", label: "Instagram" },
];

const TRUST_BADGES = [
  { icon: Shield,  text: "NDA Protected" },
  { icon: Clock,   text: "24h Response" },
  { icon: Zap,     text: "Zero Debt Code" },
  { icon: MapPin,  text: "India // Global" },
];

const MARQUEE_ITEMS = [
  "Web Development", "AI Automation", "Mobile Apps",
  "SaaS Platforms", "Cloud Infrastructure", "UI/UX Design",
  "System Architecture", "Zero Debt Engineering",
];

// ── Scramble hook ─────────────────────────────────────────────────────────────
function useScramble(text: string, trigger: boolean) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#";
  useEffect(() => {
    if (!trigger) return;
    let iter = 0;
    const iv = setInterval(() => {
      setDisplay(text.split("").map((c, i) =>
        c === " " ? " " : i < iter ? c : chars[Math.floor(Math.random() * chars.length)]
      ).join(""));
      if (iter >= text.length) clearInterval(iv);
      iter += 1.5;
    }, 32);
    return () => clearInterval(iv);
  }, [trigger]);
  return display;
}

export default function Footer() {
  const footerRef  = useRef<HTMLElement>(null);
  const [scrambleTrig, setScrambleTrig] = useState(false);
  const currentYear = 2026;

  const tagline = useScramble("GLOBALCORE TECH", scrambleTrig);


  useGSAP(() => {
    // Marquee
    gsap.to(".footer-marquee", {
      xPercent: -50, duration: 25, repeat: -1, ease: "linear"
    });

    // Big wordmark parallax
    gsap.fromTo(".footer-wordmark",
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 0.04, duration: 2, ease: "expo.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 80%", scrub: 1 }
      }
    );

    // Columns stagger
    gsap.fromTo(".footer-col",
      { y: 50, opacity: 0, filter: "blur(6px)" },
      {
        y: 0, opacity: 1, filter: "blur(0px)",
        stagger: 0.1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 85%", once: true }
      }
    );

    // Trust badges
    gsap.fromTo(".trust-badge",
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1, scale: 1, stagger: 0.08, duration: 0.6, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".trust-strip", start: "top 90%", once: true }
      }
    );

    // Scramble on enter
    ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => setScrambleTrig(true),
    });

    // Line wipes
    gsap.utils.toArray<HTMLElement>(".f-line-wipe").forEach(el => {
      gsap.from(el, {
        scaleX: 0, transformOrigin: "left", duration: 1.5, ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 95%", once: true }
      });
    });

  }, []);


  return (
    <footer ref={footerRef} className="relative z-20 bg-[#020202] overflow-hidden border-t border-white/5">

      {/* ── Blueprint grid BG ── */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right, #2dd4bf 1px, transparent 1px), linear-gradient(to bottom, #2dd4bf 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }} />
      <div className="absolute inset-0 pointer-events-none z-0 bg-linear-to-b from-[#020202] via-transparent to-transparent" />

      {/* ── Ambient orb ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] rounded-full bg-teal-500/4 blur-[120px] pointer-events-none z-0" />

      {/* ── Giant wordmark (parallax) ── */}
      <div className="footer-wordmark absolute bottom-0 left-0 right-0 flex items-end justify-center pb-4 pointer-events-none z-0 select-none overflow-hidden">
        <span className="text-white font-black uppercase tracking-tighter leading-none"
          style={{ fontSize: "clamp(60px, 14vw, 180px)" }}>
          GLOBALCORE
        </span>
      </div>

      <div className="relative z-10">

        {/* ── Top marquee strip ── */}
        <div className="border-b border-white/5 py-4 overflow-hidden">
          <div className="footer-marquee flex items-center gap-0 whitespace-nowrap" style={{ width: "200%" }}>
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <div key={i} className="flex items-center gap-6 px-8 shrink-0">
                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-neutral-700">{item}</span>
                <span className="text-teal-500/20 text-xs">◆</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">

          {/* ── Trust badges strip ── */}
          <div className="trust-strip footer-col flex flex-wrap gap-3 mb-20">
            {TRUST_BADGES.map((b, i) => (
              <div key={i}
                className="trust-badge flex items-center gap-2 px-4 py-2 rounded-xl border border-white/6 bg-white/2">
                <b.icon size={12} className="text-teal-400" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-500">{b.text}</span>
              </div>
            ))}
          </div>

          {/* ── Links grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">

            {/* Brand col */}
            <div className="footer-col lg:col-span-4">
              <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                <div className="relative w-10 h-10">
                  <Image src="/logo/logo.png" alt="GlobalCore Tech" width={40} height={40} className="object-contain" />
                </div>
                <span className="text-white font-black text-xl uppercase tracking-tighter">
                  Globlcore<span className="text-teal-400">Tech</span>
                </span>
              </Link>

              <p className="text-neutral-500 text-sm font-light leading-relaxed mb-8 max-w-xs">
                Architecting high-performance digital ecosystems for the next generation of global businesses — from zero to scale.
              </p>

              {/* Contact info */}
              <div className="flex flex-col gap-3 mb-8">
                <a href="mailto:contact@globlcoretech.com"
                  className="group flex items-center gap-3 text-neutral-500 hover:text-teal-400 transition-colors text-sm">
                  <div className="w-7 h-7 rounded-lg bg-white/3 border border-white/6 flex items-center justify-center shrink-0 group-hover:border-teal-500/30 transition-colors">
                    <Mail size={12} className="text-teal-400" />
                  </div>
                  contact@globlcoretech.com
                </a>
                <div className="flex items-center gap-3 text-neutral-500 text-sm">
                  <div className="w-7 h-7 rounded-lg bg-white/3 border border-white/6 flex items-center justify-center shrink-0">
                    <MapPin size={12} className="text-teal-400" />
                  </div>
                  India // Serving Worldwide
                </div>
                <a href="https://wa.me/+917879130175" target="_blank" rel="noreferrer"
                  className="group flex items-center gap-3 text-neutral-500 hover:text-[#25D366] transition-colors text-sm">
                  <div className="w-7 h-7 rounded-lg bg-white/3 border border-white/6 flex items-center justify-center shrink-0 group-hover:border-[#25D366]/30 transition-colors">
                    <MessageCircle size={12} className="text-[#25D366]" />
                  </div>
                  WhatsApp Direct
                </a>
              </div>

              {/* Socials */}
              <div className="flex gap-3">
                {SOCIALS.map(({ Icon, href, label }, i) => (
                  <a key={i} href={href} target="_blank" rel="noreferrer" aria-label={label}
                    className="w-9 h-9 rounded-xl border border-white/[0.07] bg-white/2 flex items-center justify-center text-neutral-600 hover:text-teal-400 hover:border-teal-500/30 transition-all duration-300">
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation col */}
            <div className="footer-col lg:col-span-2">
              <h4 className="text-white font-black uppercase tracking-[0.4em] text-[9px] mb-6 flex items-center gap-2">
                <div className="w-4 h-px bg-teal-500" />
                Navigation
              </h4>
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href}
                      className="group flex items-center gap-2 text-neutral-500 hover:text-white transition-colors duration-300 text-sm font-light">
                      <ChevronRight size={12} className="text-teal-500/0 group-hover:text-teal-500/60 transition-colors -ml-3 group-hover:ml-0 duration-300" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Expertise col */}
            <div className="footer-col lg:col-span-3">
              <h4 className="text-white font-black uppercase tracking-[0.4em] text-[9px] mb-6 flex items-center gap-2">
                <div className="w-4 h-px bg-teal-500" />
                Expertise
              </h4>
              <ul className="flex flex-col gap-3">
                {EXPERTISE_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href}
                      className="group flex items-center gap-3 text-neutral-500 hover:text-white transition-colors duration-300 text-sm font-light">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: item.color }} />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* System status col */}
            <div className="footer-col lg:col-span-3">
              <h4 className="text-white font-black uppercase tracking-[0.4em] text-[9px] mb-6 flex items-center gap-2">
                <div className="w-4 h-px bg-teal-500" />
                System Status
              </h4>

              <div className="flex flex-col gap-3 mb-8">
                {[
                  { label: "Website",        status: "Online",      color: "#34d399" },
                  { label: "API Services",   status: "Operational", color: "#34d399" },
                  { label: "AI Pipeline",    status: "Active",      color: "#2dd4bf" },
                  { label: "Support",        status: "Available",   color: "#f59e0b" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/4 last:border-0">
                    <span className="text-neutral-600 text-[11px] font-light">{s.label}</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: s.color }} />
                      <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: s.color }}>
                        {s.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Terminal badge */}
              <div className="p-4 rounded-2xl border border-teal-500/15 bg-teal-500/4">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal size={11} className="text-teal-400" />
                  <span className="font-mono text-[9px] text-teal-400 uppercase tracking-widest">GCT_Status</span>
                </div>
                <p className="font-mono text-[10px] text-teal-300/60 leading-relaxed">
                  <span className="text-teal-400">$</span> uptime --all<br />
                  <span className="text-neutral-600">→ </span>
                  <span className="text-teal-300">99.99%</span> // All systems go
                </p>
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="f-line-wipe h-px bg-white/6 mb-8" />

          {/* ── Bottom bar ── */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Copyright */}
            <p className="text-neutral-700 text-[9px] uppercase tracking-[0.4em] font-mono">
              © {currentYear} // Built by Globalcore Tech
            </p>

            {/* Middle — scramble tagline */}
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span className="font-mono text-[9px] text-neutral-700 uppercase tracking-[0.4em]">{tagline}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            </div>

            {/* Right — legal + back to top */}
            <div className="flex items-center gap-6">
              <Link href="/privacy"
                className="text-neutral-700 hover:text-white text-[9px] uppercase tracking-widest transition-colors font-mono">
                Privacy
              </Link>
              <Link href="/terms"
                className="text-neutral-700 hover:text-white text-[9px] uppercase tracking-widest transition-colors font-mono">
                Terms
              </Link>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group flex items-center gap-2 text-teal-400 text-[9px] font-black uppercase tracking-widest">
                Back to top
                <div className="w-7 h-7 rounded-full border border-teal-400/25 flex items-center justify-center group-hover:bg-teal-400 group-hover:text-black transition-all duration-300">
                  <ArrowUpRight size={12} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}