import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ProcessSection from "@/components/home/ProcessSection";
import PartnerSection from "@/components/home/PartnerSection";
import RoadmapTeaser from "@/components/home/RoadmapTeaser";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    // yahan overflow-x-hidden rakha hai taki side scroll na ho, par upar-neeche makkhan chale
    <main className="relative bg-[#050505] w-full min-h-screen">
      <HeroSection />
      
      <div className="relative z-10 bg-[#050505]">
        <ServicesSection />
        <WhyChooseUs />
        <PartnerSection />
        <ProcessSection />
        <RoadmapTeaser />
        <CTASection />
      </div>
    </main>
  );
}