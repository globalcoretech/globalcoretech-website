import type { Metadata } from "next";
import RoadmapGenerator from "./RoadmapGenerator";

export const metadata: Metadata = {
  title: "Free Tech Roadmap Generator | Get Your Project Blueprint | GlobalCore Tech",
  description:
    "Describe your product idea and get a free custom technical roadmap, recommended tech stack and timeline estimate in seconds. No sign-up required. Built by GlobalCore Tech.",
  alternates: { canonical: "https://globlcoretech.com/roadmap-generator" },
  openGraph: {
    title: "Free Tech Roadmap Generator | GlobalCore Tech",
    description:
      "Get a custom technical roadmap for your product idea in seconds. Free, no sign-up required.",
    url: "https://globlcoretech.com/roadmap-generator",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "GlobalCore Tech Roadmap Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Tech Roadmap Generator | GlobalCore Tech",
    description: "Get a custom technical roadmap for your product idea in seconds. Free, no sign-up.",
    images: ["/og-image.png"],
  },
};

export default function RoadmapPage() {
  return <RoadmapGenerator />;
}