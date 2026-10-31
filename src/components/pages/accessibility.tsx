// Shared /accessibility statement page (vi at /accessibility/, en at
// /en/accessibility/).
import type { Metadata } from "next";
import { getStrings, localePath, type Locale } from "@/i18n";
import { siteUrl } from "@/lib/site";
import { languageAlternates } from "@/lib/metadata";

const ISSUES_URL = "https://github.com/JasonTM17/All-In-One-Holiday/issues";

export function accessibilityMetadata(locale: Locale): Metadata {
  const t = getStrings(locale);
  const url = localePath(locale, "/accessibility/");
  return {
    title: t.a11y.metaTitle,
    description: t.a11y.metaDescription,
    alternates: languageAlternates(locale, "/accessibility/"),
    openGraph: {
      title: `${t.a11y.metaTitle} — Ngày Lễ Việt`,
      description: t.a11y.metaDescription,
      url,
      type: "website",
      images: [`${siteUrl()}${url}opengraph-image.png`],
    },
  };
}

export default function AccessibilityPage({ locale }: { locale: Locale }) {
  const t = getStrings(locale);
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="eyebrow text-[var(--color-brand)]">{t.a11y.eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl font-extrabold text-[var(--color-ink)]">
        {t.a11y.h1}
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--color-muted)]">{t.a11y.intro}</p>

      <section aria-labelledby="a11y-intent" className="mt-10">
        <h2
          id="a11y-intent"
          className="font-display text-2xl font-extrabold text-[var(--color-ink)]"
        >
          {t.a11y.intentTitle}
        </h2>
        <p className="mt-3 leading-relaxed text-[var(--color-muted)]">
          {t.a11y.intentText}
        </p>
      </section>

      <section aria-labelledby="a11y-do" className="mt-10">
        <h2
          id="a11y-do"
          className="font-display text-2xl font-extrabold text-[var(--color-ink)]"
        >
          {t.a11y.doTitle}
        </h2>
        <ul className="mt-4 space-y-3">
          {t.a11y.doItems.map((item) => (
            <li key={item.slice(0, 24)} className="card p-5">
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="a11y-limits" className="mt-10">
        <h2
          id="a11y-limits"
          className="font-display text-2xl font-extrabold text-[var(--color-ink)]"
        >
          {t.a11y.limitsTitle}
        </h2>
        <ul className="mt-4 space-y-3">
          {t.a11y.limitItems.map((item) => (
            <li key={item.slice(0, 24)} className="card p-5">
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="a11y-feedback" className="mt-10">
        <h2
          id="a11y-feedback"
          className="font-display text-2xl font-extrabold text-[var(--color-ink)]"
        >
          {t.a11y.feedbackTitle}
        </h2>
        <p className="mt-3 leading-relaxed text-[var(--color-muted)]">
          {t.a11y.feedbackText}
        </p>
        <p className="mt-5">
          <a
            href={ISSUES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-full bg-[var(--color-brand)] px-6 py-2.5 text-sm font-bold text-[var(--color-on-brand)] hover:bg-[var(--color-brand-deep)]"
          >
            {t.a11y.feedbackCta} ↗
          </a>
        </p>
      </section>
    </main>
  );
}
