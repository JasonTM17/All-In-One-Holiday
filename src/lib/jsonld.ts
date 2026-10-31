import type { Holiday } from "@/data/holidays";
import { holidays } from "@/data/holidays";
import { siteUrl } from "./site";
import { occurrenceInYear } from "./dates";

/**
 * Structured data builders. Pages emit a single ld+json script whose @graph
 * carries the schema.org nodes — keep every builder pure so vitest can
 * validate the emitted syntax for all 26 holidays.
 */

export function eventJsonLd(h: Holiday, eventYear: number) {
  return {
    "@type": "Event",
    "@id": `${siteUrl()}/${h.slug}/#event`,
    name: h.name,
    description: `${h.name} — ${h.displayDate}. ${h.tagline}`,
    startDate: occurrenceInYear(h.rule, eventYear).toISOString().slice(0, 10),
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "Country", name: "Việt Nam" },
    url: `${siteUrl()}/${h.slug}/`,
  };
}

export function faqJsonLd(h: Holiday) {
  return {
    "@type": "FAQPage",
    "@id": `${siteUrl()}/${h.slug}/#faq`,
    inLanguage: "vi",
    mainEntity: h.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(h: Holiday) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${siteUrl()}/${h.slug}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: `${siteUrl()}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: h.name,
        item: `${siteUrl()}/${h.slug}/`,
      },
    ],
  };
}

/** Event + FAQPage + BreadcrumbList for a holiday page. */
export function holidayJsonLd(h: Holiday, eventYear: number) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      eventJsonLd(h, eventYear),
      faqJsonLd(h),
      breadcrumbJsonLd(h),
    ],
  };
}

/** WebSite + CollectionPage (with the full holiday ItemList) for the home page. */
export function homeJsonLd() {
  const base = siteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        name: "Ngày Lễ Việt",
        url: `${base}/`,
        description:
          "Lịch các ngày lễ Việt Nam và quốc tế: đếm ngược, ý nghĩa, phong tục và lời chúc.",
        inLanguage: "vi",
      },
      {
        "@type": "CollectionPage",
        "@id": `${base}/#collection`,
        url: `${base}/`,
        name: "Ngày Lễ Việt — Lịch lễ hội & lời chúc",
        description:
          "Tất cả ngày lễ Việt Nam và quốc tế trong năm: đếm ngược, ý nghĩa, phong tục và lời chúc.",
        inLanguage: "vi",
        isPartOf: { "@id": `${base}/#website` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: holidays.length,
          itemListElement: holidays.map((h, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: h.name,
            url: `${base}/${h.slug}/`,
          })),
        },
      },
    ],
  };
}
