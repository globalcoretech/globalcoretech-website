"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bell, Wifi, Battery, ChevronRight, Home, Search, User, Heart, TrendingUp, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

function useLiveCounter(base: number, step: number, interval: number) {
  const [val, setVal] = useState(base);
  useEffect(() => {
    const iv = setInterval(() => setVal(v => v + Math.floor(Math.random() * step)), interval);
    return () => clearInterval(iv);
  }, []);
  return val;
}

// ── Push notification ─────────────────────────────────────────────────────────
const NOTIFICATIONS = [
  { app: "Analytics",  msg: "Traffic up 34% today!",        color: "#2dd4bf" },
  { app: "Payments",   msg: "New $299 subscription!",       color: "#34d399" },
  { app: "Users",      msg: "12 new signups this hour",     color: "#a78bfa" },
  { app: "System",     msg: "Deploy successful ✓",          color: "#60a5fa" },
];

// ── Mini ring chart ───────────────────────────────────────────────────────────
function RingChart({ pct, color, size = 48 }: { pct: number; color: string; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
      <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="4"
        strokeLinecap="round" strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - (pct / 100) * circ }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }} />
      <text x={size / 2} y={size / 2 + 4} textAnchor="middle" fill={color} fontSize="10" fontWeight="900">
        {pct}%
      </text>
    </svg>
  );
}

export default function MobileAppPreview() {
  const revenue  = useLiveCounter(12400, 50,  2000);
  const users    = useLiveCounter(1261,  2,   1800);
  const [notifIdx, setNotifIdx]   = useState(0);
  const [showNotif, setShowNotif] = useState(false);
  const [screen, setScreen]       = useState(0); // 0=home, 1=analytics
  const [time, setTime]           = useState("9:41");

  // Rotate notifications
  useEffect(() => {
    const iv = setInterval(() => {
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 3000);
      setNotifIdx(n => (n + 1) % NOTIFICATIONS.length);
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  // Clock
  useEffect(() => {
    const iv = setInterval(() => {
      const d = new Date();
      setTime(`${d.getHours()}:${d.getMinutes().toString().padStart(2, "0")}`);
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  const notif = NOTIFICATIONS[notifIdx];

  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-10 py-4">

      {/* ── Phone ── */}
      <div className="shrink-0 relative mx-auto">
        {/* Glow */}
        <div className="absolute inset-0 rounded-[44px] blur-2xl scale-90 opacity-40"
          style={{ background: "radial-gradient(ellipse at center, #2dd4bf30, transparent)" }} />

        {/* Frame */}
        <div className="relative w-60 h-122.5 rounded-[44px] border-2 border-white/15 bg-[#050505] shadow-[0_0_60px_rgba(45,212,191,0.15)] overflow-hidden">

          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-22.5 h-7 rounded-full bg-black border border-white/10 z-20 flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-400/60" />
            <div className="w-5 h-1.5 rounded-full bg-white/10" />
          </div>

          {/* Push notification banner */}
          <AnimatePresence>
            {showNotif && (
              <motion.div
                initial={{ y: -80, opacity: 0 }} animate={{ y: 44, opacity: 1 }}
                exit={{ y: -80, opacity: 0 }} transition={{ type: "spring", damping: 20 }}
                className="absolute left-3 right-3 z-30 px-4 py-3 rounded-2xl border border-white/10 backdrop-blur-xl flex items-center gap-3"
                style={{ background: "rgba(8,8,8,0.95)" }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: `${notif.color}20` }}>
                  <Bell size={14} style={{ color: notif.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: notif.color }}>{notif.app}</p>
                  <p className="text-[10px] text-white font-light truncate">{notif.msg}</p>
                </div>
                <span className="text-[8px] text-neutral-700 font-mono">now</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 pt-2 pb-1">
            <span className="text-[10px] font-black text-white">{time}</span>
            <div className="flex items-center gap-1.5">
              <Wifi size={10} className="text-white" />
              <Battery size={12} className="text-white" />
            </div>
          </div>

          {/* Screen content */}
          <div className="absolute inset-0 pt-12 pb-14 overflow-hidden">
            <AnimatePresence mode="wait">
              {screen === 0 ? (
                <motion.div key="home"
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.3 }}
                  className="h-full px-4 flex flex-col gap-3">

                  {/* Greeting */}
                  <div className="pt-2">
                    <p className="text-neutral-600 text-[9px] font-mono uppercase tracking-widest">Good morning</p>
                    <p className="text-white font-black text-lg leading-none">Dashboard</p>
                  </div>

                  {/* Revenue card */}
                  <div className="rounded-2xl p-4 border border-teal-400/20"
                    style={{ background: "linear-gradient(135deg, #2dd4bf18, #2dd4bf05)" }}>
                    <p className="text-[9px] font-black uppercase tracking-widest text-teal-400/60 mb-1">Total Revenue</p>
                    <p className="text-2xl font-black text-teal-400 tracking-tighter">${(revenue / 1000).toFixed(1)}K</p>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight size={10} className="text-teal-400" />
                      <span className="text-[9px] text-teal-400 font-black">+18% this week</span>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Users",     val: users.toLocaleString(), color: "#a78bfa" },
                      { label: "Orders",    val: "342",                  color: "#f59e0b" },
                      { label: "Sessions",  val: "8.2K",                 color: "#60a5fa" },
                      { label: "Retention", val: "94%",                  color: "#34d399" },
                    ].map((s, i) => (
                      <div key={i} className="p-3 rounded-xl border border-white/6 bg-white/2">
                        <p className="text-[8px] font-black uppercase tracking-widest text-neutral-600 mb-1">{s.label}</p>
                        <p className="font-black text-base tracking-tighter" style={{ color: s.color }}>{s.val}</p>
                      </div>
                    ))}
                  </div>

                  {/* Activity list */}
                  <div className="flex flex-col gap-1.5">
                    {["New user signed up", "Payment processed", "Report generated"].map((t, i) => (
                      <div key={i} className="flex items-center gap-2 py-1.5 border-b border-white/4 last:border-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        <span className="text-[9px] text-neutral-500 font-light">{t}</span>
                        <span className="ml-auto text-[8px] text-neutral-700 font-mono">{i + 1}m ago</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="analytics"
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}
                  className="h-full px-4 flex flex-col gap-3">
                  <div className="pt-2">
                    <p className="text-neutral-600 text-[9px] font-mono uppercase tracking-widest">Overview</p>
                    <p className="text-white font-black text-lg leading-none">Analytics</p>
                  </div>
                  <div className="flex items-center justify-around py-4">
                    <div className="flex flex-col items-center gap-1">
                      <RingChart pct={87} color="#2dd4bf" />
                      <p className="text-[8px] text-neutral-600 uppercase tracking-widest">Retention</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <RingChart pct={64} color="#a78bfa" />
                      <p className="text-[8px] text-neutral-600 uppercase tracking-widest">Conversion</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <RingChart pct={92} color="#34d399" />
                      <p className="text-[8px] text-neutral-600 uppercase tracking-widest">Uptime</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl border border-white/6 bg-white/2">
                    <p className="text-[8px] font-black uppercase tracking-widest text-neutral-600 mb-2">DAU Trend</p>
                    <div className="flex items-end gap-0.5 h-12">
                      {[40,55,35,70,45,80,60,75,50,85,65,90].map((h, i) => (
                        <motion.div key={i} className="flex-1 rounded-sm bg-teal-400/30"
                          animate={{ height: `${h}%` }} transition={{ duration: 0.5, delay: i * 0.05 }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom nav */}
          <div className="absolute bottom-0 left-0 right-0 h-14 border-t border-white/6 bg-[#050505] flex items-center justify-around px-2">
            {[
              { icon: Home,       label: "Home",    idx: 0 },
              { icon: TrendingUp, label: "Stats",   idx: 1 },
              { icon: Search,     label: "Search",  idx: 2 },
              { icon: User,       label: "Profile", idx: 3 },
            ].map((tab) => (
              <button key={tab.idx} onClick={() => setScreen(tab.idx < 2 ? tab.idx : screen)}
                className="flex flex-col items-center gap-0.5 py-1 px-2">
                <tab.icon size={16} style={{ color: screen === tab.idx ? "#2dd4bf" : "rgba(255,255,255,0.3)" }} />
                <span className="text-[7px] font-black uppercase tracking-wider"
                  style={{ color: screen === tab.idx ? "#2dd4bf" : "rgba(255,255,255,0.2)" }}>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right — Feature highlights ── */}
      <div className="flex flex-col gap-4 flex-1 min-w-0">
        <div>
          <p className="text-[9px] font-mono text-neutral-600 uppercase tracking-[0.4em] mb-2">App Features</p>
          <h3 className="text-2xl font-black uppercase tracking-tighter text-white leading-none">
            60fps. <span className="text-teal-400 italic" style={{ fontFamily: "Georgia,serif" }}>Always.</span>
          </h3>
        </div>

        {[
          { color: "#2dd4bf", title: "Live Push Notifications", desc: "Deep linking + rich media support out of the box" },
          { color: "#a78bfa", title: "Offline First Architecture", desc: "Full functionality without internet — syncs on reconnect" },
          { color: "#f59e0b", title: "React Native Reanimated 3", desc: "Native thread animations — silky smooth at 60fps" },
          { color: "#34d399", title: "App Store Optimized", desc: "ASO-ready metadata, screenshots, and preview videos" },
        ].map((f, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 + 0.3 }}
            className="flex items-start gap-4 p-4 rounded-2xl border border-white/6 bg-white/2 group hover:border-white/15 transition-colors">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: `${f.color}15` }}>
              <div className="w-2 h-2 rounded-full" style={{ background: f.color }} />
            </div>
            <div>
              <p className="font-black text-sm text-white uppercase tracking-tight mb-0.5">{f.title}</p>
              <p className="text-neutral-600 text-[11px] font-light">{f.desc}</p>
            </div>
          </motion.div>
        ))}

        {/* Platform badges */}
        <div className="flex gap-2 mt-1">
          {["iOS 17+", "Android 12+", "React Native", "Expo SDK 51"].map((b, i) => (
            <span key={i} className="px-3 py-1.5 rounded-xl border border-white/6 text-[9px] font-black text-neutral-500 uppercase tracking-widest">
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}