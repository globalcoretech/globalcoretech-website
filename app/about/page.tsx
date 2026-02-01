import AboutSections from "@/components/AboutSections";

export const metadata = {
  title: "About Us | GlobalcoreTech",
  description:
    "Learn about GlobalcoreTech — our mission, vision, and how we build scalable software & AI solutions.",
};

export default function AboutPage() {
  return (
    <main className="pt-28">
      {/* pt-28 = navbar ke neeche proper gap */}
      <AboutSections />
    </main>
  );
}
