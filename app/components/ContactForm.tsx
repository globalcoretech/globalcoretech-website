"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // ✅ IMPORTANT: store form reference immediately
    const form = e.currentTarget;

    setStatus("loading");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      form.reset(); // ✅ SAFE
      setStatus("success");
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        name="name"
        required
        placeholder="Your Name"
        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3
                   text-white placeholder:text-gray-400 outline-none
                   focus:border-teal-400"
      />

      <input
        type="email"
        name="email"
        required
        placeholder="Your Email"
        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3
                   text-white placeholder:text-gray-400 outline-none
                   focus:border-teal-400"
      />

      <textarea
        name="message"
        required
        rows={5}
        placeholder="Tell us about your project"
        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3
                   text-white placeholder:text-gray-400 outline-none
                   focus:border-teal-400"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-teal-400 py-3 font-medium text-black
                   transition hover:shadow-[0_0_30px_rgba(45,212,191,0.9)]
                   disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </button>

      {/* ✅ SUCCESS MESSAGE */}
      {status === "success" && (
        <p className="text-sm text-green-400">
          ✓ Message sent. We’ll be in touch.
        </p>
      )}

      {/* ❌ ERROR MESSAGE */}
      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}
