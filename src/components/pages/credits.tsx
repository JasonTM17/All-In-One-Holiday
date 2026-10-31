// Shared /credits image-attribution page (vi at /credits/, en at /en/credits/).
import type { Metadata } from "next";
import { imageCredits } from "@/data/image-credits";
import { getStrings, type Locale } from "@/i18n";
import { holidaysOf } from "@/i18n/data";
import { languageAlternates } from "@/lib/metadata";

export function creditsMetadata(locale: Locale): Metadata {
  const t = getStrings(locale);
  return {
    title: t.credits.metaTitle,
    description: t.credits.metaDescription,
    alternates: languageAlternates(locale, "/credits/"),
  };
}

export default function CreditsPage({ locale }: { locale: Locale }) {
  const t = getStrings(locale);
  const holidays = holidaysOf(locale);
  const NAME: Record<string, string> = {
    "home-hero": t.credits.homeLabel,
    birthday: t.credits.birthdayLabel,
  };
  const NAME_OF = new Map<string, string>([
    ...holidays.map((h) => [h.slug, h.name] as [string, string]),
    ...Object.entries(NAME),
  ]);
  const entries = Object.entries(imageCredits);
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p className="eyebrow text-[var(--color-brand)]">{t.credits.eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl font-extrabold text-[var(--color-ink)]">
        {t.credits.h1}
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--color-muted)]">
        {t.credits.intro}
      </p>
      <div className="mt-10 space-y-10">
        {entries.map(([slug, list]) => (
          <section key={slug} aria-labelledby={`cr-${slug}`}>
            <h2
              id={`cr-${slug}`}
              className="font-display text-lg font-bold text-[var(--color-ink)]"
            >
              {NAME_OF.get(slug) ?? slug}
            </h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {list.map((c) => (
                <li
                  key={c.file}
                  className="card flex items-center justify-between gap-3 px-4 py-2.5 text-sm"
                >
                  <span className="truncate text-[var(--color-muted)]">
                    {c.file.split("/")[1]}
                  </span>
                  <a
                    href={c.photo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-link shrink-0 font-semibold text-[var(--color-brand-deep)]"
                  >
                    {c.photographer} · {c.license}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
