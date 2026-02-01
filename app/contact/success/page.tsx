import Link from "next/link";

export default function ContactSuccessPage() {
  return (
    <section className="px-8 py-32 min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-10 rounded-xl shadow-md max-w-md text-center">
        <div className="text-green-500 text-5xl mb-4">✓</div>

        <h1 className="text-3xl font-bold text-slate-900">
          Message Sent Successfully!
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for contacting <strong>Globalcore Tech</strong>.
          We’ll review your message and get back to you shortly.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/">
            <button className="px-6 py-3 bg-[#0FB9B1] text-white rounded-lg hover:opacity-90">
              Back to Home
            </button>
          </Link>

          <Link href="/contact">
            <button className="px-6 py-3 border rounded-lg">
              Send Another Message
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
