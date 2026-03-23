// app/robots.ts
// Google aur baaki search engines ko bata do kya crawl karna hai

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
    ],
    sitemap: "https://globlcoretech.com/sitemap.xml",
    host: "https://globlcoretech.com",
  };
}