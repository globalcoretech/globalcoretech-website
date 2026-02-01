"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "0213a441-64b4-49da-b9dc-983dc31fb041");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setSuccess(true);
      e.currentTarget.reset();
    } else {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
          Get in <span className="text-teal-500">Touch</span>
        </h2>

        <p className="mt-4 text-center text-gray-600">
          Tell us about your project and we’ll get back to you shortly.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <textarea
            name="message"
            required
            placeholder="Tell us about your project"
            rows={5}
            className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-black px-6 py-3 text-white font-medium hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && (
            <p className="text-center text-green-600">
              ✅ Message sent successfully!
            </p>
          )}

          {error && (
            <p className="text-center text-red-600">
              ❌ {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
