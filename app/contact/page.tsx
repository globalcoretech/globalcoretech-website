import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
title: "Contact Us | Globalcore Tech",
description: "Get in touch with Globalcore Tech for scalable software, web development, and AI-powered automation solutions.",
};

export default function ContactPage() {
return <ContactClient />;
}