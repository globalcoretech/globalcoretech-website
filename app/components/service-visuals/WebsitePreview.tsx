"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { Globe, Zap, TrendingUp, MousePointerClick, Wifi, Shield } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// ── Live metric hooks ─────────────────────────────────────────────────────────
function useLiveCounter(base: number, range: number, interval: number) {
  const [val, setVal] = useState(base);
  useEffect(() => {
    const iv = setInterval(() => {
      setVal(v => v + Math.floor(Math.random() * range));
    }, interval);
    return () => clearInterval(iv);
  }, []);
  return val;
}

// ── Typing animation hook ─────────────────────────────────────────────────────
function useTyping(texts: string[], speed = 60) {
  const [display, setDisplay] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1400);
        } else setCharIdx(c => c + 1);
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setTextIdx(t => (t + 1) % texts.length);
          setCharIdx(0);
        } else setCharIdx(c => c - 1);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx]);

  return display;
}

// ── Sparkline mini chart ──────────────────────────────────────────────────────
function Sparkline({ color }: { color: string }) {
  const [points, setPoints] = useState([40, 55, 35, 60, 45, 70, 50, 65, 48, 72]);
  useEffect(() => {
    const iv = setInterval(() => {
      setPoints(p => [...p.slice(1), 30 + Math.random() * 50]);
    }, 800);
    return () => clearInterval(iv);
  }, []);
  const max = Math.max(...points), min = Math.min(...points);
  const normalize = (v: number) => 100 - ((v - min) / (max - min + 1)) * 80;
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${(i / (points.length - 1)) * 200},${normalize(p)}`).join(" ");
  return (
    <svg viewBox="0 0 200 100" className="w-full h-10" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={path + " L200,100 L0,100 Z"} fill="url(#sg)" />
      <motion.path d={path} fill="none" stroke={color} strokeWidth="1.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
    </svg>
  );
}

export default function WebsitePreview() {
  const visitors   = useLiveCounter(1247, 3, 1800);
  const conversions= useLiveCounter(89, 2, 2400);
  const pageviews  = useLiveCounter(4821, 7, 1200);
  const typed      = useTyping(["Build faster.", "Ship smarter.", "Scale globally.", "Earn more."], 55);

  // Performance score animation
  const [score, setScore] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        setScore(s => { if (s >= 98) { clearInterval(iv); return 98; } return s + 2; });
      }, 20);
      return () => clearInterval(iv);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  // Request timeline bars
  const [bars, setBars] = useState([120, 45, 30, 80, 55, 20, 95, 40]);
  useEffect(() => {
    const iv = setInterval(() => {
      setBars(b => [...b.slice(1), 20 + Math.random() * 90]);
    }, 700);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="w-full rounded-3xl overflow-hidden border border-white/8 bg-[#080808]">

      {/* ── Browser chrome ── */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/6 bg-[#0d0d0d]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-4 bg-white/5 rounded-lg px-4 py-1.5 flex items-center gap-2 border border-white/6">
          <Shield size={10} className="text-teal-400" />
          <span className="text-[10px] font-mono text-neutral-500">https://yourplatform.com</span>
          <span className="ml-auto text-[9px] font-black text-teal-400 uppercase tracking-widest">Live</span>
        </div>
        <div className="flex items-center gap-1">
          <Wifi size={12} className="text-teal-400" />
          <span className="text-[9px] font-mono text-teal-400">98ms</span>
        </div>
      </div>

      {/* ── Website content simulation ── */}
      <div className="grid lg:grid-cols-3 divide-x divide-white/5">

        {/* Left — Hero mockup */}
        <div className="lg:col-span-2 p-6 border-b lg:border-b-0 border-white/5">

          {/* Fake nav */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-teal-400/30" />
              <div className="w-16 h-2.5 rounded bg-white/20" />
            </div>
            <div className="flex gap-4">
              {[40, 50, 35, 45].map((w, i) => (
                <div key={i} className="h-2 rounded bg-white/10" style={{ width: `${w}px` }} />
              ))}
            </div>
            <div className="w-20 h-7 rounded-full bg-teal-400/20 border border-teal-400/30" />
          </div>

          {/* Hero text */}
          <div className="mb-6">
            <div className="w-3/4 h-8 rounded-lg bg-white/10 mb-3" />
            <div className="flex items-baseline gap-1 mb-3 h-8">
              <span className="text-teal-400 font-black text-xl font-mono">{typed}</span>
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
                className="text-teal-400 font-black text-xl">|</motion.span>
            </div>
            <div className="space-y-2 mb-5">
              <div className="h-2.5 rounded bg-white/8 w-full" />
              <div className="h-2.5 rounded bg-white/8 w-4/5" />
              <div className="h-2.5 rounded bg-white/8 w-3/5" />
            </div>
            <div className="flex gap-3">
              <div className="w-28 h-9 rounded-full bg-teal-400/25 border border-teal-400/40" />
              <div className="w-24 h-9 rounded-full bg-white/5 border border-white/10" />
            </div>
          </div>

          {/* Request timeline */}
          <div className="border-t border-white/5 pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest">Network Requests</span>
              <span className="text-[9px] font-mono text-teal-400">~{Math.floor(bars.reduce((a, b) => a + b, 0) / bars.length)}ms avg</span>
            </div>
            <div className="flex items-end gap-1 h-10">
              {bars.map((h, i) => (
                <motion.div key={i} className="flex-1 rounded-sm"
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.4 }}
                  style={{ background: `rgba(45,212,191,${0.2 + (h / 100) * 0.6})` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Right — Live metrics panel */}
        <div className="p-5 flex flex-col gap-4">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-600">Live Metrics</span>

          {/* Metric cards */}
          {[
            { icon: MousePointerClick, label: "Live Visitors",  val: visitors.toLocaleString(),  color: "#2dd4bf", spark: "#2dd4bf" },
            { icon: TrendingUp,        label: "Page Views",     val: pageviews.toLocaleString(), color: "#a78bfa", spark: "#a78bfa" },
            { icon: Zap,               label: "Conversions",    val: conversions.toString(),     color: "#f59e0b", spark: "#f59e0b" },
          ].map((m, i) => (
            <div key={i} className="p-4 rounded-2xl border border-white/6 bg-white/2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <m.icon size={13} style={{ color: m.color }} />
                  <span className="text-[9px] font-black uppercase tracking-widest text-neutral-600">{m.label}</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: m.color }} />
              </div>
              <p className="text-2xl font-black tracking-tighter mb-1" style={{ color: m.color }}>{m.val}</p>
              <Sparkline color={m.spark} />
            </div>
          ))}

          {/* Performance score */}
          <div className="p-4 rounded-2xl border border-teal-500/20 bg-teal-500/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-black uppercase tracking-widest text-teal-400">Lighthouse Score</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-teal-400 tracking-tighter">{score}</span>
              <span className="text-neutral-600 text-sm mb-1">/100</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div className="h-full rounded-full bg-teal-400"
                animate={{ width: `${score}%` }} transition={{ duration: 0.1 }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[8px] font-mono text-neutral-700">Performance</span>
              <span className="text-[8px] font-mono text-teal-400">Excellent</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Status bar ── */}
      <div className="border-t border-white/5 px-5 py-2.5 flex items-center gap-6 bg-[#0d0d0d]">
        {[
          { dot: "#2dd4bf", text: "CDN Active" },
          { dot: "#34d399", text: "SSL Secured" },
          { dot: "#a78bfa", text: "SEO Score: 98" },
          { dot: "#f59e0b", text: "Core Web Vitals: Pass" },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
            <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest">{s.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}