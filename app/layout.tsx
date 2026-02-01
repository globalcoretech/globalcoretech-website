import "@/global.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "GlobalcoreTech",
  description: "Scalable Software & AI Solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* 🔑 GOOGLE SEARCH CONSOLE VERIFICATION */}
        <meta
          name="google-site-verification"
          content="google-site-verification=vuDGWgBmuwpTlmF5F_iTxKEbsclp4JGrK5J4BtPh24o"
        />
      </head>

      <body className="bg-white text-black">
        {/* Fixed Navbar */}
        <Navbar />

        {/* Page content (navbar height offset) */}
        <main className="pt-[88px]">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
