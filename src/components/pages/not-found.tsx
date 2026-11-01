// Shared 404 body for both locale route groups.
import Link from "next/link";
import HImg from "@/components/HImg";
import { getStrings, localePath, type Locale } from "@/i18n";
import { holidaysOf } from "@/i18n/data";

const SUGGESTED = [
  "tet-nguyen-dan",
  "quoc-te-phu-nu",
  "phu-nu-viet-nam",
  "trung-thu",
  "quoc-khanh",
  "vu-lan",
];

export default function NotFoundPage({ locale }: { locale: Locale }) {
  const t = getStrings(locale);
  const suggested = SUGGESTED.map((s) =>
    holidaysOf(locale).find((h) => h.slug === s),
  ).filter((h) => h !== undefined);
  const lp = (p: string) => localePath(locale, p);
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="font-display text-7xl font-black text-[var(--color-brand-deep)]">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-[var(--color-ink)]">
        {t.meta.notFoundTitle}
      </h1>
      <Link
        href={lp("/")}
        className="mt-8 rounded-xl bg-[var(--color-brand)] px-6 py-3 font-semibold text-[var(--color-on-brand)] hover:bg-[var(--color-brand-deep)]"
      >
        {t.meta.notFoundBack}
      </Link>
      <div className="mt-14 w-full max-w-3xl">
        <p className="eyebrow text-[var(--color-faint)]">{t.meta.notFoundSuggest}</p>
        <ul className="mt-5 grid grid-cols-2 gap-3 text-left sm:grid-cols-3">
          {suggested.map((h) => (
            <li key={h.slug}>
              <Link
                prefetch={false}
                href={lp(`/${h.slug}/`)}
                className="card group block overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <HImg
                  src={`${h.slug}/card.webp`}
                  thumb={{ slug: h.slug, base: "card" }}
                  sizes="(min-width: 672px) 33vw, 50vw"
                  alt=""
                  width={960}
                  height={540}
                  className="aspect-[16/9] w-full object-cover"
                />
                <span className="block px-3 py-2.5 text-sm font-bold text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-brand-deep)]">
                  {h.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
