"use client";

import { useState } from "react";

export default function ContactFormFramer() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

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
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-6"
    >
      <input
        type="text"
        name="name"
        required
        placeholder="Your name"
        className="w-full border-b border-gray-300 bg-transparent py-3 focus:outline-none focus:border-black"
      />

      <input
        type="email"
        name="email"
        required
        placeholder="Your email"
        className="w-full border-b border-gray-300 bg-transparent py-3 focus:outline-none focus:border-black"
      />

      <textarea
        name="message"
        required
        placeholder="Tell us about your project"
        rows={4}
        className="w-full border-b border-gray-300 bg-transparent py-3 focus:outline-none focus:border-black resize-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-sm font-medium text-white hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send message"}
      </button>

      <a
        href="https://wa.me/917879130175?text=Hi%20GlobalcoreTech,%20I%20visited%20your%20website%20and%20want%20to%20discuss%20a%20project."
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full border px-8 py-4 text-sm font-medium hover:bg-gray-50 transition">
            Chat on WhatsApp
      </a>

      {success && (
        <p className="text-green-600 text-sm mt-2">
          ✅ Message sent successfully
        </p>
      )}
    </form>
  );
}
