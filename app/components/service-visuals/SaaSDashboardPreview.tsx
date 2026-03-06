"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Database,
  Server,
  Users,
  Cpu,
  CheckCircle,
} from "lucide-react";

export default function SaaSDashboardPreview() {

  const stats = [
    {
      label: "Active Users",
      value: "12,847",
      icon: Users,
    },
    {
      label: "API Requests",
      value: "98,234",
      icon: Activity,
    },
    {
      label: "System Load",
      value: "32%",
      icon: Cpu,
    },
    {
      label: "Database Health",
      value: "Optimal",
      icon: Database,
    },
  ];

  const activity = [
    "New user registered",
    "API request processed",
    "Database backup completed",
    "Automation workflow executed",
    "System health check passed",
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden">

      {/* glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 -translate-x-1/2
                        w-225 h-125
                        bg-teal-400/10 blur-[140px]
                        rounded-full"/>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* heading */}
        <h2 className="text-center text-3xl md:text-4xl font-semibold mb-16">
          Live{" "}
          <span className="bg-linear-to-r from-teal-300 to-teal-500 bg-clip-text text-transparent">
            System Dashboard
          </span>
        </h2>

        {/* dashboard container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            rounded-2xl
            border border-white/10
            bg-white/5
            backdrop-blur-xl
            p-8
            shadow-[0_0_40px_rgba(45,212,191,0.15)]
          "
        >

          {/* stats grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">

            {stats.map((stat, i) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={i}
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(45,212,191,0)",
                      "0 0 20px rgba(45,212,191,0.3)",
                      "0 0 0 rgba(45,212,191,0)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  className="
                    rounded-xl
                    border border-white/10
                    bg-white/5
                    p-5
                  "
                >

                  <div className="flex items-center gap-3 mb-2">

                    <Icon className="text-teal-400" />

                    <div className="text-sm text-gray-400">
                      {stat.label}
                    </div>

                  </div>

                  <div className="text-xl font-semibold">
                    {stat.value}
                  </div>

                </motion.div>
              );
            })}

          </div>


          {/* activity + status */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* activity feed */}
            <div>

              <div className="mb-4 font-semibold text-gray-300">
                Live Activity
              </div>

              <div className="space-y-3">

                {activity.map((item, i) => (

                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.4,
                      repeat: Infinity,
                      repeatDelay: 5,
                    }}
                    className="
                      flex items-center gap-3
                      text-sm text-gray-400
                    "
                  >

                    <CheckCircle
                      size={16}
                      className="text-teal-400"
                    />

                    {item}

                  </motion.div>

                ))}

              </div>

            </div>


            {/* system status */}
            <div>

              <div className="mb-4 font-semibold text-gray-300">
                System Status
              </div>

              <div className="space-y-4">

                {[
                  "API Servers Operational",
                  "Database Connected",
                  "Automation Running",
                  "Monitoring Active",
                ].map((status, i) => (

                  <div
                    key={i}
                    className="flex items-center gap-3"
                  >

                    <motion.div
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      className="
                        w-3 h-3
                        bg-teal-400
                        rounded-full
                      "
                    />

                    <span className="text-gray-400 text-sm">
                      {status}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}
