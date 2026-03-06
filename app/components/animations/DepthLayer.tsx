"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DepthLayer({
  children,
  speed = 0.1,
}: {
  children: React.ReactNode;
  speed?: number;
}) {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {

    // wait until client fully ready
    const timer = setTimeout(() => {
      setMounted(true);
    }, 10);

    return () => clearTimeout(timer);

  }, []);

  // prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      style={{
        willChange: "transform",
      }}
    >

      {children}

    </motion.div>

  );
}