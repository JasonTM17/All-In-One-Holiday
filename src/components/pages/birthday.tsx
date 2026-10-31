// Shared /birthday personalized-card page (vi at /birthday/, en at /en/birthday/).
import type { Metadata } from "next";
import { Suspense } from "react";
import BirthdayCard from "@/components/BirthdayCard";
import { HERO_LQIP } from "@/data/hero-lqip";
import { getStrings, localePath, type Locale } from "@/i18n";
import { siteUrl } from "@/lib/site";
import { languageAlternates } from "@/lib/metadata";

export function birthdayMetadata(locale: Locale): Metadata {
  const t = getStrings(locale);
  return {
    title: t.birthday.metaTitle,
    description: t.birthday.metaDescription,
    robots: { index: false, follow: false },
    alternates: languageAlternates(locale, "/birthday/"),
    openGraph: {
      title: `${t.birthday.metaTitle} — Ngày Lễ Việt`,
      description: t.birthday.metaDescription,
      url: localePath(locale, "/birthday/"),
      type: "website",
      images: [
        `${siteUrl()}${localePath(locale, "/birthday/")}opengraph-image.png`,
      ],
    },
  };
}

export default function BirthdayPage({ locale }: { locale: Locale }) {
  const t = getStrings(locale);
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="mx-auto mb-10 max-w-xl text-center">
        <h1 className="font-display text-3xl font-extrabold text-[var(--color-ink)] sm:text-4xl">
          {t.birthday.h1}
        </h1>
      </div>
      <div className="mx-auto max-w-3xl">
        <Suspense
          fallback={
            <div
              aria-hidden="true"
              className="mx-auto h-[30rem] max-w-lg animate-pulse rounded-3xl bg-[var(--color-line)]/60"
            />
          }
        >
          <BirthdayCard lqip={HERO_LQIP.birthday} locale={locale} />
        </Suspense>
      </div>
    </section>
  );
}
