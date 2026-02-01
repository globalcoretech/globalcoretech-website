"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-gray-400">
      
      {/* Trust Badges */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-semibold text-white">5+</p>
            <p className="mt-1 text-sm">Years Experience</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-white">20+</p>
            <p className="mt-1 text-sm">Projects Delivered</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-white">100%</p>
            <p className="mt-1 text-sm">Client Satisfaction</p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h3 className="text-lg font-semibold text-white">
            Globalcore<span className="text-teal-500">Tech</span>
          </h3>
          <p className="mt-4 text-sm leading-relaxed">
            We build scalable software and AI-powered solutions that help
            businesses grow with confidence.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/services" className="hover:text-white">Services</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy-policy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white">Terms & Conditions</a></li>
            </ul>
        </div>


        <div>
          <h4 className="text-sm font-semibold text-white mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            <li>Web & App Development</li>
            <li>Custom Software</li>
            <li>AI & Automation</li>
            <li>SaaS Products</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: info@globalcoretech.com</li>
            <li>Phone: +91 95893 00881</li>
            <li>India</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 text-center py-6 text-sm">
        © {new Date().getFullYear()} Globalcore Tech. All rights reserved.
      </div>
    </footer>
  );
}
