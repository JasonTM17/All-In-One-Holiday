import type { MetadataRoute } from "next";
import { holidays } from "@/data/holidays";

export const dynamic = "force-static";

const BASE = "https://ngayleviet.vn";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/birthday/`, changeFrequency: "monthly", priority: 0.6 },
    ...holidays.map((h) => ({
      url: `${BASE}/${h.slug}/`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
