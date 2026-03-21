"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Send, Sparkles, CheckCircle2, Loader2,
  MessageCircle, Terminal, ArrowRight,
  Mail, MapPin, Clock, ChevronDown
} from "lucide-react";
import BackgroundElements from "@/components/BackgroundElements";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Text Scramble ─────────────────────────────────────────────────────────────
function useScramble(text: string, trigger: boolean, delay = 0) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&";
  useEffect(() => {
    if (!trigger) return;
    const t = setTimeout(() => {
      let iter = 0;
      const iv = setInterval(() => {
        setDisplay(text.split("").map((c, i) =>
          c === " " || c === "'" || c === "." ? c
            : i < iter ? c
            : chars[Math.floor(Math.random() * chars.length)]
        ).join(""));
        if (iter >= text.length) clearInterval(iv);
        iter += 1.4;
      }, 32);
    }, delay);
    return () => clearTimeout(t);
  }, [trigger]);
  return display;
}

// ── Magnetic cursor ───────────────────────────────────────────────────────────
function MagneticCursor() {
  const cursorRef    = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot    = cursorDotRef.current;
    if (!cursor || !dot) return;
    let mx = 0, my = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", onMove);
    let raf: number;
    const tick = () => {
      cx += (mx - cx) * 0.11; cy += (my - cy) * 0.11;
      cursor.style.transform = `translate(${cx - 20}px,${cy - 20}px)`;
      dot.style.transform    = `translate(${mx - 3}px,${my - 3}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const grow   = () => gsap.to(cursor, { scale: 2.5, duration: 0.3 });
    const shrink = () => gsap.to(cursor, { scale: 1,   duration: 0.3 });
    document.querySelectorAll("a,button,input,textarea,select,.mag")
      .forEach(el => { el.addEventListener("mouseenter", grow); el.addEventListener("mouseleave", shrink); });
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={cursorRef}    className="fixed top-0 left-0 w-10 h-10 rounded-full border border-teal-400/60 pointer-events-none z-9999 mix-blend-difference hidden lg:block" />
      <div ref={cursorDotRef} className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-teal-400 pointer-events-none z-9999 hidden lg:block" />
    </>
  );
}

// ── Contact info items ────────────────────────────────────────────────────────
const contactInfo = [
  { icon: Mail,    label: "Email Us",      value: "contact@globlcoretech.com", sub: "Reply within 24h" },
  { icon: MapPin,  label: "Location",      value: "India",  sub: "Serving worldwide" },
  { icon: Clock,   label: "Working Hours", value: "Mon–Sat, 9AM–8PM IST",      sub: "Also available async" },
];

// ── Project types ─────────────────────────────────────────────────────────────
const projectTypes = [
  { value: "saas",    label: "SaaS Platform",         emoji: "⚡" },
  { value: "mobile",  label: "Mobile Development",    emoji: "📱" },
  { value: "web",     label: "Web Apps & Website",    emoji: "💻" },
  { value: "ai",      label: "AI & Automation",       emoji: "🤖" },
  { value: "other",   label: "Something Else",        emoji: "🚀" },
];

// ── Budget ranges ─────────────────────────────────────────────────────────────
const budgets = ["< ₹50K", "₹50K–₹2L", "₹2L–₹10L", "₹10L+", "Let's Discuss"];

export default function ContactPage() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const formCardRef   = useRef<HTMLDivElement>(null);
  const [ready,        setReady]       = useState(false);
  const [isSubmitting, setIsSubmitting]= useState(false);
  const [isSuccess,    setIsSuccess]   = useState(false);
  const [userName,     setUserName]    = useState("");
  const [selectedType, setSelectedType]= useState("saas");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [activeField,  setActiveField] = useState<string | null>(null);

  // scramble lines
  const s1 = useScramble("Let's build", ready, 100);
  const s2 = useScramble("Epic", ready, 400);
  const s3 = useScramble("stuff.", ready, 700);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  // GSAP animations
  useGSAP(() => {
    // Left column reveal
    gsap.fromTo(".contact-badge",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.7, delay: 0.2, ease: "back.out(1.7)" }
    );
    gsap.fromTo(".contact-headline .line",
      { y: "110%", opacity: 0 },
      { y: "0%", opacity: 1, stagger: 0.12, duration: 1.3, delay: 0.3, ease: "expo.out" }
    );
    gsap.fromTo(".contact-sub",
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 1, delay: 0.9, ease: "power3.out" }
    );
    gsap.fromTo(".contact-info-item",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, stagger: 0.12, duration: 0.9, delay: 1.0, ease: "power3.out" }
    );
    gsap.fromTo(".whatsapp-btn",
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 1.3, ease: "back.out(1.5)" }
    );

    // Form card entrance
    gsap.fromTo(formCardRef.current,
      { opacity: 0, x: 60, scale: 0.96 },
      { opacity: 1, x: 0, scale: 1, duration: 1.3, delay: 0.5, ease: "expo.out" }
    );

    // Mouse tilt on form card
    const card = formCardRef.current;
    if (card) {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / r.width * 8;
        const y = (e.clientY - r.top - r.height / 2) / r.height * 8;
        gsap.to(card, { rotateY: x, rotateX: -y, duration: 0.8, ease: "power2.out", transformPerspective: 1200 });
      };
      const onLeave = () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "power2.out" });
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name") as string;
    setUserName(name);
    fd.append("access_key", "650d040a-bec6-4040-9c9a-5c4efcf1c00c");
    fd.append("project_type", selectedType);
    fd.append("budget", selectedBudget);

    const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd }).then(r => r.json());
    if (res.success) { setIsSuccess(true); setIsSubmitting(false); }
    else { setIsSubmitting(false); alert("Something went wrong. Please try again."); }
  }

  return (
    <>
      <MagneticCursor />

      <main className="min-h-screen bg-[#020202] pt-28 pb-20 relative overflow-hidden text-white">
        <BackgroundElements />

        {/* ── Ambient orbs ── */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-15%] left-[-5%]  w-[55vw] h-[55vw] rounded-full bg-teal-500/5.5 blur-[140px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-violet-500/4 blur-[160px]" />
        </div>

        {/* ── Noise grain ── */}
        <div className="fixed inset-0 z-1 pointer-events-none opacity-[0.035]"
          style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize:"128px" }} />

        {/* ── Vertical column lines ── */}
        <div className="absolute inset-0 pointer-events-none hidden lg:grid grid-cols-12 opacity-[0.025] z-1">
          {Array.from({length:13}).map((_,i)=><div key={i} className="border-l border-white h-full"/>)}
        </div>

        <div ref={containerRef} className="max-w-7xl mx-auto px-6 relative z-10">

          {/* ── TOP LABEL ── */}
          <div className="mb-20">
            <div className="contact-badge inline-flex items-center gap-3 px-5 py-2 rounded-full border border-teal-500/25 bg-teal-500/6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <Terminal size={11} className="text-teal-400" />
              <span className="text-teal-400 text-[9px] font-black tracking-[0.6em] uppercase">Contact // Initiate_Project</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

            {/* ════════════════════════════════════════
                LEFT COLUMN
            ════════════════════════════════════════ */}
            <div className="lg:col-span-5 flex flex-col gap-12">

              {/* Giant headline */}
              <div className="contact-headline">
                <div className="overflow-hidden mb-1">
                  <h1 className="line text-[13vw] md:text-[7vw] font-light tracking-tighter leading-[0.85] text-white uppercase">
                    {s1}
                  </h1>
                </div>
                <div className="overflow-hidden mb-1">
                  <h1 className="line text-[13vw] md:text-[7vw] font-black tracking-tighter leading-[0.85] italic text-teal-400" style={{ fontFamily:"Georgia,serif" }}>
                    {s2}
                  </h1>
                </div>
                <div className="overflow-hidden">
                  <h1 className="line text-[13vw] md:text-[7vw] font-black tracking-tighter leading-[0.85] uppercase text-white">
                    {s3}
                  </h1>
                </div>
              </div>

              {/* Sub */}
              <p className="contact-sub text-neutral-500 text-lg md:text-xl font-light max-w-sm leading-relaxed border-l-2 border-teal-500/30 pl-6">
                Stop settling for average. Let's engineer a system that dominates your niche and compounds over time.
              </p>

              {/* Contact info tiles */}
              <div className="flex flex-col gap-3">
                {contactInfo.map((item, i) => (
                  <div key={i}
                    className="contact-info-item group flex items-center gap-5 p-5 rounded-2xl border border-white/6 bg-white/2 hover:border-teal-500/20 hover:bg-teal-500/3 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon size={16} className="text-teal-400" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-600 mb-0.5">{item.label}</p>
                      <p className="text-white font-bold text-sm">{item.value}</p>
                      <p className="text-neutral-600 text-[9px] font-light">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp */}
              <a href="https://wa.me/+917879130175" target="_blank" rel="noreferrer"
                className="whatsapp-btn mag group relative overflow-hidden inline-flex items-center gap-5 p-6 rounded-2xl border border-white/8 bg-white/2 hover:border-[#25D366]/40 transition-all duration-500">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at left, rgba(37,211,102,0.06) 0%, transparent 70%)" }} />
                <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-[0_0_24px_rgba(37,211,102,0.35)] group-hover:scale-110 transition-transform shrink-0">
                  <MessageCircle size={26} fill="currentColor" />
                </div>
                <div className="relative z-10">
                  <p className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.4em] mb-1">WhatsApp Direct</p>
                  <p className="text-white font-black text-lg">Chat with us</p>
                  <p className="text-neutral-600 text-[10px] font-light mt-0.5">Usually replies in minutes</p>
                </div>
                <ArrowRight size={18} className="text-neutral-700 group-hover:text-[#25D366] group-hover:translate-x-1 transition-all ml-auto" />
              </a>


            </div>

            {/* ════════════════════════════════════════
                RIGHT COLUMN — FORM CARD
            ════════════════════════════════════════ */}
            <div className="lg:col-span-7">
              <div ref={formCardRef}
                className="relative rounded-[2.5rem] border border-white/8 overflow-hidden"
                style={{ background: "#0b0b0b", boxShadow: "0 40px 100px rgba(0,0,0,0.7)" }}>

                {/* Top decorative image strip */}
                <div className="relative h-28 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1200"
                    alt="Contact visual"
                    className="w-full h-full object-cover grayscale opacity-30"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#0b0b0b]" />
                  {/* Teal border line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-teal-500/30" />
                  {/* Card header label */}
                  <div className="absolute top-5 left-8 inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                    <span className="font-mono text-[9px] text-teal-400 uppercase tracking-[0.5em]">Project_Intake_Form</span>
                  </div>
                  <div className="absolute top-5 right-8 font-mono text-[9px] text-white/20 uppercase tracking-widest">v4.0</div>
                </div>

                {/* Form body */}
                <div className="p-8 md:p-12">
                  <AnimatePresence mode="wait">
                    {!isSuccess ? (
                      <motion.form key="form"
                        exit={{ opacity: 0, scale: 0.97, y: -10 }}
                        onSubmit={handleSubmit}
                        className="space-y-7">

                        {/* Name + Email row */}
                        <div className="grid md:grid-cols-2 gap-5">
                          {["name","email"].map(field => (
                            <div key={field} className="relative">
                              <input
                                name={field} required
                                type={field === "email" ? "email" : "text"}
                                placeholder={field === "name" ? "Your Name" : "Your Email"}
                                onFocus={() => setActiveField(field)}
                                onBlur={() => setActiveField(null)}
                                className="w-full bg-white/3 border border-white/8 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-neutral-600 text-base transition-all duration-300 focus:border-teal-500/50 focus:bg-teal-500/3"
                              />
                              {activeField === field && (
                                <motion.div initial={{scaleX:0}} animate={{scaleX:1}}
                                  className="absolute bottom-0 left-4 right-4 h-px bg-teal-400/60 origin-left" />
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Project type — custom pills */}
                        <div>
                          <label className="text-[9px] font-black uppercase tracking-[0.4em] text-teal-400/60 block mb-4">
                            What are we building?
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {projectTypes.map(pt => (
                              <button key={pt.value} type="button"
                                onClick={() => setSelectedType(pt.value)}
                                className={`px-4 py-2 rounded-xl border text-[11px] font-black uppercase tracking-wider transition-all duration-300 ${
                                  selectedType === pt.value
                                    ? "border-teal-500/50 bg-teal-500/10 text-teal-400"
                                    : "border-white/[0.07] bg-white/2 text-neutral-500 hover:border-white/20 hover:text-white"
                                }`}>
                                {pt.emoji} {pt.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Budget */}
                        <div>
                          <label className="text-[9px] font-black uppercase tracking-[0.4em] text-teal-400/60 block mb-4">
                            Estimated Budget
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {budgets.map(b => (
                              <button key={b} type="button"
                                onClick={() => setSelectedBudget(b)}
                                className={`px-4 py-2 rounded-xl border text-[11px] font-black uppercase tracking-wider transition-all duration-300 ${
                                  selectedBudget === b
                                    ? "border-violet-500/50 bg-violet-500/10 text-violet-400"
                                    : "border-white/[0.07] bg-white/2 text-neutral-500 hover:border-white/20 hover:text-white"
                                }`}>
                                {b}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Message */}
                        <div className="relative">
                          <textarea name="message" required rows={4}
                            placeholder="Tell us about your project — goals, timeline, current tech stack..."
                            onFocus={() => setActiveField("msg")}
                            onBlur={() => setActiveField(null)}
                            className="w-full bg-white/3 border border-white/8 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-neutral-600 text-base resize-none transition-all duration-300 focus:border-teal-500/50 focus:bg-teal-500/3"
                          />
                          {activeField === "msg" && (
                            <motion.div initial={{scaleX:0}} animate={{scaleX:1}}
                              className="absolute bottom-0 left-4 right-4 h-px bg-teal-400/60 origin-left" />
                          )}
                        </div>

                        {/* Submit */}
                        <button disabled={isSubmitting}
                          className="mag w-full group relative overflow-hidden bg-teal-400 text-black font-black uppercase tracking-[0.2em] text-[11px] py-5 rounded-2xl hover:bg-white transition-all duration-300 flex items-center justify-center gap-4 active:scale-[0.98] disabled:opacity-50 shadow-[0_16px_40px_rgba(45,212,191,0.2)] hover:shadow-[0_20px_50px_rgba(45,212,191,0.3)]">
                          {isSubmitting
                            ? <><Loader2 size={18} className="animate-spin" /> Processing...</>
                            : <><span>Initiate Project</span><Send size={16} className="group-hover:translate-x-1 transition-transform" /></>
                          }
                        </button>

                        {/* Bottom note */}
                        <p className="text-center text-[9px] text-neutral-700 font-light uppercase tracking-widest">
                          We reply within 24 hours • No spam ever
                        </p>
                      </motion.form>

                    ) : (
                      <motion.div key="success"
                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
                        className="flex flex-col items-center justify-center text-center py-16 gap-6">

                        {/* Success ring animation */}
                        <div className="relative">
                          <div className="w-24 h-24 rounded-full bg-teal-400/10 flex items-center justify-center shadow-[0_0_60px_rgba(45,212,191,0.2)]">
                            <CheckCircle2 size={48} className="text-teal-400" />
                          </div>
                          <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 rounded-full border border-teal-400/30"
                          />
                        </div>

                        <div>
                          <h2 className="text-4xl font-black tracking-tighter italic capitalize mb-3 text-teal-400" style={{ fontFamily:"Georgia,serif" }}>
                            {userName}, We got it! 🚀
                          </h2>
                          <p className="text-neutral-500 max-w-xs leading-relaxed text-sm">
                            Your project brief has been received. Our team will reach out within <span className="text-white font-bold">24 hours</span> with a scoping call invite.
                          </p>
                        </div>

                        <div className="flex flex-col items-center gap-3 pt-4">
                          <p className="text-[9px] font-mono text-neutral-700 uppercase tracking-widest">Meanwhile, explore our work</p>
                          <div className="flex items-center gap-4">
                            <a href="/services" className="px-5 py-2.5 rounded-xl border border-white/10 text-white text-[10px] font-black uppercase tracking-wider hover:border-teal-500/30 transition-colors">
                              Our Services
                            </a>
                            <button onClick={() => setIsSuccess(false)}
                              className="px-5 py-2.5 rounded-xl bg-white/4 border border-white/[0.07] text-neutral-500 text-[10px] font-black uppercase tracking-wider hover:text-white transition-colors">
                              Send Another
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom decorative line ── */}
          <div className="mt-20 h-px w-full bg-linear-to-r from-transparent via-white/6 to-transparent" />
        </div>

        <style jsx global>{`
          * { cursor: none !important; }
          input, textarea, select { cursor: none !important; }
        `}</style>
      </main>
    </>
  );
}