"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, CheckCircle2, Loader2, MessageCircle } from "lucide-react"; // MessageCircle for WhatsApp
import BackgroundElements from "@/components/BackgroundElements";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userName, setUserName] = useState(""); // Naam save karne ke liye

  async function handleSubmit(event: any) {
    event.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(event.target);
    const name = formData.get("name") as string;
    setUserName(name); // User ka naam state mein daal diya

    formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); // <--- APNI KEY YAHAN DAALO

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    }).then((res) => res.json());

    if (res.success) {
      setIsSuccess(true);
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      alert("Error! Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-[#0B0F0E] pt-32 pb-20 relative overflow-hidden text-white">
      <BackgroundElements />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          {/* LEFT SIDE */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-teal-400 text-[10px] font-bold uppercase tracking-[0.3em]">Ready to Scale</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-bold mb-8 tracking-tighter leading-[0.85]">
              Let’s build <br /> <span className="text-teal-400 italic font-serif">Epic</span> stuff.
            </h1>
            
            <p className="text-neutral-500 text-xl mb-12 max-w-md leading-relaxed font-light">
              Stop settling for average. Let's engineer a system that dominates your niche.
            </p>

            {/* WHATSAPP DIRECT LINE */}
            <a 
              href="https://wa.me/+917879130175" // <--- APNA WHATSAPP NUMBER YAHAN DAAL (e.g. 919876543210)
              target="_blank"
              className="p-8 rounded-4xl bg-white/5 border border-white/10 backdrop-blur-md inline-block group hover:border-teal-400 transition-all"
            >
               <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] group-hover:scale-110 transition-transform">
                    <MessageCircle size={24} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">WhatsApp Direct</p>
                    <p className="text-xl font-bold">Chat with us</p>
                  </div>
               </div>
            </a>
          </motion.div>

          {/* RIGHT SIDE: FORM */}
          <motion.div className="relative group">
            <div className="relative bg-white/3 border border-white/10 rounded-[3rem] p-10 md:p-14 backdrop-blur-3xl shadow-2xl min-h-145 flex items-center">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form 
                    key="form"
                    exit={{ opacity: 0, scale: 0.95 }}
                    onSubmit={handleSubmit} 
                    className="space-y-8 w-full"
                  >
                    <div className="space-y-6">
                      <input name="name" required type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-teal-400 transition-all text-xl placeholder:text-neutral-700" />
                      <input name="email" required type="email" placeholder="Your Email" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-teal-400 transition-all text-xl placeholder:text-neutral-700" />
                      
                      {/* Project Type Selection */}
                      <div className="pt-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-teal-400/50 block mb-4">What are we building?</label>
                        <select name="type" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-teal-400 text-neutral-400 appearance-none cursor-pointer">
                          <option className="bg-[#0D1211]">SaaS</option>
                          <option className="bg-[#0D1211]">Mobile Development</option>
                          <option className="bg-[#0D1211]">Web Apps and Website</option>
                          <option className="bg-[#0D1211]">AI and Automation</option>
                        </select>
                      </div>

                      <textarea name="message" required rows={3} placeholder="Project details..." className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-teal-400 transition-all text-xl placeholder:text-neutral-700 resize-none" />
                    </div>

                    <button disabled={isSubmitting} className="w-full bg-white text-black font-black uppercase tracking-[0.2em] text-[12px] py-6 rounded-2xl hover:bg-teal-400 transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50">
                      {isSubmitting ? <Loader2 className="animate-spin" /> : "Initiate Project"} <Send size={18} />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center space-y-6 w-full py-10"
                  >
                    <div className="w-24 h-24 bg-teal-400/20 text-teal-400 rounded-full flex items-center justify-center mb-4 shadow-[0_0_50px_rgba(45,212,191,0.2)]">
                      <CheckCircle2 size={48} />
                    </div>
                    {/* PERSONALIZED MESSAGE */}
                    <h2 className="text-4xl font-bold tracking-tighter italic capitalize">{userName}, Thank You!</h2>
                    <p className="text-neutral-500 max-w-75 leading-relaxed">
                      We've received your message. Our team will get back to you within 24 hours.
                    </p>
                    <button onClick={() => setIsSuccess(false)} className="text-teal-400 text-xs font-bold uppercase tracking-widest hover:text-white pt-4">Send another one</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}