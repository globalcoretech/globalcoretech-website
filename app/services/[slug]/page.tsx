import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ServiceDetailClient from "../ServiceDetailClient";
import { servicesData } from "../../data/servicesData";

type Params = Promise<{ slug: string }>;

// ── Per-slug SEO metadata ─────────────────────────────────────────────────────
const SERVICE_META: Record<string, { title: string; description: string }> = {
  "web-apps": {
    title: "Web App & Website Development — Next.js 15, TypeScript | GlobalCore Tech",
    description:
      "High-performance web apps and websites built with Next.js 15 and TypeScript. Core Web Vitals optimized, SEO-first architecture, 99.99% uptime SLA. India's top web development agency.",
  },
  "ai-automation": {
    title: "AI Automation & LLM Integration Services | GlobalCore Tech",
    description:
      "Custom AI automation, LLM integration, RAG systems and intelligent agents for businesses. Reduce manual tasks by 80%. GPT-4, Claude, Gemini integration experts. India-based AI agency.",
  },
  "mobile-apps": {
    title: "Mobile App Development — React Native, iOS & Android | GlobalCore Tech",
    description:
      "Cross-platform iOS and Android mobile app development using React Native and Expo. 60fps performance, offline-first architecture, App Store optimized. India's top mobile agency.",
  },
  "saas-platforms": {
    title: "SaaS Platform Development — Multi-tenant, Stripe & Auth | GlobalCore Tech",
    description:
      "End-to-end SaaS platform development with multi-tenancy, Stripe billing, role-based access and analytics dashboard. Build your MRR product with GlobalCore Tech.",
  },
  "cloud-solutions": {
    title: "Cloud Infrastructure & DevOps Solutions | GlobalCore Tech",
    description:
      "AWS, GCP and Azure cloud infrastructure setup, Docker, Kubernetes, CI/CD pipelines and 99.99% uptime SLA. Zero-downtime migration and 24/7 monitoring by GlobalCore Tech.",
  },
};

/* ================= STATIC PATHS ================= */
export async function generateStaticParams() {
  const slugs = Object.keys(servicesData);
  console.log("Generating static params for:", slugs);
  return slugs.map((slug) => ({ slug }));
}

/* ================= DYNAMIC METADATA ================= */
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service  = servicesData[slug];

  if (!service) return { title: "Service Not Found | GlobalCore Tech" };

  // Per-slug meta agar hai toh use karo, warna service data se fallback
  const meta = SERVICE_META[slug] || {
    title: `${service.title} | GlobalCore Tech`,
    description: service.overview,
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://www.globlcoretech.com/services/${slug}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://www.globlcoretech.com/services/${slug}`,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.png"],
    },
  };
}

/* ================= PAGE COMPONENT ================= */
export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const service  = servicesData[slug];

  if (!service) {
    console.error(`Slug not found in servicesData: ${slug}`);
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}