export default function TermsAndConditions() {
  return (
    <main className="bg-white">
      {/* Header */}
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="text-4xl font-bold text-gray-900">
            Terms &{" "}
            <span className="text-teal-500">Conditions</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Please read these terms carefully before using our website or
            services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="space-y-12 text-gray-700 leading-relaxed">
          {/* Introduction */}
          <p>
            By accessing or using the <strong>Globalcore Tech</strong> website,
            you agree to be bound by these Terms and Conditions. If you do not
            agree with any part of these terms, please do not use our website
            or services.
          </p>

          {/* Use of Website */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Use of Website
            </h2>
            <p className="mt-4">
              The content provided on this website is for general informational
              purposes only. We reserve the right to modify, update, or remove
              any content without prior notice.
            </p>
            <p className="mt-4">
              You agree not to misuse the website or attempt to access
              restricted areas, systems, or data without authorization.
            </p>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Services
            </h2>
            <p className="mt-4">
              Globalcore Tech provides software development, consulting, and
              related technology services. Any service engagement is subject
              to a separate agreement, proposal, or contract.
            </p>
          </div>

          {/* Intellectual Property */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Intellectual Property
            </h2>
            <p className="mt-4">
              All content on this website, including text, graphics, logos,
              and designs, is the property of Globalcore Tech unless stated
              otherwise. Unauthorized use, reproduction, or distribution is
              strictly prohibited.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Limitation of Liability
            </h2>
            <p className="mt-4">
              Globalcore Tech shall not be liable for any direct, indirect,
              incidental, or consequential damages arising from the use or
              inability to use this website or related services.
            </p>
          </div>

          {/* Third-Party Links */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Third-Party Links
            </h2>
            <p className="mt-4">
              This website may contain links to third-party websites. We are
              not responsible for the content, policies, or practices of
              any third-party sites.
            </p>
          </div>

          {/* Changes to Terms */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Changes to These Terms
            </h2>
            <p className="mt-4">
              We reserve the right to update or modify these Terms and
              Conditions at any time. Continued use of the website after
              changes implies acceptance of the revised terms.
            </p>
          </div>

          {/* Governing Law */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Governing Law
            </h2>
            <p className="mt-4">
              These terms shall be governed and interpreted in accordance
              with the laws of India.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Contact Information
            </h2>
            <p className="mt-4">
              If you have any questions regarding these Terms and Conditions,
              please contact us at:
            </p>
            <p className="mt-2 font-medium text-gray-900">
              📧 contact@globlcoretech.com
            </p>
          </div>

          {/* Footer Note */}
          <div className="border-t pt-8 text-sm text-gray-500">
            <p>
              By using this website, you acknowledge that you have read,
              understood, and agreed to these Terms and Conditions.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
