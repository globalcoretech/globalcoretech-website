import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us — GlobalCore Tech | Software Engineering Agency India",
  description:
    "Meet the team behind GlobalCore Tech. We are a software engineering agency from India, building zero-debt, scalable digital systems for startups and global enterprises. 150+ projects delivered.",
  alternates: { canonical: "https://globlcoretech.com/about" },
  openGraph: {
    title: "About GlobalCore Tech — We Build Systems That Win",
    description: "India-based software engineering agency. Zero-debt code, 99.99% uptime SLA, 150+ projects delivered across 8+ countries.",
    url: "https://globlcoretech.com/about",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}