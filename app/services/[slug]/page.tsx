import { notFound } from "next/navigation";
import ServiceDetailClient from "@/components/ServiceDetailClient";
import type { Service } from "@/components/ServiceDetailClient";

export const dynamicParams = false;

/* ===============================
   SERVICE DATA
=============================== */
const services: Record<string, Service> = {
  "website-development": {
    title: "Website Development",
    desc:
      "Modern, responsive, and high-performing websites that represent your brand and convert visitors into customers.",
    points: [
      "Custom website design",
      "Responsive & mobile-friendly layouts",
      "SEO-friendly structure",
      "Fast loading performance",
      "Secure & scalable architecture",
    ],
    illustration: "/illustrations/website.svg",
  },

  "custom-software": {
    title: "Custom Software Development",
    desc:
      "Tailor-made software solutions designed around your business workflows to automate operations and improve efficiency.",
    points: [
      "Business process automation",
      "CRM / ERP systems",
      "Admin dashboards",
      "API integrations",
    ],
    illustration: "/illustrations/saas.svg",
  },

  "mobile-app-development": {
    title: "Mobile App Development",
    desc:
      "High-performance mobile applications with intuitive UI/UX that engage users and support business goals.",
    points: [
      "Android & iOS apps",
      "Cross-platform development",
      "UI/UX design",
      "Performance optimization",
    ],
    illustration: "/illustrations/mobile.svg",
  },

  "ai-business-automation": {
    title: "AI & Business Automation Solutions",
    desc:
      "We help businesses automate repetitive tasks, streamline workflows, and improve decision-making using AI-powered automation systems.",
    points: [
      "Manual workflow automation",
      "AI chatbots & assistants",
      "CRM & internal tools",
      "Data processing & reporting",
      "Custom AI tools for operations",
    ],
    illustration: "/illustrations/ai.svg",
  },

  "support-maintenance": {
    title: "Support & Maintenance",
    desc:
      "Ongoing support and maintenance to keep your digital systems secure, optimized, and running smoothly.",
    points: [
      "Bug fixing",
      "Performance optimization",
      "Security updates",
      "Regular backups",
    ],
    illustration: "/illustrations/support.svg",
  },
};

/* ===============================
   STATIC PARAMS (REQUIRED)
=============================== */
export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({
    slug,
  }));
}

/* ===============================
   PAGE (IMPORTANT: ASYNC)
=============================== */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ THIS IS THE FIX

  const service = services[slug];

  if (!service) notFound();

  return <ServiceDetailClient service={service} />;
}
