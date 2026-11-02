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
  // Static export has no per-URL mtime — the build timestamp is the truest
  // "content last changed" signal we can offer crawlers.
  const lastModified = new Date();
  const tool = (path: string, priority: number) => [
    {
      url: `${base}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: langs(path) },
    },
    {
      url: `${base}/en${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: langs(path) },
    },
  ];
  return [
    {
      url: `${base}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: langs("/") },
    },
    {
      url: `${base}/en/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: langs("/") },
    },
    ...tool("/birthday/", 0.6),
    ...tool("/lich/", 0.7),
    ...tool("/hom-nay/", 0.7),
    ...tool("/thiep/", 0.5),
    ...tool("/credits/", 0.3),
    ...tool("/accessibility/", 0.2),
    ...holidays.flatMap((h) => {
      const path = `/${h.slug}/`;
      return [
        {
          url: `${base}${path}`,
          lastModified,
          changeFrequency: "yearly" as const,
          priority: 0.8,
          alternates: { languages: langs(path) },
        },
        {
          url: `${base}/en${path}`,
          lastModified,
          changeFrequency: "yearly" as const,
          priority: 0.7,
          alternates: { languages: langs(path) },
        },
      ];
    }),
  ];
}
