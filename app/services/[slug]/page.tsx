import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ServiceDetailClient from "../ServiceDetailClient";
import { servicesData } from "../../data/servicesData";

// Next.js 15 Requirement: Params ko Promise define karna padta hai
type Params = Promise<{ slug: string }>;

/* ================= STATIC PATHS ================= */
// Ye function Next.js ko batata hai ki build ke time kaunse pages banane hain
export async function generateStaticParams() {
  const slugs = Object.keys(servicesData);
  console.log("Generating static params for:", slugs); // Terminal mein check karo
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

/* ================= DYNAMIC METADATA ================= */
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | GlobalcoreTech`,
    description: service.overview,
  };
}

/* ================= PAGE COMPONENT ================= */
export default async function ServiceDetailPage({ params }: { params: Params }) {
  // 1. Params ko await karo (Next.js 15 Rule)
  const { slug } = await params;
  
  // 2. Data fetch logic - directly object se uthao
  const service = servicesData[slug];

  // 3. Agar slug nahi mila, toh 404 dikhao
  if (!service) {
    console.error(`Slug not found in servicesData: ${slug}`);
    notFound();
  }

  return (
    <>
      {/* Client Component ko data pass kar rahe hain */}
      <ServiceDetailClient service={service} />
    </>
  );
}