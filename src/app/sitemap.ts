import type { MetadataRoute } from "next";

const BASE = "https://ocdmma.ba";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/bs`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/en`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];
}
