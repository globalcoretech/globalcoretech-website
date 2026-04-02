import type { Metadata } from "next";
import ContactPage from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — Start Your Project | GlobalCore Tech",
  description:
    "Get in touch with GlobalCore Tech. Share your project idea and get a technical scoping call within 24 hours. No spam, no fluff — just clarity. Email or WhatsApp us today.",
  alternates: { canonical: "https://www.globlcoretech.com/contact" },
  openGraph: {
    title: "Contact GlobalCore Tech — Start Your Project Today",
    description: "Start your project with GlobalCore Tech. 24-hour response guarantee.",
    url: "https://www.globlcoretech.com/contact",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Contact() {
  return <ContactPage />;
}