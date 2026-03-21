"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Activity, Database, Server, Users, Cpu, CheckCircle, TrendingUp, DollarSign, Zap, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

function useLiveCounter(base: number, step: number, interval: number) {
  const [val, setVal] = useState(base);
  useEffect(() => {
    const iv = setInterval(() => setVal(v => v + Math.floor(Math.random() * step)), interval);
    return () => clearInterval(iv);
  }, []);
  return val;
}

// ── Mini bar chart ────────────────────────────────────────────────────────────
function MiniBarChart({ color }: { color: string }) {
  const [bars, setBars] = useState([60, 45, 80, 55, 70, 40, 90, 65, 75, 50, 85, 60]);
  useEffect(() => {
    const iv = setInterval(() => setBars(b => [...b.slice(1), 30 + Math.random() * 70]), 600);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="flex items-end gap-0.5 h-8 w-full">
      {bars.map((h, i) => (
        <motion.div key={i} className="flex-1 rounded-sm"
          animate={{ height: `${h}%` }} transition={{ duration: 0.3 }}
          style={{ background: `${color}${Math.floor(40 + h * 0.5).toString(16)}` }} />
      ))}
    </div>
  );
}

// ── Revenue area chart ────────────────────────────────────────────────────────
function RevenueChart() {
  const [points, setPoints] = useState([20,35,28,45,38,55,42,60,52,68,58,75,65,72]);
  useEffect(() => {
    const iv = setInterval(() => setPoints(p => [...p.slice(1), 40 + Math.random() * 45]), 900);
    return () => clearInterval(iv);
  }, []);
  const max = Math.max(...points);
  const norm = (v: number) => 100 - (v / max) * 85;
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"}${(i / (points.length - 1)) * 300},${norm(p)}`).join(" ");
  return (
    <svg viewBox="0 0 300 100" className="w-full h-16" preserveAspectRatio="none">
      <defs>
        <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={pathD + ` L300,100 L0,100 Z`} fill="url(#rg)" />
      <motion.path d={pathD} fill="none" stroke="#2dd4bf" strokeWidth="2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
      {/* Last point dot */}
      <motion.circle cx={300} cy={norm(points[points.length - 1])} r="3" fill="#2dd4bf"
        animate={{ r: [3, 5, 3], opacity: [1, 0.6, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
    </svg>
  );
}

// ── Activity log ──────────────────────────────────────────────────────────────
const LOG_ITEMS = [
  { text: "New subscription — Pro Plan", color: "#2dd4bf",  time: "just now" },
  { text: "API call batch processed",    color: "#a78bfa",  time: "2s ago" },
  { text: "Stripe webhook received",     color: "#34d399",  time: "5s ago" },
  { text: "User onboarding completed",   color: "#f59e0b",  time: "9s ago" },
  { text: "Database backup executed",    color: "#60a5fa",  time: "14s ago" },
  { text: "Automation workflow ran",     color: "#2dd4bf",  time: "18s ago" },
];

export default function SaaSDashboardPreview() {
  const users    = useLiveCounter(12847, 2, 2200);
  const requests = useLiveCounter(98234, 12, 400);
  const mrr      = useLiveCounter(24800, 50, 3000);
  const [logItems, setLogItems] = useState(LOG_ITEMS.slice(0, 4));
  const [logKey, setLogKey] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      const newItem = LOG_ITEMS[Math.floor(Math.random() * LOG_ITEMS.length)];
      setLogItems(prev => [{ ...newItem, time: "just now" }, ...prev.slice(0, 3)]);
      setLogKey(k => k + 1);
    }, 2500);
    return () => clearInterval(iv);
  }, []);

  const statCards = [
    { label: "Active Users",   val: users.toLocaleString(),   icon: Users,       color: "#2dd4bf", change: "+12%" },
    { label: "API Requests",   val: requests.toLocaleString(),icon: Activity,    color: "#a78bfa", change: "+8%" },
    { label: "MRR",            val: `$${(mrr/1000).toFixed(1)}K`, icon: DollarSign, color: "#34d399", change: "+24%" },
    { label: "System Load",    val: "32%",                    icon: Cpu,         color: "#f59e0b", change: "Healthy" },
  ];

  return (
    <div className="w-full rounded-3xl overflow-hidden border border-white/8 bg-[#080808]">

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/6 bg-[#0d0d0d]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-teal-400/20 border border-teal-400/30 flex items-center justify-center">
            <Server size={14} className="text-teal-400" />
          </div>
          <div>
            <p className="text-white font-black text-sm uppercase tracking-tight">GlobalCore SaaS</p>
            <p className="text-neutral-600 text-[9px] font-mono uppercase tracking-widest">Dashboard // v4.0</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <motion.div className="w-2 h-2 rounded-full bg-teal-400"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }} />
            <span className="text-[9px] font-mono text-teal-400 uppercase tracking-widest">All Systems Live</span>
          </div>
        </div>
      </div>

      <div className="p-5 grid lg:grid-cols-12 gap-4">

        {/* Left col */}
        <div className="lg:col-span-8 flex flex-col gap-4">

          {/* Stat cards row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {statCards.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-2xl border border-white/6 bg-white/2 group hover:border-white/15 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: `${s.color}15`, color: s.color }}>
                    <s.icon size={15} />
                  </div>
                  <div className="flex items-center gap-1">
                    <ArrowUpRight size={10} style={{ color: s.color }} />
                    <span className="text-[9px] font-black" style={{ color: s.color }}>{s.change}</span>
                  </div>
                </div>
                <p className="text-xl font-black tracking-tighter" style={{ color: s.color }}>{s.val}</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-neutral-600 mt-0.5">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Revenue chart */}
          <div className="p-5 rounded-2xl border border-white/6 bg-white/2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-black text-sm text-white uppercase tracking-tight">Monthly Revenue</p>
                <p className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest">Real-time MRR Growth</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-teal-400 tracking-tighter">${(mrr / 1000).toFixed(1)}K</p>
                <p className="text-[9px] text-teal-400/60 font-black">↑ 24% MoM</p>
              </div>
            </div>
            <RevenueChart />
          </div>

          {/* Mini charts row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "API Latency",  color: "#a78bfa", val: "98ms" },
              { label: "DB Queries",   color: "#34d399", val: "1.2K/s" },
              { label: "Error Rate",   color: "#f59e0b", val: "0.01%" },
            ].map((c, i) => (
              <div key={i} className="p-4 rounded-2xl border border-white/6 bg-white/2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-neutral-600">{c.label}</span>
                  <span className="text-[10px] font-black" style={{ color: c.color }}>{c.val}</span>
                </div>
                <MiniBarChart color={c.color} />
              </div>
            ))}
          </div>
        </div>

        {/* Right col */}
        <div className="lg:col-span-4 flex flex-col gap-4">

          {/* Live activity feed */}
          <div className="p-5 rounded-2xl border border-white/6 bg-white/2 flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="font-black text-sm text-white uppercase tracking-tight">Live Activity</p>
              <motion.div className="w-2 h-2 rounded-full bg-teal-400"
                animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1, repeat: Infinity }} />
            </div>
            <div className="flex flex-col gap-2">
              <AnimatePresence mode="popLayout">
                {logItems.map((item, i) => (
                  <motion.div key={`${logKey}-${i}`}
                    initial={{ opacity: 0, x: 20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 py-2 border-b border-white/4 last:border-0">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: item.color }} />
                    <span className="text-[11px] text-neutral-400 font-light flex-1 leading-tight">{item.text}</span>
                    <span className="text-[9px] font-mono text-neutral-700 shrink-0">{item.time}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* System status */}
          <div className="p-5 rounded-2xl border border-white/6 bg-white/2">
            <p className="font-black text-sm text-white uppercase tracking-tight mb-4">System Health</p>
            <div className="flex flex-col gap-3">
              {[
                { label: "API Servers",    status: "Operational", color: "#2dd4bf" },
                { label: "Database",       status: "Connected",   color: "#34d399" },
                { label: "Stripe Billing", status: "Processing",  color: "#a78bfa" },
                { label: "CDN / Cache",    status: "99.99% Up",   color: "#60a5fa" },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <motion.div className="w-2 h-2 rounded-full"
                      style={{ background: s.color }}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }} />
                    <span className="text-[11px] text-neutral-500 font-light">{s.label}</span>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: s.color }}>
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/5 px-6 py-2.5 bg-[#0d0d0d] flex items-center gap-6">
        {[
          { label: "Uptime", val: "99.99%", color: "#2dd4bf" },
          { label: "Avg Response", val: "98ms", color: "#a78bfa" },
          { label: "Data Processed", val: `${(requests / 1000).toFixed(0)}K req`, color: "#34d399" },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest">{s.label}:</span>
            <span className="text-[9px] font-black font-mono" style={{ color: s.color }}>{s.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}