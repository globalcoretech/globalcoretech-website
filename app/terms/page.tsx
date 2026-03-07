import React from 'react';

export default function TermsConditions() {
  return (
    <main className="min-h-screen bg-[#0B0F0E] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Terms & <span className="text-teal-400">Conditions</span>
        </h1>
        <p className="text-neutral-500 mb-12 italic">Effective Date: March 2026</p>
        
        <div className="space-y-10 text-neutral-400 leading-relaxed text-lg">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
            <p>By accessing or using the Globlcore Tech website, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Intellectual Property Rights</h2>
            <p>Unless otherwise indicated, the website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio) are owned by Globlcore Tech and are protected by international copyright and trademark laws.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. User Obligations</h2>
            <p>You agree not to use the website for any purpose that is unlawful or prohibited by these Terms. You may not use the website in any manner that could damage, disable, overburden, or impair any Globlcore Tech server.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Limitation of Liability</h2>
            <p>In no event shall Globlcore Tech, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, or other intangible losses, resulting from your access to or use of the service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Disclaimer</h2>
            <p>Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.</p>
          </section>

          <section className="pt-6 border-t border-white/10">
            <p>For legal inquiries: <span className="text-teal-400">legal@globlcoretech.com</span></p>
          </section>
        </div>
      </div>
    </main>
  );
}