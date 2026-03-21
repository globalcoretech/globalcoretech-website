"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0B0F0E] flex items-center justify-center px-6">
      <div className="text-center space-y-8">
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="relative inline-block"
        >
          <div className="absolute inset-0 bg-teal-500/20 blur-3xl rounded-full" />
          <h1 className="text-[150px] font-black text-white/5 leading-none tracking-tighter">404</h1>
          <AlertCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-teal-400 w-20 h-20" />
        </motion.div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white uppercase italic">Lost in Cyberspace?</h2>
          <p className="text-neutral-500 max-w-md mx-auto">
            The page you are looking for doesn't exist or has been moved to a different dimension.
          </p>
        </div>

        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-teal-400 transition-all active:scale-95"
        >
          <Home size={18} /> Back to Reality
        </Link>
      </div>
    </main>
  );
}