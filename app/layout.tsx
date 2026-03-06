import type { Metadata } from "next"; 
import { Plus_Jakarta_Sans } from "next/font/google";
import "./global.css";
import SmoothScroll from "./components/SmoothScroll";
import SafeFloating from "./components/SafeFloating";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// 1. GLOBAL SEO METADATA SECTION
export const metadata: Metadata = {
  title: {
    default: "Globlcore Tech | Premium Software Engineering Agency",
    template: "%s | Globlcore Tech"
  },
  description: "Globlcore Tech builds high-performance SaaS, AI Automation, and Web Applications. Engineering excellence for modern startups.",
  keywords: ["SaaS Development", "AI Automation", "Software Agency", "Web Development", "Mobile Apps", "Globlcore Tech"],
  icons: {
    icon: "/logo/logo.png", 
  },
  verification: {
    google: "U_96KA88lGZz-j9eK9JRcPvtN9ZvMyakrrQwQAQ9R5E", 
  },
  openGraph: {
    title: "Globlcore Tech | Engineering Excellence",
    description: "Transforming ideas into scalable digital products.",
    url: "https://www.globlcoretech.com",
    siteName: "Globlcore Tech",
    images: [
      {
        url: "https://www.globlcoretech.com/og-image.png", // Make sure this image exists in your public folder
        width: 1200,
        height: 630,
        alt: "Globlcore Tech Agency Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Globlcore Tech | Premium Software Agency",
    description: "AI Automation & SaaS Development Experts",
    images: ["https://www.globlcoretech.com/og-image.png"],
  },
};

// Font setup
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaDomain = "https://www.globlcoretech.com";
  
  return (
    <html lang="en">
      <body className={`${jakarta.className} relative bg-[#0B0F0E] text-white`}>
        <div className="pointer-events-none fixed inset-0 z-0">
          <SafeFloating />
        </div>

        <div className="relative z-10">
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
          </SmoothScroll>
        </div>

        {/* SEO SCHEMA - ORGANIZATION */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GloblcoreTech",
              url: schemaDomain,
              logo: `${schemaDomain}/logo/logo.png`,
              founder: {
                "@type": "Person",
                name: "Umesh Yadav",
              },
              sameAs: [
                "https://www.linkedin.com/company/globalsparks-tech/",
                "https://www.instagram.com/globalcoretechh?igsh=MXFjMmx0bWk0cWppZg=="
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                email: "contact@globlcoretech.com"
              }
            }),
          }}
        />

        {/* SEO SCHEMA - WEBSITE */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "GloblcoreTech",
              url: schemaDomain,
              potentialAction: {
                "@type": "SearchAction",
                target: `${schemaDomain}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </body>
    </html>
  );
}