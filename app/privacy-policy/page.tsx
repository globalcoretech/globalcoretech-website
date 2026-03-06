export default function PrivacyPolicy() {
  return (
    <main className="bg-white">
      {/* Header Section */}
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="text-4xl font-bold text-gray-900">
            Privacy <span className="text-teal-500">Policy</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Your privacy matters to us. This page explains how we collect,
            use, and protect your information.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="space-y-12 text-gray-700 leading-relaxed">
          {/* Intro */}
          <p>
            At <strong>Globalcore Tech</strong>, we respect your privacy and are
            committed to protecting any personal information you share with us.
            This Privacy Policy outlines how we handle your data when you visit
            our website or communicate with us.
          </p>

          {/* Information We Collect */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Information We Collect
            </h2>
            <p className="mt-4">
              We only collect personal information that you voluntarily provide,
              such as:
            </p>
            <ul className="mt-4 list-disc pl-6 space-y-2">
              <li>Your name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Project or business-related details</li>
            </ul>
            <p className="mt-4">
              This information is typically collected through contact forms,
              email communication, or WhatsApp inquiries.
            </p>
          </div>

          {/* How We Use Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              How We Use Your Information
            </h2>
            <p className="mt-4">
              Your information is used strictly for legitimate business purposes,
              including:
            </p>
            <ul className="mt-4 list-disc pl-6 space-y-2">
              <li>Responding to inquiries</li>
              <li>Discussing project requirements</li>
              <li>Providing services and support</li>
              <li>Improving our offerings and communication</li>
            </ul>
          </div>

          {/* Data Sharing */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Data Sharing & Security
            </h2>
            <p className="mt-4">
              We do not sell, rent, or trade your personal data with third
              parties. Your information is shared only when required to deliver
              services or comply with legal obligations.
            </p>
            <p className="mt-4">
              We implement reasonable security measures to protect your data
              from unauthorized access, misuse, or disclosure.
            </p>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Cookies & Tracking
            </h2>
            <p className="mt-4">
              Our website may use basic cookies or analytics tools to understand
              user behavior and improve performance. These do not personally
              identify you.
            </p>
          </div>

          {/* User Rights */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Your Rights
            </h2>
            <p className="mt-4">
              You have the right to request access, correction, or deletion of
              your personal data. To make such a request, please contact us using
              the details below.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Contact Us
            </h2>
            <p className="mt-4">
              If you have any questions or concerns regarding this Privacy
              Policy, feel free to reach out:
            </p>
            <p className="mt-2 font-medium text-gray-900">
              📧 contact@globlcoretech.com
            </p>
          </div>

          {/* Footer Note */}
          <div className="border-t pt-8 text-sm text-gray-500">
            <p>
              By using this website, you agree to this Privacy Policy. We may
              update this policy from time to time, and any changes will be
              reflected on this page.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
