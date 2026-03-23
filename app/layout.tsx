import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseGlow from "@/components/MouseGlow";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"] });

// ── Root Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // ── Basic ──────────────────────────────────────────────────────────────────
  title: {
    default: "GlobalCore Tech — Web Development, AI Automation & SaaS Platforms",
    template: "%s | GlobalCore Tech",
  },
  description:
    "GlobalCore Tech builds high-performance web apps, mobile apps, AI automation systems and SaaS platforms for startups and enterprises. Based in India, serving globally. Get a free technical roadmap.",

  // ── Keywords ───────────────────────────────────────────────────────────────
  keywords: [
    "web development India",
    "AI automation agency",
    "SaaS development company",
    "mobile app development India",
    "Next.js development",
    "React Native app development",
    "software agency India",
    "startup tech partner",
    "GlobalCore Tech",
    "globlcoretech",
    "web app development Chhattisgarh",
    "software company Raipur",
    "LLM integration",
    "custom software development",
    "enterprise software India",
  ],

  // ── Authors & Publisher ────────────────────────────────────────────────────
  authors: [{ name: "GlobalCore Tech", url: "https://globlcoretech.com" }],
  creator: "GlobalCore Tech",
  publisher: "GlobalCore Tech",

  // ── Canonical ──────────────────────────────────────────────────────────────
  metadataBase: new URL("https://globlcoretech.com"),
  alternates: {
    canonical: "/",
  },

  // ── Open Graph ─────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://globlcoretech.com",
    siteName: "GlobalCore Tech",
    title: "GlobalCore Tech — Web Development, AI Automation & SaaS Platforms",
    description:
      "We build high-performance web apps, mobile apps, AI automation systems and SaaS platforms for startups and enterprises. India-based, globally trusted.",
    images: [
      {
        url: "/og-image.png", // 1200x630px image /public/og-image.png mein rakho
        width: 1200,
        height: 630,
        alt: "GlobalCore Tech — Engineering the Next Digital Epoch",
      },
    ],
  },

  // ── Twitter Card ───────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "GlobalCore Tech — Web Development, AI Automation & SaaS Platforms",
    description:
      "High-performance web apps, mobile apps, AI automation and SaaS platforms. India-based, globally trusted.",
    images: ["/og-image.png"],
    creator: "@globlcoretech",
  },

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Icons ─────────────────────────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // ── Verification (Google Search Console mein add karo) ────────────────────
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  // },

  // ── Category ──────────────────────────────────────────────────────────────
  category: "technology",
};

// ── Structured Data (JSON-LD) ─────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GlobalCore Tech",
  alternateName: "GloblcoreTech",
  url: "https://globlcoretech.com",
  logo: "https://globlcoretech.com/logo/logo.png",
  description:
    "GlobalCore Tech builds high-performance web apps, mobile apps, AI automation systems and SaaS platforms for startups and enterprises.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
    addressRegion: "Chhattisgarh",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@globlcoretech.com",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.linkedin.com/company/globalcoretech",
    "https://www.instagram.com/globlcoretech",
    "https://www.threads.net/@globlcoretech",
  ],
  serviceArea: {
    "@type": "GeoShape",
    description: "Worldwide",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software Development Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web App Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Automation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SaaS Platform Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cloud Solutions" } },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-[#0B0F0E] text-white antialiased overflow-x-hidden`}>
        <SmoothScroll />
        <MouseGlow />
        <Navbar />
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}