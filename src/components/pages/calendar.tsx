// Shared /lich calendar tool page (vi at /lich/, en at /en/lich/).
import type { Metadata } from "next";
import Calendar from "@/components/Calendar";
import { getStrings, localePath, type Locale } from "@/i18n";
import { holidaysOf } from "@/i18n/data";
import { siteUrl } from "@/lib/site";
import { languageAlternates } from "@/lib/metadata";

export function calendarMetadata(locale: Locale): Metadata {
  const t = getStrings(locale);
  const url = `${siteUrl()}${localePath(locale, "/lich/")}`;
  return {
    title: t.calendar.metaTitle,
    description: t.calendar.metaDescription,
    alternates: languageAlternates(locale, "/lich/"),
    openGraph: {
      title: `${t.calendar.metaTitle} — Ngày Lễ Việt`,
      url,
      type: "website",
    },
  };
}

export default function CalendarPage({ locale }: { locale: Locale }) {
  const t = getStrings(locale);
  const holidays = holidaysOf(locale);
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="eyebrow text-[var(--color-brand)]">{t.calendar.eyebrow}</p>
      <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold text-[var(--color-ink)]">
        {t.calendar.h1}
      </h1>
      <p className="mt-3 max-w-xl text-[var(--color-faint)]">
        {t.calendar.intro}
      </p>
      <div className="mt-8">
        <Calendar
          locale={locale}
          items={holidays.map((h) => ({
            slug: h.slug,
            name: h.name,
            categories: h.categories,
            rule: h.rule,
            theme: { from: h.theme.from },
          }))}
        />
      </div>
    </section>
  );
}
