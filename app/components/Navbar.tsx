"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-white/30 shadow-[0_6px_20px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-semibold text-lg text-black">
            Globalcore<span className="text-teal-500">Tech</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-700">
            <Link href="/" className="hover:text-teal-600">Home</Link>
            <Link href="/about" className="hover:text-teal-600">About</Link>
            <Link href="/services" className="hover:text-teal-600">Services</Link>
            <Link href="/contact" className="hover:text-teal-600">Contact</Link>
          </div>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex rounded-full px-4 py-2 text-sm bg-black text-white hover:bg-gray-800 transition"
          >
            Get Started
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 rounded-xl bg-white/80 backdrop-blur border border-white/40"
          >
            <Menu className="text-black" />
          </button>
        </nav>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div className="fixed inset-0 z-[200]">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white/85 backdrop-blur-2xl border-l border-white/30 shadow-2xl p-6 flex flex-col animate-slideIn">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg text-black">
                Globalcore<span className="text-teal-500">Tech</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-xl bg-white/60 border border-white/40"
              >
                <X />
              </button>
            </div>

            <div className="mt-10 flex flex-col gap-6 text-lg text-gray-800">
              <Link href="/" onClick={() => setOpen(false)}>Home</Link>
              <Link href="/about" onClick={() => setOpen(false)}>About</Link>
              <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
              <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
            </div>

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-auto rounded-full px-5 py-3 text-center bg-black text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
