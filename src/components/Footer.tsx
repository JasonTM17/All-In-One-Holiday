import Link from "next/link";
import Motif from "./Motif";
import { getStrings, localePath, type Locale } from "@/i18n";
import { holidaysOf } from "@/i18n/data";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Footer({ locale }: { locale: Locale }) {
  const t = getStrings(locale);
  const holidays = holidaysOf(locale);
  const featured = ["tet-nguyen-dan", "quoc-te-phu-nu", "phu-nu-viet-nam", "trung-thu"]
    .map((s) => holidays.find((h) => h.slug === s))
    .filter((h) => h !== undefined);
  const lp = (p: string) => localePath(locale, p);

  return (
    <footer className="cv-auto dot-pattern-ink border-t border-[var(--color-line)] bg-[var(--color-band)]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="flex items-center gap-2 font-display text-xl font-extrabold text-[var(--color-brand-deep)]">
            <Motif name="lantern" className="h-7 w-7" filled />
            Ngày Lễ Việt
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--color-muted)]">
            {t.footer.tagline}
          </p>
        </div>
        <nav aria-label={t.footer.featuredAria}>
          <p className="eyebrow text-[var(--color-faint)]">{t.footer.featured}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {featured.map((h) => (
              <li key={h.slug}>
                <Link
                  prefetch={false}
                  href={lp(`/${h.slug}/`)}
                  className="u-link font-semibold text-[var(--color-muted)] hover:text-[var(--color-brand-deep)]"
                >
                  {h.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t.footer.exploreAria}>
          <p className="eyebrow text-[var(--color-faint)]">{t.footer.explore}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link prefetch={false} href={lp("/")} className="u-link font-semibold text-[var(--color-muted)] hover:text-[var(--color-brand-deep)]">
                {t.footer.home}
              </Link>
            </li>
            <li>
              <Link prefetch={false} href={`${lp("/")}#danh-sach`} className="u-link font-semibold text-[var(--color-muted)] hover:text-[var(--color-brand-deep)]">
                {t.footer.allHolidays}
              </Link>
            </li>
            <li>
              <Link prefetch={false} href={lp("/credits/")} className="u-link font-semibold text-[var(--color-muted)] hover:text-[var(--color-brand-deep)]">
                {t.footer.credits}
              </Link>
            </li>
            <li>
              <Link prefetch={false} href={lp("/lich/")} className="u-link font-semibold text-[var(--color-muted)] hover:text-[var(--color-brand-deep)]">
                {t.footer.calendar}
              </Link>
            </li>
            <li>
              <Link prefetch={false} href={lp("/hom-nay/")} className="u-link font-semibold text-[var(--color-muted)] hover:text-[var(--color-brand-deep)]">
                {t.today.h1}
              </Link>
            </li>
            <li>
              <Link prefetch={false} href={lp("/thiep/")} className="u-link font-semibold text-[var(--color-muted)] hover:text-[var(--color-brand-deep)]">
                {t.footer.cardMaker}
              </Link>
            </li>
            <li>
              <Link prefetch={false} href={lp("/birthday/")} className="u-link font-semibold text-[var(--color-muted)] hover:text-[var(--color-brand-deep)]">
                {t.footer.birthday}
              </Link>
            </li>
            <li>
              <Link prefetch={false} href={lp("/accessibility/")} className="u-link font-semibold text-[var(--color-muted)] hover:text-[var(--color-brand-deep)]">
                {t.footer.accessibility}
              </Link>
            </li>
            <li>
              <a href={`${BASE}/feed.xml`} className="u-link font-semibold text-[var(--color-muted)] hover:text-[var(--color-brand-deep)]">
                {t.footer.feed}
              </a>
            </li>
            <li>
              <a
                href="https://github.com/JasonTM17/All-In-One-Holiday/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="u-link font-semibold text-[var(--color-muted)] hover:text-[var(--color-brand-deep)]"
              >
                {t.footer.reportIssue}
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-[var(--color-line)]">
        <p className="mx-auto max-w-6xl px-4 py-5 text-center text-xs text-[var(--color-faint)] sm:px-6">
          {t.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
