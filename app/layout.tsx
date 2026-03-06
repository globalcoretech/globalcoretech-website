import type { Metadata } from "next"; // Added Metadata type
import { Plus_Jakarta_Sans } from "next/font/google";
import "./global.css";
import SmoothScroll from "./components/SmoothScroll";
import SafeFloating from "./components/SafeFloating";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// 1. GLOBAL SEO METADATA SECTION
export const metadata: Metadata = {
  title: {
    default: "Globalcore Tech | Premium Software Engineering Agency",
    template: "%s | Globalcore Tech"
  },
  description: "Globalcore Tech builds high-performance SaaS, AI Automation, and Web Applications. Engineering excellence for modern startups.",
  keywords: ["SaaS Development", "AI Automation", "Software Agency", "Web Development", "Mobile Apps", "Globalcore Tech"],
  icons: {
    icon: "/logo/logo.png", // Browser tab icon ka path
  },
  openGraph: {
    title: "Globalcore Tech | Engineering Excellence",
    description: "Transforming ideas into scalable digital products.",
    url: "https://www.globalcoretech.com",
    siteName: "Globalcore Tech",
    locale: "en_US",
    type: "website",
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
  return (
    <html lang="en">
      <body className={`${jakarta.className} relative bg-[#0B0F0E] text-white`}>
        {/* CLIENT SAFE FLOATING BACKGROUND */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <SafeFloating />
        </div>

        {/* MAIN CONTENT */}
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
              name: "GlobalcoreTech",
              url: "https://www.globalcoretech.com",
              logo: "https://globalcoretech.com/logo/logo.png",
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
                email: "contact@globalcoretech.com"
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
              name: "GlobalcoreTech",
              url: "https://www.globalcoretech.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.globalcoretech.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </body>
    </html>
  );
}