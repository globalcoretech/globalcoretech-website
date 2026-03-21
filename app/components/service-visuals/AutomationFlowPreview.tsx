"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Database, Cpu, Zap, GitBranch, MessageSquare, CheckCircle2, AlertCircle, ArrowRight, Bot } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// ── LLM token streaming simulation ───────────────────────────────────────────
const RESPONSES = [
  "Analyzing customer churn patterns across 12,847 users...",
  "Detected anomaly in payment flow — auto-routing to recovery pipeline.",
  "Generating weekly report: +34% conversion, -12% support tickets.",
  "Webhook received from Stripe — triggering onboarding automation.",
];

function useTokenStream(trigger: boolean, text: string, speed = 35) {
  const [output, setOutput] = useState("");
  useEffect(() => {
    if (!trigger) return;
    setOutput("");
    let i = 0;
    const iv = setInterval(() => {
      if (i >= text.length) { clearInterval(iv); return; }
      setOutput(t => t + text[i]);
      i++;
    }, speed);
    return () => clearInterval(iv);
  }, [trigger, text]);
  return output;
}

// ── Animated connection particle ──────────────────────────────────────────────
function FlowParticle({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <motion.div className="absolute w-2 h-2 rounded-full z-10"
      style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      initial={{ left: "0%", opacity: 0 }}
      animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, delay, ease: "linear", repeatDelay: 0.5 }} />
  );
}

// ── Log entry ─────────────────────────────────────────────────────────────────
const LOG_ENTRIES = [
  { type: "success", msg: "Batch job completed: 2,341 records processed",     time: "0.3s" },
  { type: "info",    msg: "LLM pipeline triggered — input: 4,200 tokens",     time: "0.8s" },
  { type: "success", msg: "Webhook dispatched to Slack #alerts",              time: "0.1s" },
  { type: "info",    msg: "RAG query matched 12 relevant documents",          time: "0.4s" },
  { type: "success", msg: "Auto-reply sent — sentiment: positive",            time: "0.2s" },
  { type: "info",    msg: "Cron trigger: daily_report_generation",            time: "0.0s" },
];

export default function AutomationFlowPreview() {
  const [activeStep, setActiveStep]  = useState(0);
  const [streaming,  setStreaming]   = useState(false);
  const [respIdx,    setRespIdx]     = useState(0);
  const [logs,       setLogs]        = useState(LOG_ENTRIES.slice(0, 3));
  const [logKey,     setLogKey]      = useState(0);
  const [processed,  setProcessed]   = useState(0);

  const streamText = useTokenStream(streaming, RESPONSES[respIdx]);

  // Cycle through pipeline steps
  useEffect(() => {
    const iv = setInterval(() => {
      setActiveStep(s => (s + 1) % 4);
      setProcessed(p => p + Math.floor(Math.random() * 120 + 40));
    }, 2000);
    return () => clearInterval(iv);
  }, []);

  // Trigger LLM streaming
  useEffect(() => {
    if (activeStep === 2) {
      setStreaming(false);
      setTimeout(() => {
        setRespIdx(r => (r + 1) % RESPONSES.length);
        setStreaming(true);
      }, 100);
    }
  }, [activeStep]);

  // Rotate logs
  useEffect(() => {
    const iv = setInterval(() => {
      const entry = LOG_ENTRIES[Math.floor(Math.random() * LOG_ENTRIES.length)];
      setLogs(prev => [entry, ...prev.slice(0, 2)]);
      setLogKey(k => k + 1);
    }, 2000);
    return () => clearInterval(iv);
  }, []);

  const nodes = [
    { id: 0, label: "Data Input",    sub: "APIs / CRMs / Webhooks",     icon: Database,     color: "#60a5fa" },
    { id: 1, label: "Preprocessing", sub: "Clean → Embed → Chunk",      icon: GitBranch,    color: "#a78bfa" },
    { id: 2, label: "AI Agent",      sub: "GPT-4o / Claude / Gemini",   icon: Bot,          color: "#2dd4bf" },
    { id: 3, label: "Auto Actions",  sub: "Notify / Report / Execute",  icon: Zap,          color: "#34d399" },
  ];

  return (
    <div className="w-full rounded-3xl overflow-hidden border border-white/8 bg-[#080808]">

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/6 bg-[#0d0d0d]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-teal-400/15 border border-teal-400/25 flex items-center justify-center">
            <Cpu size={14} className="text-teal-400" />
          </div>
          <div>
            <p className="text-white font-black text-sm uppercase tracking-tight">AI Pipeline Monitor</p>
            <p className="text-neutral-600 text-[9px] font-mono uppercase tracking-widest">Processing // Live</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <motion.div className="w-2 h-2 rounded-full bg-teal-400"
              animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }} />
            <span className="text-[9px] font-mono text-teal-400 uppercase tracking-widest">
              {processed.toLocaleString()} records processed
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-5">

        {/* ── Pipeline flow nodes ── */}
        <div className="relative">
          {/* Connector track */}
          <div className="absolute top-13 left-[12%] w-[76%] h-px bg-white/5 hidden md:block" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {nodes.map((node, i) => {
              const Icon  = node.icon;
              const isActive = activeStep === i;
              const isDone   = activeStep > i;
              return (
                <div key={node.id} className="flex flex-col items-center gap-3 relative">
                  {/* Connection particle between nodes */}
                  {i < nodes.length - 1 && (
                    <div className="absolute top-11 left-[60%] w-[80%] h-px hidden md:block overflow-visible">
                      <FlowParticle color={node.color} delay={i * 0.4} />
                    </div>
                  )}

                  {/* Node circle */}
                  <motion.div
                    animate={isActive ? {
                      boxShadow: [`0 0 0px ${node.color}00`, `0 0 30px ${node.color}60`, `0 0 0px ${node.color}00`],
                      scale: [1, 1.08, 1],
                    } : {}}
                    transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                    className="relative w-22 h-22 rounded-full border-2 flex items-center justify-center transition-all duration-500"
                    style={{
                      borderColor: isActive ? node.color : isDone ? `${node.color}60` : "rgba(255,255,255,0.08)",
                      background: isActive ? `${node.color}18` : isDone ? `${node.color}08` : "rgba(255,255,255,0.02)",
                    }}>

                    {/* Pulse ring for active */}
                    {isActive && (
                      <motion.div className="absolute inset-0 rounded-full"
                        animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        style={{ border: `1px solid ${node.color}` }} />
                    )}

                    <Icon size={28} style={{ color: isActive ? node.color : isDone ? `${node.color}80` : "rgba(255,255,255,0.2)" }} />

                    {/* Done checkmark */}
                    {isDone && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#080808] flex items-center justify-center">
                        <CheckCircle2 size={16} style={{ color: node.color }} />
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Label */}
                  <div className="text-center">
                    <p className="font-black text-sm uppercase tracking-tight"
                      style={{ color: isActive ? node.color : isDone ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)" }}>
                      {node.label}
                    </p>
                    <p className="text-[9px] text-neutral-600 font-light">{node.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom split: LLM output + Activity log ── */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* LLM streaming output */}
          <div className="p-5 rounded-2xl border border-teal-500/15 bg-teal-500/3">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={14} className="text-teal-400" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-teal-400">AI Response Stream</span>
              <motion.div className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-400"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.8, repeat: Infinity }} />
            </div>
            <div className="font-mono text-[11px] text-teal-300/80 leading-relaxed min-h-15">
              {streamText}
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.6, repeat: Infinity }}
                className="text-teal-400 font-black">▋</motion.span>
            </div>
            {/* Token counter */}
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/5">
              {[
                { label: "Tokens In",  val: "4,200" },
                { label: "Tokens Out", val: "1,840" },
                { label: "Latency",    val: "0.8s" },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-[8px] font-mono text-neutral-700 uppercase tracking-widest">{s.label}</p>
                  <p className="text-[10px] font-black text-teal-400">{s.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Activity log */}
          <div className="p-5 rounded-2xl border border-white/6 bg-white/2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-500">Pipeline Log</span>
              <motion.div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[8px] font-mono text-green-400 uppercase tracking-widest">Running</span>
              </motion.div>
            </div>
            <div className="flex flex-col gap-2">
              <AnimatePresence mode="popLayout">
                {logs.map((log, i) => (
                  <motion.div key={`${logKey}-${i}`}
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-start gap-2 py-1.5 border-b border-white/4 last:border-0">
                    {log.type === "success"
                      ? <CheckCircle2 size={11} className="text-green-400 mt-0.5 shrink-0" />
                      : <AlertCircle  size={11} className="text-blue-400 mt-0.5 shrink-0" />
                    }
                    <span className="text-[10px] text-neutral-400 font-light leading-tight flex-1">{log.msg}</span>
                    <span className="text-[8px] font-mono text-neutral-700 shrink-0">{log.time}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {/* Stats footer */}
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/5">
              <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                <motion.div className="h-full bg-green-400 rounded-full"
                  animate={{ width: ["0%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
              </div>
              <span className="text-[8px] font-mono text-neutral-700 uppercase tracking-widest shrink-0">Continuous</span>
            </div>
          </div>
        </div>

        {/* ── Bottom metrics strip ── */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Automations",  val: "24/7",    color: "#2dd4bf" },
            { label: "Saved/Month",  val: "~40%",    color: "#34d399" },
            { label: "Models Avail", val: "12+",     color: "#a78bfa" },
            { label: "Avg Latency",  val: "<1s",     color: "#f59e0b" },
          ].map((s, i) => (
            <div key={i} className="p-3 rounded-xl border border-white/6 bg-white/2 text-center">
              <p className="text-lg font-black tracking-tighter" style={{ color: s.color }}>{s.val}</p>
              <p className="text-[8px] font-black uppercase tracking-widest text-neutral-700 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}