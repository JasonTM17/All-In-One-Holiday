// Shared /lich calendar tool page (vi at /lich/, en at /en/lich/).
import type { Metadata } from "next";
import Link from "next/link";
import Calendar from "@/components/Calendar";
import PrintButton from "@/components/PrintButton";
import YearGrid from "@/components/YearGrid";
import { getStrings, localePath, type Locale } from "@/i18n";
import { holidaysOf } from "@/i18n/data";
import { siteUrl } from "@/lib/site";
import { languageAlternates } from "@/lib/metadata";
import { calendarJsonLd } from "@/lib/jsonld";

export function calendarMetadata(locale: Locale): Metadata {
  const t = getStrings(locale);
  const url = `${siteUrl()}${localePath(locale, "/lich/")}`;
  return {
    title: t.calendar.metaTitle,
    description: t.calendar.metaDescription,
    alternates: languageAlternates(locale, "/lich/"),
    openGraph: {
      title: `${t.calendar.metaTitle} — Ngày Lễ Việt`,
      description: t.calendar.metaDescription,
      url,
      type: "website",
      images: [`${url}opengraph-image.png`],
    },
  };
}

export default function CalendarPage({ locale }: { locale: Locale }) {
  const t = getStrings(locale);
  const holidays = holidaysOf(locale);
  const lp = (p: string) => localePath(locale, p);
  const jsonLd = calendarJsonLd(locale, t.calendar.h1, t.footer.home);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="eyebrow text-[var(--color-brand)]">{t.calendar.eyebrow}</p>
      <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold text-[var(--color-ink)]">
        {t.calendar.h1}
      </h1>
      <p className="mt-3 max-w-xl text-[var(--color-faint)]">
        {t.calendar.intro}
      </p>
      <div className="mt-4">
        <PrintButton label={t.calendar.printLabel} />
      </div>
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
      <section aria-labelledby="year-grid" className="mt-12">
        <h2
          id="year-grid"
          className="font-display text-2xl font-extrabold text-[var(--color-ink)]"
        >
          {t.calendar.yearH2}
        </h2>
        <p className="mt-2 max-w-xl text-sm text-[var(--color-faint)]">
          {t.calendar.yearIntro}
        </p>
        <div className="mt-6 space-y-8">
          {[new Date().getFullYear(), new Date().getFullYear() + 1].map(
            (y) => (
              <YearGrid key={y} locale={locale} holidays={holidays} year={y} />
            ),
          )}
        </div>
      </section>
      <section aria-labelledby="off-days" className="mt-12">
        <h2
          id="off-days"
          className="font-display text-2xl font-extrabold text-[var(--color-ink)]"
        >
          {t.calendar.offTitle}
        </h2>
        <p className="mt-2 max-w-xl text-sm text-[var(--color-faint)]">
          {t.calendar.offIntro}
        </p>
        <a
          href="https://vanban.chinhphu.vn/?docid=198540&pageid=27160"
          target="_blank"
          rel="noopener noreferrer"
          className="u-link mt-1 inline-block text-xs font-semibold text-[var(--color-muted)] hover:text-[var(--color-brand-deep)]"
        >
          {t.calendar.offSource}
        </a>
        <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {holidays
            .filter((h) => h.dayOffDays != null)
            .map((h) => (
              <li key={h.slug}>
                <Link
                  prefetch={false}
                  href={lp(`/${h.slug}/`)}
                  className="card flex items-center justify-between gap-3 px-4 py-3 transition hover:-translate-y-0.5 focus-visible:outline-2"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-[var(--color-ink)]">
                      {h.name}
                    </span>
                    <span className="text-xs text-[var(--color-faint)]">
                      {h.displayDate}
                    </span>
                  </span>
                  <span
                    className="shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold text-white"
                    style={{ background: h.theme.from }}
                  >
                    {t.calendar.offDays(h.dayOffDays!)}
                  </span>
                </Link>
              </li>
            ))}
        </ul>
        <p className="mt-6 max-w-xl text-xs text-[var(--color-faint)]">
          {t.calendar.lunarNote}
        </p>
      </section>
    </section>
    </>
  );
}
