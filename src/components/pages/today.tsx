// Shared /hom-nay "what day is today" tool page (vi at /hom-nay/, en at /en/hom-nay/).
import type { Metadata } from "next";
import TodayPanel from "@/components/TodayPanel";
import { getStrings, localePath, type Locale } from "@/i18n";
import { holidaysOf } from "@/i18n/data";
import { siteUrl } from "@/lib/site";
import { languageAlternates } from "@/lib/metadata";
import { toolBreadcrumbJsonLd } from "@/lib/jsonld";

export function todayMetadata(locale: Locale): Metadata {
  const t = getStrings(locale);
  const url = `${siteUrl()}${localePath(locale, "/hom-nay/")}`;
  return {
    title: t.today.metaTitle,
    description: t.today.metaDescription,
    alternates: languageAlternates(locale, "/hom-nay/"),
    openGraph: {
      title: `${t.today.metaTitle} — Ngày Lễ Việt`,
      description: t.today.metaDescription,
      url,
      type: "website",
      images: [`${url}opengraph-image.png`],
    },
  };
}

export default function TodayPage({ locale }: { locale: Locale }) {
  const t = getStrings(locale);
  const holidays = holidaysOf(locale);
  const jsonLd = toolBreadcrumbJsonLd(locale, "/hom-nay/", t.today.h1, t.footer.home);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="eyebrow text-[var(--color-brand)]">{t.today.eyebrow}</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold text-[var(--color-ink)]">
          {t.today.h1}
        </h1>
        <p className="mt-3 max-w-xl text-[var(--color-faint)]">{t.today.intro}</p>
        <div className="mt-8">
          <TodayPanel
            locale={locale}
            items={holidays.map((h) => ({
              slug: h.slug,
              name: h.name,
              categories: h.categories,
              rule: h.rule,
              theme: { from: h.theme.from },
              dayOffDays: h.dayOffDays,
            }))}
          />
        </div>
      </section>
    </>
  );
}
