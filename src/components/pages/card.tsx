// Shared /thiep card-maker page (vi at /thiep/, en at /en/thiep/).
import type { Metadata } from "next";
import { Suspense } from "react";
import CardMakerLazy, { CardMakerSkeleton } from "@/components/CardMakerLazy";
import { getStrings, type Locale } from "@/i18n";
import { holidaysOf } from "@/i18n/data";
import { languageAlternates } from "@/lib/metadata";

export function cardMetadata(locale: Locale): Metadata {
  const t = getStrings(locale);
  return {
    title: t.thiep.metaTitle,
    description: t.thiep.metaDescription,
    robots: { index: false, follow: false },
    alternates: languageAlternates(locale, "/thiep/"),
  };
}

export default function CardPage({ locale }: { locale: Locale }) {
  const t = getStrings(locale);
  const holidays = holidaysOf(locale);
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="eyebrow text-[var(--color-brand)]">{t.thiep.eyebrow}</p>
      <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold text-[var(--color-ink)]">
        {t.thiep.h1}
      </h1>
      <p className="mt-3 max-w-xl text-[var(--color-faint)]">
        {t.thiep.intro}
      </p>
      <div className="mt-8">
        <Suspense fallback={<CardMakerSkeleton />}>
          <CardMakerLazy
            locale={locale}
            items={holidays.map((h) => ({
              slug: h.slug,
              name: h.name,
              dateMark: h.dateMark,
              wishes: h.wishes,
              theme: { from: h.theme.from, to: h.theme.to },
            }))}
          />
        </Suspense>
      </div>
    </section>
  );
}
