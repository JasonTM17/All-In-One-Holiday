// Root-level 404 for URLs outside both locale route groups (e.g. /foo/).
// Renders its own <html>/<body> — required by Next when multiple root
// layouts exist (experimental.globalNotFound). Defaults to Vietnamese.
import type { Metadata } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import HImg from "@/components/HImg";
import { getStrings } from "@/i18n";
import { holidaysOf } from "@/i18n/data";
import { siteUrl } from "@/lib/site";

// This page sits outside the locale layouts, so it must carry its own
// metadata (title, noindex — a 404 should never be indexed).
export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl()}/`),
  title: "Không tìm thấy trang | Ngày Lễ Việt",
  robots: { index: false, follow: false },
};

const display = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
});

const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
  preload: false,
});

const SUGGESTED = [
  "tet-nguyen-dan",
  "quoc-te-phu-nu",
  "phu-nu-viet-nam",
  "trung-thu",
  "quoc-khanh",
  "vu-lan",
];

export default function GlobalNotFound() {
  const t = getStrings("vi");
  const suggested = SUGGESTED.map((s) =>
    holidaysOf("vi").find((h) => h.slug === s),
  ).filter((h) => h !== undefined);
  return (
    <html lang="vi" className={`${display.variable} ${sans.variable}`}>
      <body>
        <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
          <p className="font-display text-7xl font-black text-[var(--color-brand-deep)]">404</p>
          <h1 className="mt-4 font-display text-2xl font-bold text-[var(--color-ink)]">
            {t.meta.notFoundTitle}
          </h1>
          <Link
            href="/"
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
                    href={`/${h.slug}/`}
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
      </body>
    </html>
  );
}
