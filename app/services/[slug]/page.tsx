import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ServiceDetailClient from "../ServiceDetailClient";
import { servicesData } from "../../data/servicesData";

type Params = Promise<{
  slug: string;
}>;

/* ================= STATIC PARAMS ================= */
export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}

/* ================= METADATA ================= */
export async function generateMetadata(
  { params }: { params: Params }
): Promise<Metadata> {

  const { slug } = await params;   // ✅ FIXED

  const service = servicesData[slug];

  if (!service) {
    return {};
  }

  const baseUrl = "https://www.globlcoretech.com";
  const url = `${baseUrl}/services/${slug}`;
  const imageUrl = `${baseUrl}/og-images/${slug}.png`;

  return {
    title: `${service.title} | GlobalcoreTech`,
    description: service.overview,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: service.title,
      description: service.overview,
      url: url,
      siteName: "GlobalcoreTech",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.overview,
      images: [imageUrl],
    },
  };
}

/* ================= PAGE ================= */
export default async function ServiceDetailPage(
  { params }: { params: Params }
) {

  const { slug } = await params;   // ✅ FIXED

  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  const baseUrl = "https://www.globlcoretech.com";

  /* ================= SERVICE SCHEMA ================= */
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.overview,
    provider: {
      "@type": "Organization",
      name: "GlobalcoreTech",
      url: baseUrl,
    },
  };

  /* ================= BREADCRUMB SCHEMA ================= */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${baseUrl}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${baseUrl}/services/${slug}`,
      },
    ],
  };

  /* ================= FAQ SCHEMA ================= */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long does development take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most projects take between 4 to 12 weeks depending on complexity.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide ongoing support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide ongoing support, maintenance, and optimization.",
        },
      },
      {
        "@type": "Question",
        name: "Can the system scale as business grows?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we build scalable systems designed for long-term growth.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <ServiceDetailClient service={service} />
    </>
  );
}