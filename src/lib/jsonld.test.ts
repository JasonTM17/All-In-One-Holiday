import { describe, expect, it } from "vitest";
import { holidays } from "@/data/holidays";
import { occurrenceInYear } from "@/lib/dates";
import { siteUrl } from "@/lib/site";
import {
  breadcrumbJsonLd,
  calendarJsonLd,
  eventJsonLd,
  faqJsonLd,
  holidayJsonLd,
  homeJsonLd,
  toolBreadcrumbJsonLd,
} from "./jsonld";

const now = new Date();

describe("holiday JSON-LD", () => {
  it("emits a parseable @graph with Event, FAQPage and BreadcrumbList per holiday", () => {
    for (const h of holidays) {
      const ld = holidayJsonLd(h, now);
      const parsed = JSON.parse(JSON.stringify(ld));
      expect(parsed["@context"]).toBe("https://schema.org");
      const types = parsed["@graph"].map(
        (n: { "@type": string }) => n["@type"],
      );
      expect(types).toEqual(["Event", "FAQPage", "BreadcrumbList"]);
    }
  });

  it("Event node has an ISO startDate and canonical url", () => {
    for (const h of holidays) {
      const e = eventJsonLd(h, now);
      expect(e.startDate, h.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(e.url).toBe(`${siteUrl()}/${h.slug}/`);
      expect(e.name).toBe(h.name);
      expect(e.eventStatus).toBe("https://schema.org/EventScheduled");
    }
  });

  it("startDate is the upcoming occurrence, in the local civil date", () => {
    // UTC+7 midnight must not become the previous day via toISOString.
    const e = eventJsonLd(
      holidays.find((h) => h.slug === "doanh-nhan")!,
      new Date(2026, 9, 1), // Oct 1 — before Oct 13
    );
    expect(e.startDate).toBe("2026-10-13");
    // Already-passed holidays advertise next year's occurrence instead.
    const past = eventJsonLd(
      holidays.find((h) => h.slug === "quoc-te-phu-nu")!,
      new Date(2026, 10, 1), // Nov 1 — Mar 8 already gone
    );
    expect(past.startDate).toBe("2027-03-08");
  });

  it("FAQPage mirrors the on-page faq data verbatim", () => {
    for (const h of holidays) {
      const f = faqJsonLd(h);
      expect(f.mainEntity.length, h.slug).toBe(h.faq.length);
      for (const [i, q] of f.mainEntity.entries()) {
        expect(q["@type"]).toBe("Question");
        expect(q.name).toBe(h.faq[i].q);
        expect(q.acceptedAnswer["@type"]).toBe("Answer");
        expect(q.acceptedAnswer.text).toBe(h.faq[i].a);
      }
    }
  });

  it("BreadcrumbList links home → holiday with correct positions", () => {
    for (const h of holidays) {
      const b = breadcrumbJsonLd(h);
      expect(b.itemListElement).toHaveLength(2);
      expect(b.itemListElement[0]).toMatchObject({
        position: 1,
        name: "Trang chủ",
        item: `${siteUrl()}/`,
      });
      expect(b.itemListElement[1]).toMatchObject({
        position: 2,
        name: h.name,
        item: `${siteUrl()}/${h.slug}/`,
      });
    }
  });
});

describe("tool breadcrumb JSON-LD", () => {
  it("links home → tool page with correct positions in both locales", () => {
    for (const [locale, prefix, homeLabel] of [
      ["vi", "", "Trang chủ"],
      ["en", "/en", "Home"],
    ] as const) {
      const parsed = JSON.parse(
        JSON.stringify(
          toolBreadcrumbJsonLd(locale, "/lich/", "Lịch ngày lễ", homeLabel),
        ),
      );
      const [b] = parsed["@graph"];
      expect(b["@type"]).toBe("BreadcrumbList");
      expect(b.itemListElement).toHaveLength(2);
      expect(b.itemListElement[0]).toMatchObject({
        position: 1,
        name: homeLabel,
        item: `${siteUrl()}${prefix}/`,
      });
      expect(b.itemListElement[1]).toMatchObject({
        position: 2,
        name: "Lịch ngày lễ",
        item: `${siteUrl()}${prefix}/lich/`,
      });
    }
  });
});

describe("calendar JSON-LD", () => {
  it("emits BreadcrumbList + ItemList covering every holiday in both locales", () => {
    for (const [locale, prefix, homeLabel] of [
      ["vi", "", "Trang chủ"],
      ["en", "/en", "Home"],
    ] as const) {
      const parsed = JSON.parse(
        JSON.stringify(calendarJsonLd(locale, "Lịch", homeLabel)),
      );
      const types = parsed["@graph"].map((n: { "@type": string }) => n["@type"]);
      expect(types).toEqual(["BreadcrumbList", "ItemList"]);
      const list = parsed["@graph"][1];
      expect(list.numberOfItems).toBe(holidays.length);
      expect(list.itemListElement).toHaveLength(holidays.length);
      expect(list.itemListElement[0].item).toBeUndefined();
      expect(list.itemListElement[0].url).toBe(
        `${siteUrl()}${prefix}/${holidays[0].slug}/`,
      );
    }
  });
});

describe("home JSON-LD", () => {
  it("emits WebSite + CollectionPage with one ListItem per holiday", () => {
    const parsed = JSON.parse(JSON.stringify(homeJsonLd()));
    const graph = parsed["@graph"];
    const types = graph.map((n: { "@type": string }) => n["@type"]);
    expect(types).toContain("WebSite");
    expect(types).toContain("CollectionPage");

    const col = graph.find(
      (n: { "@type": string }) => n["@type"] === "CollectionPage",
    );
    expect(col.isPartOf["@id"]).toBe(`${siteUrl()}/#website`);
    const items = col.mainEntity.itemListElement;
    expect(items).toHaveLength(holidays.length);
    expect(col.mainEntity.numberOfItems).toBe(holidays.length);
    // Same set as the source list — ordering is calendar (Jan → Dec),
    // asserted separately below.
    const bySlug = new Map(holidays.map((h) => [h.slug, h]));
    const occurrences: number[] = [];
    for (const [i, it] of items.entries()) {
      expect(it.position).toBe(i + 1);
      const h = bySlug.get(new URL(it.url).pathname.split("/")[1]);
      expect(it.name).toBe(h?.name);
    }
    // Positions follow the Jan → Dec occurrence order for the current year.
    for (const it of items) {
      const h = bySlug.get(new URL(it.url).pathname.split("/")[1]);
      occurrences.push(
        occurrenceInYear(h!.rule, now.getFullYear()).getTime(),
      );
    }
    expect([...occurrences].sort((a, b) => a - b)).toEqual(occurrences);
  });
});
