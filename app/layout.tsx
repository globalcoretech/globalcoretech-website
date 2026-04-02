// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseGlow from "@/components/MouseGlow";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "GlobalCore Tech — Web Development, AI Automation & SaaS Platforms",
    template: "%s | GlobalCore Tech",
  },
  description:
    "GlobalCore Tech builds high-performance web apps, mobile apps, AI automation systems and SaaS platforms for startups and enterprises. Based in India, serving globally. Get a free technical roadmap.",

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
    "globalcoretech",
    "web app development Chhattisgarh",
    "software company Raipur",
    "LLM integration",
    "custom software development",
    "enterprise software India",
  ],

  authors: [{ name: "GlobalCore Tech", url: "https://www.globlcoretech.com" }],
  creator: "GlobalCore Tech",
  publisher: "GlobalCore Tech",

  metadataBase: new URL("https://www.globlcoretech.com"),
  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.globlcoretech.com",
    siteName: "GlobalCore Tech",
    title: "GlobalCore Tech — Web Development, AI Automation & SaaS Platforms",
    description:
      "We build high-performance web apps, mobile apps, AI automation systems and SaaS platforms for startups and enterprises. India-based, globally trusted.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GlobalCore Tech — Engineering the Next Digital Epoch",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "GlobalCore Tech — Web Development, AI Automation & SaaS Platforms",
    description:
      "High-performance web apps, mobile apps, AI automation and SaaS platforms. India-based, globally trusted.",
    images: ["/og-image.png"],
    creator: "@globalcoretech",
  },

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

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  category: "technology",
};

// Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GlobalCore Tech",
  alternateName: "GlobalCoreTech",
  url: "https://www.globlcoretech.com",
  logo: "https://www.globlcoretech.com/logo/logo.png",
  description:
    "GlobalCore Tech builds high-performance web apps, mobile apps, AI automation systems and SaaS platforms for startups and enterprises.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
    addressRegion: "Chhattisgarh",
    addressLocality: "Raipur",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@globalcoretech.com",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.linkedin.com/company/globalcoretech",
    "https://www.instagram.com/globalcoretech",
    "https://www.threads.net/@globalcoretech",
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

// WebSite Schema — Google Sitelinks + Search ke liye
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GlobalCore Tech",
  url: "https://www.globlcoretech.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.globlcoretech.com/?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

// LocalBusiness Schema — India SEO ke liye
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "GlobalCore Tech",
  image: "https://www.globlcoretech.com/logo/logo.png",
  url: "https://www.globlcoretech.com",
  telephone: "",
  address: {
    "@type": "PostalAddress",
    streetAddress: "",
    addressLocality: "Raipur",
    addressRegion: "Chhattisgarh",
    postalCode: "492001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 21.2514,
    longitude: 81.6296,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "$$$",
  servesCuisine: "",
  areaServed: "Worldwide",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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