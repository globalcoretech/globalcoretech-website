"use client";

import { motion } from "framer-motion";

/* ================================================
   Math.random() server aur client pe alag values
   deta hai — hydration mismatch hota hai.
   Isliye saari positions static define ki hain.
================================================ */
const NODES = [
  { x: 120,  y: 340,  toY: [340,  620],  toX: [120,  450]  },
  { x: 680,  y: 80,   toY: [80,   310],  toX: [680,  920]  },
  { x: 950,  y: 500,  toY: [500,  200],  toX: [950,  700]  },
  { x: 300,  y: 650,  toY: [650,  400],  toX: [300,  60]   },
  { x: 780,  y: 720,  toY: [720,  480],  toX: [780,  1050] },
  { x: 450,  y: 200,  toY: [200,  550],  toX: [450,  180]  },
  { x: 1050, y: 150,  toY: [150,  600],  toX: [1050, 820]  },
  { x: 200,  y: 480,  toY: [480,  100],  toX: [200,  580]  },
];

export default function FloatingGlowNodes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {NODES.map((node, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-teal-400/60 blur-[2px]"
          initial={{
            x: node.x,
            y: node.y,
            opacity: 0.3,
          }}
          animate={{
            y: node.toY,
            x: node.toX,
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}