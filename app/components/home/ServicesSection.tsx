"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrainCircuit, Layout, Smartphone, BarChart3, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: "01", slug: "ai-automation", title: "AI", sub: "Architect",
    icon: BrainCircuit,
    desc: "Intelligent automation pipelines, LLM integrations, and AI-native products that work while you sleep.",
    tag: "Machine Intelligence",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=800",
    color: "#2dd4bf",
  },
  {
    id: "02", slug: "web-apps", title: "Web", sub: "Systems",
    icon: Layout,
    desc: "High-velocity web applications built on Next.js with zero-compromise performance and scalability.",
    tag: "Full-Stack Engineering",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800",
    color: "#a78bfa",
  },
  {
    id: "03", slug: "mobile-apps", title: "Mobile", sub: "Native",
    icon: Smartphone,
    desc: "Cross-platform mobile experiences that feel native, load instantly, and scale to millions of users.",
    tag: "React Native / Flutter",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800",
    color: "#f59e0b",
  },
  {
    id: "04", slug: "saas-platforms", title: "SaaS", sub: "Platforms",
    icon: BarChart3,
    desc: "End-to-end SaaS architecture — from auth and billing to analytics and multi-tenancy at enterprise scale.",
    tag: "Cloud-Native Architecture",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
    color: "#34d399",
  },
];

// 3D Visual per service
const ServiceVisual = ({ slug, Icon, color }: { slug: string; Icon: any; color: string }) => {
  return (
    <>
      {slug === "ai-automation" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute w-56 h-56 rounded-full border border-dashed opacity-20" style={{ borderColor: color }} />
          <div className="absolute w-36 h-36 rounded-full border opacity-30 flex items-center justify-center backdrop-blur-sm"
            style={{ borderColor: color, background: `${color}08`, boxShadow: `0 0 60px ${color}20` }}>
            <Icon size={52} style={{ color }} className="animate-pulse" />
          </div>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute w-2 h-2 rounded-full"
              style={{
                background: color,
                boxShadow: `0 0 12px ${color}`,
                top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 40}%`,
                left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 35}%`,
                opacity: 0.6,
              }} />
          ))}
        </div>
      )}
      {slug === "web-apps" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[85%] h-[75%] rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl p-5 flex flex-col shadow-2xl">
            <div className="flex gap-2 mb-4 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="flex gap-3 h-full overflow-hidden">
              <div className="w-1/3 h-full rounded-lg border flex items-center justify-center shrink-0"
                style={{ background: `${color}10`, borderColor: `${color}30` }}>
                <Icon size={32} style={{ color }} className="opacity-60" />
              </div>
              <div className="w-2/3 flex flex-col gap-2">
                <div className="w-full h-6 bg-white/10 rounded-md" />
                <div className="w-5/6 h-3 bg-white/5 rounded-full" />
                <div className="w-3/4 h-3 bg-white/5 rounded-full" />
                <div className="w-1/2 h-3 rounded-full mt-auto" style={{ background: `${color}30` }} />
              </div>
            </div>
          </div>
        </div>
      )}
      {slug === "mobile-apps" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-44 h-80 rounded-[2.5rem] border-[5px] border-white/10 bg-[#0a0a0a] flex flex-col items-center pt-3 overflow-hidden">
            <div className="w-16 h-4 rounded-full bg-black mb-4 z-10" />
            <Icon size={40} style={{ color }} className="mb-5 z-10" />
            <div className="grid grid-cols-2 gap-3 px-4 w-full z-10">
              <div className="h-16 rounded-xl border" style={{ background: `${color}20`, borderColor: `${color}30` }} />
              <div className="h-16 rounded-xl bg-white/5" />
              <div className="h-16 rounded-xl bg-white/5" />
              <div className="h-16 rounded-xl bg-white/5" />
            </div>
            <div className="absolute inset-0 blur-3xl opacity-10" style={{ background: color }} />
          </div>
        </div>
      )}
      {slug === "saas-platforms" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[85%] h-44 rounded-2xl border border-white/10 bg-white/3 flex items-end p-5 gap-3 backdrop-blur-md">
            {[40, 70, 45, 90, 60, 80].map((h, idx) => (
              <motion.div key={idx}
                animate={{ height: [`${h}%`, `${h - 15}%`, `${h}%`] }}
                transition={{ duration: 3 + idx * 0.5, repeat: Infinity }}
                className="flex-1 rounded-t-sm border-t"
                style={{ background: `linear-gradient(to top, ${color}40, ${color}10)`, borderColor: `${color}60` }}
              />
            ))}
          </div>
          <div className="absolute -bottom-6 -left-2 w-44 h-24 rounded-2xl border p-4 flex flex-col justify-between shadow-2xl backdrop-blur-xl"
            style={{ background: "#050505E0", borderColor: `${color}40`, boxShadow: `0 0 40px ${color}20` }}>
            <div className="flex justify-between items-center">
              <Icon size={20} style={{ color }} />
              <span className="text-xs font-bold" style={{ color }}>+24%</span>
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 w-14 bg-white/20 rounded-full" />
              <div className="h-4 w-20 rounded-full border" style={{ borderColor: `${color}40`, background: `${color}15` }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ParallaxVisualWrapper = ({ slug, Icon, color }: { slug: string; Icon: any; color: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const ry = useTransform(mx, [0, 500], [-12, 12]);
  const rx = useTransform(my, [0, 500], [12, -12]);
  const sry = useSpring(ry, { damping: 25, stiffness: 150 });
  const srx = useSpring(rx, { damping: 25, stiffness: 150 });

  return (
    <div ref={ref}
      onMouseMove={e => { const r = ref.current!.getBoundingClientRect(); mx.set(e.clientX - r.left); my.set(e.clientY - r.top); }}
      onMouseLeave={() => { mx.set(250); my.set(250); }}
      className="lg:col-span-5 relative w-full h-[60vh] hidden lg:flex items-center justify-center"
      style={{ perspective: "2000px" }}>
      <motion.div style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div className="absolute w-72 h-72 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ background: color }}
        />
        <motion.div
          animate={{ rotateY: [-8, 8, -8], rotateX: [4, -4, 4], y: [-15, 15, -15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full max-w-112.5 aspect-square"
          style={{ transformStyle: "preserve-3d" }}>
          <ServiceVisual slug={slug} Icon={Icon} color={color} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !triggerRef.current) return;
    const totalWidth = sectionRef.current.scrollWidth;
    const windowWidth = window.innerWidth;
    const tween = gsap.to(sectionRef.current, {
      x: () => -(totalWidth - windowWidth),
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true, scrub: 1,
        start: "top top",
        end: () => "+=" + totalWidth,
        invalidateOnRefresh: true,
      }
    });
    return () => tween.kill();
  }, { scope: triggerRef });

  return (
    <div ref={triggerRef} className="bg-[#050505] overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.04)_0%,transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      </div>

      <div ref={sectionRef} className="flex flex-nowrap h-screen w-fit relative z-10">
        {services.map((s, i) => (
          <section key={i} className="h-screen w-screen shrink-0 flex flex-col justify-center px-6 md:px-20 relative border-r border-white/5">

            {/* Service number watermark */}
            <div className="absolute top-8 right-8 font-black text-[20vw] leading-none select-none pointer-events-none"
              style={{ color: `${s.color}06` }}>
              {s.id}
            </div>

            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

              {/* LEFT */}
              <div className="lg:col-span-7 relative z-20">
                {/* Tag + id */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center border"
                    style={{ background: `${s.color}10`, borderColor: `${s.color}25` }}>
                    <s.icon size={22} style={{ color: s.color }} />
                  </div>
                  <div>
                    <span className="text-[9px] font-black tracking-[0.5em] uppercase block" style={{ color: s.color }}>Core Service</span>
                    <span className="text-neutral-600 text-[9px] font-bold">{s.id} // {s.tag}</span>
                  </div>
                </div>

                {/* Giant title */}
                <div className="mb-10">
                  <h2 className="text-[13vw] md:text-[9rem] font-black uppercase tracking-tighter leading-[0.8]">
                    <span className="text-white block">{s.title}</span>
                    <span className="block italic" style={{ color: s.color }}>{s.sub}</span>
                  </h2>
                </div>

                {/* Desc */}
                <div className="border-t border-white/[0.07] pt-8 max-w-lg">
                  <p className="text-neutral-500 text-lg font-light leading-relaxed mb-10">
                    {s.desc}
                  </p>
                  <Link href={`/services/${s.slug}`}>
                    <div className="group inline-flex items-center gap-5 pl-7 pr-4 py-4 rounded-full border border-white/10 hover:border-transparent transition-all duration-500 relative overflow-hidden cursor-pointer"
                      style={{ background: "rgba(255,255,255,0.03)" }}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: s.color }} />
                      <span className="relative z-10 text-white group-hover:text-black font-black tracking-[0.3em] uppercase text-[10px] transition-colors whitespace-nowrap">
                        Explore Technicals
                      </span>
                      <div className="relative z-10 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black/20 transition-all shrink-0">
                        <ArrowRight size={18} className="text-white group-hover:text-black transition-colors" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* RIGHT — 3D Visual */}
              <ParallaxVisualWrapper slug={s.slug} Icon={s.icon} color={s.color} />
            </div>

            {/* Bottom progress indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
              {services.map((_, j) => (
                <div key={j} className="h-px transition-all duration-500"
                  style={{ width: i === j ? "32px" : "12px", background: i === j ? s.color : "rgba(255,255,255,0.15)" }} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}