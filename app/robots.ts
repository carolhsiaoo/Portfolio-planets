import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio/", "/projects/"],
    },
    sitemap: "https://www.carolhsiao.com/sitemap.xml",
  };
}
