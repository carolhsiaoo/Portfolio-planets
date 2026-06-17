import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://www.carolhsiao.com";

  return [
    { url: `${siteUrl}/en`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/zh`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/en/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/zh/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/en/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${siteUrl}/zh/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${siteUrl}/en/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/zh/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];
}
