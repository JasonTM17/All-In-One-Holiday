import type { MetadataRoute } from "next";
import { holidays } from "@/data/holidays";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/birthday/`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/lich/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/thiep/`, changeFrequency: "monthly", priority: 0.5 },
    ...holidays.map((h) => ({
      url: `${base}/${h.slug}/`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
