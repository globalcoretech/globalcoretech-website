import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services — Web Apps, AI Automation, Mobile & SaaS | GlobalCore Tech",
  description:
    "GlobalCore Tech offers web app development, AI automation, mobile app development, SaaS platform engineering and cloud solutions. High-performance systems built for scale with zero technical debt.",
  alternates: { canonical: "https://www.globlcoretech.com/services" },
  openGraph: {
    title: "Services — Web, AI, Mobile & SaaS | GlobalCore Tech",
    description: "Four core service pillars: Web Development, AI Automation, Mobile Apps, SaaS Platforms. Built for extreme performance and zero technical debt.",
    url: "https://www.globlcoretech.com/services",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}