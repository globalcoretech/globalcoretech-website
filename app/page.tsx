import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ProcessSection from "@/components/home/ProcessSection";
import PartnerSection from "@/components/home/PartnerSection";
import CTASection from "@/components/home/CTASection";

export const metadata = {
title: "GlobalcoreTech | Premium Software & AI Solutions",
description:
"We design and build premium software, AI automation, and scalable digital products for startups and enterprises.",
};

export default function HomePage() {
return (
<div className="relative bg-[#0B0F0E] selection:bg-teal-500/30 font-sans text-white overflow-hidden">
  <HeroSection />
  <ServicesSection />
  <PartnerSection />
  <ProcessSection />
  <CTASection />
</div>
);
}