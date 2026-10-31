import type { MetadataRoute } from "next";
import { holidays } from "@/data/holidays";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

/** hreflang pair for one route shared by both locales. */
const langs = (path: string) => ({
  vi: `${siteUrl()}${path}`,
  en: `${siteUrl()}/en${path === "/" ? "/" : path}`,
  "x-default": `${siteUrl()}${path}`,
});

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const tool = (path: string, priority: number) => [
    {
      url: `${base}${path}`,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: langs(path) },
    },
    {
      url: `${base}/en${path}`,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: langs(path) },
    },
  ];
  return [
    {
      url: `${base}/`,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: langs("/") },
    },
    {
      url: `${base}/en/`,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: langs("/") },
    },
    ...tool("/birthday/", 0.6),
    ...tool("/lich/", 0.7),
    ...tool("/thiep/", 0.5),
    ...tool("/credits/", 0.3),
    ...tool("/accessibility/", 0.2),
    ...holidays.flatMap((h) => {
      const path = `/${h.slug}/`;
      return [
        {
          url: `${base}${path}`,
          changeFrequency: "yearly" as const,
          priority: 0.8,
          alternates: { languages: langs(path) },
        },
        {
          url: `${base}/en${path}`,
          changeFrequency: "yearly" as const,
          priority: 0.7,
          alternates: { languages: langs(path) },
        },
      ];
    }),
  ];
}
