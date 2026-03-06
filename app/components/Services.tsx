"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  Globe,
  Smartphone,
  Brain,
  Database,
} from "lucide-react";

const services = [

  {
    title: "Web App & Website Development",
    description:
      "High-performance websites and scalable platforms built for speed, reliability, and conversion.",
    icon: Globe,
    href: "/services/web-app-website-development",
  },

  {
    title: "Mobile App Development",
    description:
      "Modern Android and iOS apps designed for performance, scalability, and seamless user experience.",
    icon: Smartphone,
    href: "/services/mobile-app-development",
  },

  {
    title: "AI Automation Solutions",
    description:
      "Automate workflows and integrate intelligent systems to improve efficiency and reduce manual work.",
    icon: Brain,
    href: "/services/ai-automation-solutions",
  },

  {
    title: "SaaS & Custom Software Development",
    description:
      "Tailor-made scalable software systems designed specifically for your business workflows.",
    icon: Database,
    href: "/services/saas-custom-software-development",
  },

];

export default function Services() {

  return (

    <section className="py-24">

      <div className="max-w-6xl mx-auto px-6">

        {/* SECTION TITLE */}

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-semibold text-center mb-12"
        >
          Our <span className="text-teal-400">Services</span>
        </motion.h2>


        {/* SERVICES GRID */}

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">

          {services.map((service, index) => {

            const Icon = service.icon;

            return (

              <Link
                key={index}
                href={service.href}
                className="group"
              >

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="
                  border border-white/10
                  rounded-xl
                  p-6
                  bg-white/5
                  hover:border-teal-400
                  hover:shadow-[0_0_30px_rgba(45,212,191,0.25)]
                  transition-all duration-300
                  cursor-pointer
                  "
                >

                  {/* ICON */}

                  <Icon
                    size={26}
                    className="
                    text-teal-400 mb-4
                    group-hover:scale-110
                    transition
                    "
                  />


                  {/* TITLE */}

                  <h3 className="text-lg font-semibold mb-2">
                    {service.title}
                  </h3>


                  {/* DESCRIPTION */}

                  <p className="text-gray-400 text-sm">
                    {service.description}
                  </p>

                </motion.div>

              </Link>

            );

          })}

        </div>

      </div>

    </section>

  );

}