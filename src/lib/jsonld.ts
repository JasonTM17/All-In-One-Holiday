import type { Holiday } from "@/data/holidays";
import { holidaysOf } from "@/i18n/data";
import { localePrefix, type Locale } from "@/i18n";
import { siteUrl } from "./site";
import { occurrenceInYear } from "./dates";

/**
 * Structured data builders. Pages emit a single ld+json script whose @graph
 * carries the schema.org nodes — keep every builder pure so vitest can
 * validate the emitted syntax for every holiday in both locales.
 */

export function eventJsonLd(h: Holiday, eventYear: number, locale: Locale = "vi") {
  const prefix = localePrefix(locale);
  return {
    "@type": "Event",
    "@id": `${siteUrl()}${prefix}/${h.slug}/#event`,
    name: h.name,
    description: `${h.name} — ${h.displayDate}. ${h.tagline}`,
    startDate: occurrenceInYear(h.rule, eventYear).toISOString().slice(0, 10),
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Country",
      name: locale === "en" ? "Vietnam" : "Việt Nam",
    },
    url: `${siteUrl()}${prefix}/${h.slug}/`,
    inLanguage: locale,
  };
}

export function faqJsonLd(h: Holiday, locale: Locale = "vi") {
  const prefix = localePrefix(locale);
  return {
    "@type": "FAQPage",
    "@id": `${siteUrl()}${prefix}/${h.slug}/#faq`,
    inLanguage: locale,
    mainEntity: h.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(h: Holiday, locale: Locale = "vi", homeLabel = "Trang chủ") {
  const prefix = localePrefix(locale);
  return {
    "@type": "BreadcrumbList",
    "@id": `${siteUrl()}${prefix}/${h.slug}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: `${siteUrl()}${prefix}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: h.name,
        item: `${siteUrl()}${prefix}/${h.slug}/`,
      },
    ],
  };
}

/** Event + FAQPage + BreadcrumbList for a holiday page. */
export function holidayJsonLd(h: Holiday, eventYear: number, locale: Locale = "vi", homeLabel = "Trang chủ") {
  return {
    "@context": "https://schema.org",
    "@graph": [
      eventJsonLd(h, eventYear, locale),
      faqJsonLd(h, locale),
      breadcrumbJsonLd(h, locale, homeLabel),
    ],
  };
}

/** WebSite + CollectionPage (with the full holiday ItemList) for a home page. */
export function homeJsonLd(locale: Locale = "vi") {
  const base = siteUrl();
  const prefix = localePrefix(locale);
  const list = holidaysOf(locale);
  const en = locale === "en";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        name: "Ngày Lễ Việt",
        url: `${base}/`,
        description: en
          ? "Vietnamese and international holiday calendar: countdowns, meaning, traditions and wishes."
          : "Lịch các ngày lễ Việt Nam và quốc tế: đếm ngược, ý nghĩa, phong tục và lời chúc.",
        inLanguage: locale,
      },
      {
        "@type": "CollectionPage",
        "@id": `${base}${prefix}/#collection`,
        url: `${base}${prefix}/`,
        name: en
          ? "Ngày Lễ Việt — Holiday calendar & wishes"
          : "Ngày Lễ Việt — Lịch lễ hội & lời chúc",
        description: en
          ? "All Vietnamese and international holidays of the year: countdowns, meaning, traditions and wishes."
          : "Tất cả ngày lễ Việt Nam và quốc tế trong năm: đếm ngược, ý nghĩa, phong tục và lời chúc.",
        inLanguage: locale,
        isPartOf: { "@id": `${base}/#website` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: list.length,
          itemListElement: list.map((h, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: h.name,
            url: `${base}${prefix}/${h.slug}/`,
          })),
        },
      },
    ],
  };
}
