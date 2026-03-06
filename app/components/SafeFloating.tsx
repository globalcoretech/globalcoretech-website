"use client";

import { useEffect, useState } from "react";
import FloatingGlowNodes from "./animations/FloatingGlowNodes";

export default function SafeFloating() {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <FloatingGlowNodes />;
}