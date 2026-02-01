import Hero from "./components/Hero";
import Services from "./components/Services";
import CTA from "./components/CTA";
import WhyChooseUs from "./components/WhyChooseUs";
import Process from "./components/Process";
import ContactForm from "./components/ContactForm";
import HowWeHelp from "@/components/HowWeHelp";
import HowWeHelpTimeline from "@/components/HowWeHelpTimeline";





export default function Page() {
  return (
    <main>
      <Hero />
      <Services />
      <HowWeHelpTimeline/>
      <WhyChooseUs />
      <Process />
      <CTA />
    </main>
  );
}
