import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import { getStrings, localePrefix, type Locale } from "@/i18n";

/**
 * Canonical + hreflang pair for a route shared by both locales.
 * `path` is the locale-neutral route ("/lich/"), never already prefixed;
 * the canonical points at *this* locale's version of it.
 */
export function languageAlternates(
  locale: Locale,
  path: string,
): Metadata["alternates"] {
  const p = path.startsWith("/") ? path : `/${path}`;
  return {
    canonical: `${localePrefix(locale)}${p === "/" ? "/" : p}`,
    languages: {
      vi: p,
      en: `/en${p === "/" ? "/" : p}`,
      "x-default": p,
    },
  };
}

/** Root-level metadata shared by both locale layouts (locale-aware). */
export function rootMetadata(locale: Locale): Metadata {
  const t = getStrings(locale);
  const home = `${localePrefix(locale)}/`;
  return {
    metadataBase: new URL(siteUrl() + "/"),
    title: {
      default: t.meta.titleDefault,
      template: t.meta.titleTemplate,
    },
    description: t.meta.description,
    openGraph: {
      type: "website",
      locale: t.meta.ogLocale,
      alternateLocale: locale === "en" ? "vi_VN" : "en_US",
      siteName: "Ngày Lễ Việt",
      url: home,
      images: [`${siteUrl()}/opengraph-image.png`],
    },
    twitter: { card: "summary_large_image" },
    alternates: {
      canonical: home,
      languages: { vi: "/", en: "/en/", "x-default": "/" },
    },
  };
}
