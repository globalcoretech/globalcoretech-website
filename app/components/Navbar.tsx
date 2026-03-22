"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight, Menu, X, Zap, MessageCircle } from "lucide-react";

const navLinks = [
  { name: "Home",     href: "/", isNew: false },
  { name: "Services", href: "/services", isNew: false },
  { name: "About",    href: "/about", isNew: false },
  { name: "Contact",  href: "/contact", isNew: false },
];

export default function Navbar() {
  const { scrollY }    = useScroll();
  const pathname       = usePathname();
  const wrapRef        = useRef<HTMLDivElement>(null);
  const ctaRef         = useRef<HTMLAnchorElement>(null);

  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeIdx,  setActiveIdx]  = useState(0);

  useEffect(() => {
    const unsub = scrollY.on("change", v => setScrolled(v > 50));
    return () => unsub();
  }, [scrollY]);

  useEffect(() => {
    const idx = navLinks.findIndex(l =>
      l.href === "/" ? pathname === "/" : pathname.startsWith(l.href)
    );
    setActiveIdx(idx >= 0 ? idx : 0);
  }, [pathname]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // GSAP entrance
  useGSAP(() => {
    gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } })
      .from(".nb-logo", { y: -20, opacity: 0, filter: "blur(8px)", clearProps: "all" })
      .from(".nb-link", { y: -16, opacity: 0, filter: "blur(4px)", stagger: 0.07, clearProps: "all" }, "-=1.0")
      .from(".nb-cta",  { scale: 0.85, opacity: 0, filter: "blur(4px)", clearProps: "all" }, "-=0.8");
  }, { scope: wrapRef });

  // Magnetic CTA
  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn) return;
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      gsap.to(btn, {
        x: (e.clientX - r.left - r.width  / 2) * 0.25,
        y: (e.clientY - r.top  - r.height / 2) * 0.25,
        duration: 0.35, ease: "power2.out",
      });
    };
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.35)" });
    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => { btn.removeEventListener("mousemove", onMove); btn.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <>
      <div ref={wrapRef} className="fixed top-0 left-0 w-full z-9999 pointer-events-none">

        {/* Outer padding animates on scroll */}
        <motion.div
          animate={{ padding: scrolled ? "8px 12px" : "16px 16px" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none">

          {/* Island container */}
          <motion.div
            animate={{
              maxWidth:      scrolled ? "820px"  : "1280px",
              borderRadius:  scrolled ? "999px"  : "18px",
              background:    scrolled ? "rgba(5,5,5,0.90)"  : "rgba(5,5,5,0.0)",
              borderColor:   scrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.0)",
              backdropFilter: scrolled ? "blur(20px) saturate(150%)" : "blur(0px)",
              boxShadow:     scrolled
                ? "0 4px 6px -1px rgba(0,0,0,0.4), 0 2px 60px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.04) inset"
                : "none",
              paddingLeft:   scrolled ? "14px" : "0px",
              paddingRight:  scrolled ? "14px" : "0px",
              paddingTop:    scrolled ? "7px"  : "0px",
              paddingBottom: scrolled ? "7px"  : "0px",
            }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full border border-transparent flex items-center justify-between pointer-events-auto">

            {/* ── Logo ── */}
            <Link href="/" className="nb-logo flex items-center gap-2.5 group shrink-0">
              <motion.div
                animate={{ width: scrolled ? 28 : 38, height: scrolled ? 28 : 38 }}
                transition={{ duration: 0.4 }}
                className="relative shrink-0">
                <Image src="/logo/logo.png" alt="GlobalCore Tech" fill className="object-contain group-hover:rotate-12 transition-transform duration-500" />
              </motion.div>
              <motion.span
                animate={{ fontSize: scrolled ? "13px" : "16px" }}
                transition={{ duration: 0.4 }}
                className="font-black uppercase tracking-tighter leading-none text-white whitespace-nowrap hidden sm:block">
                Globlcore<span className="text-teal-400">Tech</span>
              </motion.span>
            </Link>

            {/* ── Center links ── */}
            <nav className="hidden md:flex items-center">
              {navLinks.map((link, i) => {
                const isActive  = activeIdx === i;
                const isHovered = hoveredIdx === i;
                return (
                  <Link key={link.name} href={link.href}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="nb-link relative">

                    <motion.div
                      animate={{
                        paddingLeft:   scrolled ? "13px" : "17px",
                        paddingRight:  scrolled ? "13px" : "17px",
                        paddingTop:    scrolled ? "5px"  : "8px",
                        paddingBottom: scrolled ? "5px"  : "8px",
                      }}
                      transition={{ duration: 0.4 }}
                      className="relative rounded-full">

                      {/* Sliding pill bg */}
                      {(isActive || isHovered) && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: isActive ? "rgba(45,212,191,0.1)" : "rgba(255,255,255,0.05)",
                            boxShadow:  isActive ? "0 0 20px rgba(45,212,191,0.12)" : "none",
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}

                      <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.15em] transition-colors duration-150"
                        style={{ color: isActive ? "#2dd4bf" : isHovered ? "white" : "rgba(255,255,255,0.4)" }}>
                        {link.name}
                      </span>

                      {/* Active bottom dot */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-dot"
                          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-teal-400"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          style={{ boxShadow: "0 0 6px #2dd4bf" }}
                        />
                      )}

                      {/* New pulse badge */}
                      {link.isNew && (
                        <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
                        </span>
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </nav>

            {/* ── Right: CTA + mobile toggle ── */}
            <div className="flex items-center gap-3 shrink-0">
              <Link ref={ctaRef} href="/contact"
                className="nb-cta hidden md:inline-flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.18em] rounded-full overflow-hidden relative group transition-colors duration-300"
                style={{
                  background: scrolled ? "#2dd4bf" : "white",
                  color: "black",
                  padding: scrolled ? "7px 18px" : "10px 24px",
                }}>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Start Project
                  <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </Link>

              <button onClick={() => setMobileOpen(v => !v)}
                className="nb-cta md:hidden w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-teal-400 hover:border-teal-400/30 transition-all"
                aria-label="Toggle menu">
                <motion.div animate={{ rotate: mobileOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                  {mobileOpen ? <X size={15} /> : <Menu size={15} />}
                </motion.div>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-9990 md:hidden"
              style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0,   scale: 1     }}
              exit={{   opacity: 0, y: -8,   scale: 0.97  }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed z-9995 md:hidden overflow-hidden"
              style={{
                top: "68px", left: "12px", right: "12px",
                background: "rgba(5,5,5,0.97)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "24px",
                boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03) inset",
              }}>

              {/* Header */}
              <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <span className="font-mono text-[8px] text-teal-400 uppercase tracking-[0.5em]">Navigation</span>
                </div>
                <span className="font-mono text-[8px] text-neutral-700 uppercase tracking-widest">GCT v4.0</span>
              </div>

              {/* Nav links */}
              <div className="p-3 flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = activeIdx === i;
                  return (
                    <motion.div key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.25 }}>
                      <Link href={link.href}
                        className="flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 group"
                        style={{
                          background:   isActive ? "rgba(45,212,191,0.07)" : "transparent",
                          borderLeft:   isActive ? "2px solid rgba(45,212,191,0.6)" : "2px solid transparent",
                        }}>
                        <div className="flex items-center gap-3">
                          <span className="font-black text-sm uppercase tracking-widest"
                            style={{ color: isActive ? "#2dd4bf" : "rgba(255,255,255,0.35)" }}>
                            {link.name}
                          </span>
                          {link.isNew && (
                            <span className="px-2 py-0.5 rounded-full bg-teal-400/10 border border-teal-400/20 text-[7px] font-black text-teal-400 uppercase tracking-widest">
                              New
                            </span>
                          )}
                        </div>
                        <ArrowUpRight size={13}
                          style={{ color: isActive ? "rgba(45,212,191,0.6)" : "rgba(255,255,255,0.1)" }}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom */}
              <div className="p-3 pt-0">
                <div className="h-px bg-white/4 mb-3" />
                <Link href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-teal-400 text-black font-black uppercase tracking-widest text-[10px] hover:bg-white transition-colors duration-300 group mb-2">
                  <Zap size={13} />
                  Start a Project
                  <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <a href="https://wa.me/+917879130175" target="_blank" rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border border-white/5 text-neutral-600 hover:text-[#25D366] hover:border-[#25D366]/20 transition-all text-[9px] font-black uppercase tracking-widest">
                  <MessageCircle size={12} className="text-[#25D366]" />
                  WhatsApp Direct
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}