"use client";

import { motion } from "framer-motion";
import { Globe, MousePointerClick, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";

export default function WebsitePreview() {

  const [visitors, setVisitors] = useState(1247);
  const [conversion, setConversion] = useState(3.2);
  const [sales, setSales] = useState(89);

  // fake live updates
  useEffect(() => {

    const interval = setInterval(() => {

      setVisitors(v => v + Math.floor(Math.random() * 3));
      setConversion(c => +(c + Math.random() * 0.05).toFixed(2));
      setSales(s => s + Math.floor(Math.random() * 2));

    }, 2000);

    return () => clearInterval(interval);

  }, []);

  return (

    <section className="relative py-32 px-6 overflow-hidden">

      {/* glow background */}
      <div className="absolute inset-0 pointer-events-none">

        <div className="
          absolute left-1/2 -translate-x-1/2
          w-200 h-100
          bg-teal-400/10 blur-[140px]
          rounded-full
        " />

      </div>


      <div className="relative z-10 max-w-6xl mx-auto">

        {/* heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >

          <h2 className="text-3xl md:text-4xl font-semibold">

            Live Website{" "}

            <span className="
              bg-linear-to-r
              from-teal-300
              to-teal-500
              bg-clip-text
              text-transparent
            ">
              Performance Preview
            </span>

          </h2>

          <p className="text-gray-400 mt-4">
            See how your platform performs in real-time
          </p>

        </motion.div>


        {/* browser mockup */}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            rounded-xl border border-white/10
            bg-white/5 backdrop-blur-xl
            shadow-[0_0_40px_rgba(45,212,191,0.1)]
            overflow-hidden
          "
        >

          {/* browser top bar */}

          <div className="
            flex items-center gap-2
            px-4 py-3
            border-b border-white/10
          ">

            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />

            <div className="
              ml-4 text-sm text-gray-400 flex items-center gap-2
            ">

              <Globe size={14} />

              yourplatform.com

            </div>

          </div>


          {/* browser content */}

          <div className="p-8 grid md:grid-cols-3 gap-6">

            {/* visitors */}

            <MetricCard
              icon={<MousePointerClick />}
              label="Live Visitors"
              value={visitors.toLocaleString()}
            />

            {/* conversion */}

            <MetricCard
              icon={<BarChart3 />}
              label="Conversion Rate"
              value={`${conversion}%`}
            />

            {/* sales */}

            <MetricCard
              icon={<Globe />}
              label="Active Conversions"
              value={sales.toString()}
            />

          </div>


          {/* fake website preview */}

          <div className="p-8 border-t border-white/10">

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="
                rounded-lg bg-white/5 p-6
                border border-white/10
              "
            >

              <div className="h-4 w-32 bg-teal-400/30 rounded mb-4" />

              <div className="space-y-3">

                <div className="h-3 bg-white/10 rounded w-full" />
                <div className="h-3 bg-white/10 rounded w-5/6" />
                <div className="h-3 bg-white/10 rounded w-4/6" />

              </div>

            </motion.div>

          </div>

        </motion.div>

      </div>

    </section>

  );

}



function MetricCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {

  return (

    <div className="
      rounded-lg border border-white/10
      bg-white/5 p-6
      hover:border-teal-400/40
      hover:shadow-[0_0_20px_rgba(45,212,191,0.25)]
      transition
    ">

      <div className="text-teal-400 mb-2">

        {icon}

      </div>

      <div className="text-sm text-gray-400">
        {label}
      </div>

      <div className="text-2xl font-semibold mt-1">
        {value}
      </div>

    </div>

  );

}