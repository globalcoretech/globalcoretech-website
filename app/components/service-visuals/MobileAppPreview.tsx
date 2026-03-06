"use client";

import { motion } from "framer-motion";
import { Smartphone, Bell, Activity, CheckCircle } from "lucide-react";

export default function MobileAppPreview() {

  return (

    <section className="relative py-28 px-6 overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">

        <div
          className="
            absolute left-1/2 -translate-x-1/2
            w-150 h-75
            bg-teal-400/10 blur-[140px]
            rounded-full
          "
        />

      </div>


      {/* Main container */}
      <div className="relative z-10 max-w-md mx-auto flex flex-col items-center text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-14">

          Mobile App{" "}

          <span
            className="
              bg-linear-to-r
              from-teal-300
              to-teal-500
              bg-clip-text
              text-transparent
              drop-shadow-[0_0_10px_rgba(45,212,191,0.3)]
            "
          >
            Live Preview
          </span>

        </h2>


        {/* Phone Frame */}
        <motion.div

          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}

          className="
            relative
            w-70
            h-140
            bg-black
            rounded-[40px]
            border border-white/10
            shadow-[0_0_60px_rgba(45,212,191,0.25)]
            p-3
          "
        >

          {/* speaker notch */}
          <div
            className="
              absolute top-2 left-1/2 -translate-x-1/2
              w-20 h-1 bg-white/10 rounded-full
            "
          />


          {/* Screen */}
          <div
            className="
              w-full h-full
              rounded-[30px]
              bg-[#0B0F0E]
              border border-white/5
              p-5
              flex flex-col justify-between
            "
          >


            {/* Top Bar */}
            <div className="flex justify-between items-center">

              <Smartphone className="text-teal-400" size={18} />

              <div className="relative">

                <Bell size={18} className="text-gray-400" />

                <span
                  className="
                    absolute -top-2 -right-2
                    bg-teal-400 text-black text-xs
                    w-5 h-5 flex items-center justify-center
                    rounded-full font-medium
                  "
                >
                  2
                </span>

              </div>

            </div>


            {/* Main Metric */}
            <div className="text-left">

              <div className="text-gray-400 text-sm mb-2">
                Active Users
              </div>

              <motion.div

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}

                className="
                  text-4xl font-semibold text-teal-400
                  drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]
                "
              >
                1,261
              </motion.div>

            </div>


            {/* Activity Card */}
            <div
              className="
                rounded-xl
                border border-white/10
                bg-white/5
                p-4
              "
            >

              <div className="flex items-center gap-2 text-sm mb-2">

                <Activity size={16} className="text-teal-400" />

                Live activity running

              </div>


              <div className="flex items-center gap-2 text-xs text-gray-400">

                <CheckCircle size={14} className="text-teal-400" />

                System operational

              </div>

            </div>


            {/* Bottom Stats */}
            <div className="grid grid-cols-2 gap-3">

              <StatCard label="Revenue" value="$12.4K" />

              <StatCard label="Growth" value="+18%" />

            </div>


          </div>

        </motion.div>

      </div>

    </section>

  );

}



function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (

    <div
      className="
        rounded-lg
        border border-white/10
        bg-white/5
        p-3 text-left
      "
    >

      <div className="text-xs text-gray-400 mb-1">
        {label}
      </div>

      <div className="text-teal-400 font-semibold">
        {value}
      </div>

    </div>

  );

}