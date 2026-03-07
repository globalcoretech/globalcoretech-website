import React from 'react';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#0B0F0E] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Privacy <span className="text-teal-400">Policy</span>
        </h1>
        <p className="text-neutral-500 mb-12 italic">Last Updated: March 2026</p>
        
        <div className="space-y-10 text-neutral-400 leading-relaxed text-lg">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information Collection</h2>
            <p>At Globlcore Tech, we collect information you provide directly to us when you fill out a contact form, request a quote, or communicate with us. This may include:</p>
            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Name and Job Title</li>
              <li>Contact information including email address and phone number</li>
              <li>Project requirements and business details</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Use of Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services. Specifically, we use your data to:</p>
            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Respond to your comments, questions, and requests.</li>
              <li>Send you technical notices, updates, and support messages.</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Data Security</h2>
            <p>We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Third-Party Disclosure</h2>
            <p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, so long as those parties agree to keep this information confidential.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
            <p>You have the right to request a copy of the information we hold about you, to correct any inaccuracies, and in certain circumstances, to ask us to delete your personal data.</p>
          </section>

          <section className="pt-6 border-t border-white/10">
            <p>Questions about this policy? Reach out at: <span className="text-teal-400">contact@globlcoretech.com</span></p>
          </section>
        </div>
      </div>
    </main>
  );
}