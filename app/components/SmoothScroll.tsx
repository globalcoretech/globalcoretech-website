"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ CRITICAL FIX: Reset scroll on route change
  useEffect(() => {
    if (mounted) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, mounted]);

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return <div className="scroll-smooth">{children}</div>;
}