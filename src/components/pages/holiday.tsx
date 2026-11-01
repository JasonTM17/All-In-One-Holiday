// Shared holiday detail page — rendered by /<slug>/ (vi) and /en/<slug>/ (en).
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteUrl } from "@/lib/site";
import { holidayJsonLd } from "@/lib/jsonld";
import RuleCountdown from "@/components/RuleCountdown";
import CopyButton from "@/components/CopyButton";
import WishGenerator from "@/components/WishGenerator";
import Faq from "@/components/Faq";
import Motif from "@/components/Motif";
import Reveals from "@/components/Reveals";
import HolidayActions from "@/components/HolidayActions";
import HImg from "@/components/HImg";
import LightboxImg from "@/components/LightboxImg";
import GalleryGrid from "@/components/GalleryGrid";
import { HERO_LQIP } from "@/data/hero-lqip";
import { HERO_TINT } from "@/data/hero-sizes";
import { getStrings, localePath, type Locale } from "@/i18n";
import { holidayOf, holidaysOf, storiesOf } from "@/i18n/data";
import { languageAlternates } from "@/lib/metadata";

export function holidayParams(): { slug: string }[] {
  // Same slugs in both locales — VI list is the canonical source.
  return holidaysOf("vi").map((h) => ({ slug: h.slug }));
}

export async function holidayMetadata(
  slug: string,
  locale: Locale,
): Promise<Metadata> {
  const h = holidayOf(slug, locale);
  if (!h) return {};
  const description =
    locale === "en"
      ? `${h.name} (${h.displayDate}): ${h.tagline} Meaning, traditions, wishes and gift ideas.`
      : `${h.name} (${h.displayDate}): ${h.tagline} Ý nghĩa, phong tục, lời chúc và gợi ý quà tặng.`;
  const url = localePath(locale, `/${h.slug}/`);
  return {
    title: h.name,
    description,
    alternates: languageAlternates(locale, `/${h.slug}/`),
    openGraph: {
      title: h.name,
      description,
      url,
      images: [`${siteUrl()}${url}opengraph-image.png`],
    },
    twitter: { card: "summary_large_image", title: h.name, description },
  };
}

function heroBackground(from: string, to: string): string {
  return [
    `radial-gradient(55% 60% at 82% 12%, ${to}66, transparent 70%)`,
    `radial-gradient(45% 55% at 8% 88%, ${from}55, transparent 70%)`,
    `linear-gradient(135deg, ${from}, ${to})`,
  ].join(", ");
}

// Hero bottom edge — a different silhouette per hero style so pages don't
// share the same wave curve.
const HERO_WAVES: Record<string, string> = {
  classic: "M0 60V25c200 28 400 35 600 18S1000 5 1200 30v30z",
  split: "M0 60V34c150-14 300-22 450-10s300 18 450 10 300-8 300 0v26z",
  framed: "M0 60V38c100-18 200-6 300-6s200 18 300 12 300-24 400-14 200 12 200 18v12z",
  poster: "M0 60V20l150 18 150-14 150 20 150-16 150 18 150-14 150 16 150-12v22z",
  mosaic: "M0 60V30c240-20 420 20 600 8s360-28 600 2v20z",
  banner: "M0 60V44h1200v16z",
};

const GALLERY_LAYOUTS = ["masonry", "bento", "strip"] as const;
type GalleryLayout = (typeof GALLERY_LAYOUTS)[number];

function slugHash(s: string): number {
  let n = 0;
  for (let i = 0; i < s.length; i++) n = (n * 31 + s.charCodeAt(i)) >>> 0;
  return n;
}

export default function HolidayPage({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const t = getStrings(locale);
  const holidays = holidaysOf(locale);
  const stories = storiesOf(locale);
  const h = holidayOf(slug, locale);
  if (!h) notFound();
  const lp = (p: string) => localePath(locale, p);

  const idx = holidays.findIndex((x) => x.slug === slug);
  const prev = holidays[(idx - 1 + holidays.length) % holidays.length];
  const next = holidays[(idx + 1) % holidays.length];
  const eventYear = new Date().getFullYear();
  const hero = h.heroStyle ?? "classic";
  // First category drives the page skin (card radius + heading glyph);
  // gallery layout varies by slug so adjacent pages rarely match.
  const skin = h.categories[0] ?? "quoc-te";
  const galleryLayout: GalleryLayout =
    GALLERY_LAYOUTS[slugHash(h.slug) % GALLERY_LAYOUTS.length];

  const jsonLd = holidayJsonLd(h, eventYear, locale, t.footer.home);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* One hydration root owns every scroll-reveal below (`data-rv` markers)
          instead of a client component per section. */}
      <Reveals>
      <div
        data-skin={skin}
        className="contents"
        style={{ "--skin-accent": h.theme.to } as CSSProperties}
      >
      {/* ---------- Hero ---------- */}
      <section
        className="holiday-hero relative overflow-hidden text-white"
        style={{ background: heroBackground(h.theme.from, h.theme.to) }}
      >
        <HImg
          src={`${h.slug}/hero.webp`}
          hero={h.slug}
          lqip={HERO_LQIP[h.slug]}
          tint={HERO_TINT[h.slug]}
          alt={t.holiday.heroAlt(h.name)}
          width={1920}
          height={1280}
          eager
          decoding="sync"
          className={`absolute inset-0 h-full w-full object-cover print:hidden ${
            hero === "banner"
              ? "opacity-60"
              : hero === "poster" || hero === "split" || hero === "mosaic"
                ? "opacity-30"
                : "opacity-45"
          }`}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              hero === "banner"
                ? `linear-gradient(180deg, ${h.theme.from}55 0%, ${h.theme.from}d9 70%, ${h.theme.from}f2 100%)`
                : `linear-gradient(105deg, ${h.theme.from}F2 25%, ${h.theme.from}99 55%, ${h.theme.to}66)`,
          }}
          aria-hidden="true"
        />
        <div className="dot-pattern absolute inset-0" aria-hidden="true" />
        {/* Framed heroes get a double ornamental inset frame — a shrine-like
            window. Decoration only; AA text contrast is unchanged. */}
        {hero === "framed" && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-3 rounded-2xl border border-white/30 sm:inset-5 print:hidden"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[18px] rounded-2xl border border-white/15 sm:inset-7 print:hidden"
            />
          </>
        )}
        <Motif
          name={h.motif}
          className="floaty-slow pointer-events-none absolute -right-10 top-6 h-56 w-56 text-white/15 sm:-right-6 sm:h-80 sm:w-80"
        />
        <Motif
          name={h.motif}
          className="floaty pointer-events-none absolute left-[6%] top-[58%] h-16 w-16 text-white/20 [--r:-12deg]"
        />
        <Motif
          name={h.motif}
          className="floaty pointer-events-none absolute right-[30%] top-[16%] h-10 w-10 text-white/25 [--r:14deg]"
        />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-24 pt-14 sm:px-6 lg:grid-cols-[1.35fr_1fr] lg:pb-28 lg:pt-20">
          <div>
            <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-white/85">
              <span>{h.displayDate}</span>
              {h.categories.map((c) => (
                <span
                  key={c}
                  className="rounded-lg border border-white/30 px-2.5 py-0.5 text-[10px] tracking-widest"
                >
                  {t.grid.categories[c]}
                </span>
              ))}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,5vw+1rem,4.5rem)] font-extrabold leading-[1.05]">
              {h.name}
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/85">{h.tagline}</p>
            <p
              aria-hidden="true"
              className={`pointer-events-none -mb-8 mt-8 select-none font-display font-black leading-none text-white/15 lg:-mb-10 print:hidden ${
                hero === "poster"
                  ? "text-[clamp(6rem,16vw,12rem)] text-white/20"
                  : "text-[clamp(4.5rem,12vw,9rem)]"
              }`}
            >
              {h.dateMark}
            </p>
            {hero === "poster" && (
              <span
                aria-hidden="true"
                className="mt-6 block h-px w-24 bg-white/45"
              />
            )}
          </div>

          <div className="self-center">
            {hero === "split" && (
              <div className="mb-5 hidden rotate-1 overflow-hidden rounded-2xl border border-white/30 shadow-2xl lg:block print:hidden">
                <HImg
                  src={`${h.slug}/card.webp`}
                  thumb={{ slug: h.slug, base: "card" }}
                  alt=""
                  width={960}
                  height={720}
                  sizes="(min-width: 1024px) 30vw, 0px"
                  className="aspect-[4/3] h-auto w-full object-cover"
                />
              </div>
            )}
            {hero === "mosaic" && (
              <div className="mb-5 hidden grid-cols-2 gap-3 lg:grid print:hidden">
                <div className="rotate-1 overflow-hidden rounded-2xl border border-white/30 shadow-2xl">
                  <HImg
                    src={`${h.slug}/card.webp`}
                    thumb={{ slug: h.slug, base: "card" }}
                    alt=""
                    width={960}
                    height={720}
                    sizes="(min-width: 1024px) 15vw, 0px"
                    className="aspect-[3/4] h-full w-full object-cover"
                  />
                </div>
                <div className="-rotate-1 overflow-hidden rounded-2xl border border-white/30 shadow-2xl self-end">
                  <HImg
                    src={`${h.slug}/gallery1.webp`}
                    thumb={{ slug: h.slug, base: "gallery1" }}
                    alt=""
                    width={960}
                    height={720}
                    sizes="(min-width: 1024px) 15vw, 0px"
                    className="aspect-[3/4] h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
            <div className="glass rounded-2xl p-6 shadow-2xl sm:p-7">
              <p className="eyebrow text-white/75">{t.holiday.countdown}</p>
              <div className="mt-4">
                <RuleCountdown rule={h.rule} locale={locale} />
              </div>
              <div className="mt-5 border-t border-white/20 pt-4 print:hidden">
                <HolidayActions
                  name={h.name}
                  slug={h.slug}
                  displayDate={h.displayDate}
                  tagline={h.tagline}
                  rule={h.rule}
                  locale={locale}
                />
              </div>
            </div>
          </div>
        </div>

        <svg
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-10 w-full text-[var(--color-surface)] sm:h-14 print:hidden"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
        >
          <path d={HERO_WAVES[hero] ?? HERO_WAVES.classic} fill="currentColor" />
        </svg>
      </section>

      {/* ---------- Body ---------- */}
      <div className="mx-auto max-w-4xl space-y-20 px-4 pt-16 sm:px-6">
        <div data-rv className="cv-auto">
          <section aria-labelledby="nguon-goc">
            <h2
              id="nguon-goc"
              className="sec-h2 font-display text-3xl font-extrabold text-[var(--color-ink)]"
            >
              {t.holiday.origin}
            </h2>
            <div className="timeline mt-8 space-y-6">
              {h.history.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="timeline-item leading-relaxed text-[var(--color-muted)]"
                >
                  {p}
                </p>
              ))}
            </div>
          </section>
        </div>

        <div data-rv className="cv-auto">
          <figure
            className="relative overflow-hidden rounded-2xl px-8 py-8 text-white sm:px-10"
            style={{
              background: `linear-gradient(120deg, ${h.theme.from}, ${h.theme.to})`,
            }}
          >
            <Motif
              name={h.motif}
              className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 text-white/15"
            />
            <span
              aria-hidden="true"
              className="font-display text-6xl font-black leading-none text-white/40"
            >
              “
            </span>
            <blockquote className="mt-1 max-w-2xl font-display text-xl font-semibold leading-relaxed sm:text-2xl">
              {h.meaning}
            </blockquote>
            <figcaption className="mt-3 text-sm font-semibold uppercase tracking-widest text-white/75">
              {t.holiday.meaningCaption}
            </figcaption>
          </figure>
        </div>

        {/* ---------- Signature sections: the crafted, per-holiday blocks.
            Four kinds — steps / meanings / timeline / legend — each with a
            distinct visual treatment. ---------- */}
        {(h.signature ?? []).map((s, i) => (
          <div data-rv className="cv-auto" key={`${h.slug}-sig-${i}`}>
            {s.kind === "steps" && (
              <section aria-labelledby={`sig-${h.slug}-${i}`}>
                <p className="eyebrow" style={{ color: h.theme.to }}>
                  {t.holiday.signatureSteps}
                </p>
                <h2
                  id={`sig-${h.slug}-${i}`}
                  className="mt-2 sec-h2 font-display text-3xl font-extrabold text-[var(--color-ink)]"
                >
                  {s.title}
                </h2>
                <ol className="steps-ribbon mt-8 space-y-6">
                  {s.steps.map((st, j) => (
                    <li key={st.title} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
                        style={{
                          background: `linear-gradient(135deg, ${h.theme.from}1e, ${h.theme.to}1e)`,
                          borderColor: `${h.theme.to}40`,
                          color: h.theme.to,
                        }}
                      >
                        <Motif name={st.icon} className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-bold text-[var(--color-ink)]">
                          <span
                            aria-hidden="true"
                            className="mr-2 font-display"
                            style={{ color: h.theme.to }}
                          >
                            {String(j + 1).padStart(2, "0")}
                          </span>
                          {st.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">
                          {st.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {s.kind === "meanings" && (
              <section aria-labelledby={`sig-${h.slug}-${i}`}>
                <p className="eyebrow" style={{ color: h.theme.to }}>
                  {t.holiday.signatureMeanings}
                </p>
                <h2
                  id={`sig-${h.slug}-${i}`}
                  className="mt-2 sec-h2 font-display text-3xl font-extrabold text-[var(--color-ink)]"
                >
                  {s.title}
                </h2>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {s.items.map((m) => (
                    <li key={m.title} className="card p-5">
                      <span
                        aria-hidden="true"
                        className="block h-9 w-9 rounded-full border-2 border-white shadow-inner"
                        style={{ background: m.swatch }}
                      />
                      <p className="mt-3 font-bold text-[var(--color-ink)]">
                        {m.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">
                        {m.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {s.kind === "timeline" && (
              <section aria-labelledby={`sig-${h.slug}-${i}`}>
                <p className="eyebrow" style={{ color: h.theme.to }}>
                  {t.holiday.signatureTimeline}
                </p>
                <h2
                  id={`sig-${h.slug}-${i}`}
                  className="mt-2 sec-h2 font-display text-3xl font-extrabold text-[var(--color-ink)]"
                >
                  {s.title}
                </h2>
                <ol
                  className="mt-8 space-y-7 border-l-2 pl-6"
                  style={{ borderColor: `${h.theme.to}55` }}
                >
                  {s.beats.map((b) => (
                    <li key={`${b.year}-${b.title}`}>
                      <span
                        className="inline-block rounded-lg px-2.5 py-1 font-display text-sm font-extrabold text-white"
                        style={{
                          background: `linear-gradient(120deg, ${h.theme.from}, ${h.theme.to})`,
                        }}
                      >
                        {b.year}
                      </span>
                      <p className="mt-2 font-bold text-[var(--color-ink)]">
                        {b.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">
                        {b.text}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {s.kind === "legend" && (
              <section
                aria-labelledby={`sig-${h.slug}-${i}`}
                className="legend-drop relative overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 sm:p-9"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `linear-gradient(140deg, ${h.theme.from}14, transparent 45%, transparent 60%, ${h.theme.to}14)`,
                  }}
                />
                <Motif
                  name={h.motif}
                  className="pointer-events-none absolute -right-6 -top-6 h-36 w-36 text-[var(--color-faint)] opacity-40"
                />
                <div className="relative">
                  <p className="eyebrow" style={{ color: h.theme.to }}>
                    {t.holiday.signatureLegend}
                  </p>
                  <h2
                    id={`sig-${h.slug}-${i}`}
                    className="mt-2 sec-h2 font-display text-3xl font-extrabold text-[var(--color-ink)]"
                  >
                    {s.title}
                  </h2>
                  <p className="legend-lead mt-4 max-w-2xl font-display text-lg font-semibold leading-relaxed text-[var(--color-ink)]">
                    {s.lead}
                  </p>
                  {s.paragraphs.map((p) => (
                    <p
                      key={p.slice(0, 24)}
                      className="mt-4 max-w-3xl leading-relaxed text-[var(--color-muted)]"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            )}
          </div>
        ))}

        {/* ---------- Verified quotes ---------- */}
        {(h.quotes ?? []).length > 0 && (
          <div data-rv className="cv-auto">
            <section aria-labelledby={`quotes-${h.slug}`}>
              <h2
                id={`quotes-${h.slug}`}
                className="sec-h2 font-display text-3xl font-extrabold text-[var(--color-ink)]"
              >
                {t.holiday.quoteTitle}
              </h2>
              <div className="mt-8 space-y-5">
                {h.quotes!.map((q, qi) => (
                  <figure
                    key={qi}
                    className="card relative overflow-hidden p-6 sm:p-8"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-4 top-1 select-none font-display text-5xl font-black"
                      style={{ color: `${h.theme.to}45` }}
                    >
                      “
                    </span>
                    <blockquote className="relative max-w-2xl font-display text-lg font-semibold leading-relaxed text-[var(--color-ink)] sm:text-xl">
                      {q.text}
                    </blockquote>
                    <figcaption className="mt-3 text-sm text-[var(--color-muted)]">
                      <span className="font-bold text-[var(--color-ink)]">
                        {q.author}
                      </span>
                      {q.work && (
                        <>
                          {" — "}
                          <span className="italic">{q.work}</span>
                        </>
                      )}
                      {q.note && (
                        <span className="mt-1 block text-xs text-[var(--color-faint)]">
                          {q.note}
                        </span>
                      )}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          </div>
        )}

      </div>

      {/* ---------- Traditions band: palette-tinted soft wash breaks the
          cream run; each card anchors on the holiday motif pictogram. ---------- */}
      <section
        aria-labelledby="phong-tuc"
        className="mt-16 border-y border-[var(--color-line)]"
        style={{
          background: `linear-gradient(155deg, ${h.theme.from}14, transparent 45%, transparent 55%, ${h.theme.to}12), var(--color-soft)`,
        }}
      >
        <div data-rv className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2
            id="phong-tuc"
            className="sec-h2 font-display text-3xl font-extrabold text-[var(--color-ink)]"
          >
            {t.holiday.traditions}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {h.traditions.map((x, i) => (
              <li
                key={x.title}
                className={`card p-6 ${i === 0 ? "sm:col-span-2 sm:row-span-1" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p
                    aria-hidden="true"
                    className="font-display text-3xl font-black"
                    style={{ color: h.theme.to }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                    style={{
                      background: `${h.theme.to}14`,
                      borderColor: `${h.theme.to}38`,
                      color: h.theme.to,
                    }}
                  >
                    <Motif name={h.motif} className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-2 font-bold text-[var(--color-ink)]">
                  {x.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">
                  {x.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">

        <div data-rv className="cv-auto">
          <section
            aria-labelledby="doc-tron"
            className="relative overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 sm:p-10"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: `linear-gradient(140deg, ${h.theme.from}14, transparent 42%, transparent 62%, ${h.theme.to}14)`,
              }}
            />
            <div className="relative">
              <p className="eyebrow text-[var(--color-brand)]">
                {t.holiday.deepEyebrow}
              </p>
              <h2
                id="doc-tron"
                className="mt-2 sec-h2 font-display text-3xl font-extrabold text-[var(--color-ink)]"
              >
                {t.holiday.deepTitle(h.name)}
              </h2>
              <div className="mt-6 max-w-3xl space-y-4">
                {h.deep.ongNguon.map((p) => (
                  <p
                    key={p.slice(0, 24)}
                    className="leading-relaxed text-[var(--color-muted)]"
                  >
                    {p}
                  </p>
                ))}
              </div>

              <h3 className="mt-10 font-display text-xl font-extrabold text-[var(--color-ink)]">
                {t.holiday.customs}
              </h3>
              <ol className="mt-6 space-y-4">
                {h.deep.phongTuc.map((x) => (
                  <li key={x.title} className="flex gap-4">
                    {x.img ? (
                      <span
                        aria-hidden="true"
                        className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[var(--color-line)]"
                      >
                        <HImg
                          src={`${h.slug}/${x.img}-480.webp`}
                          alt=""
                          width={480}
                          height={360}
                          className="h-full w-full object-cover"
                        />
                      </span>
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
                        style={{
                          background: `linear-gradient(135deg, ${h.theme.from}1e, ${h.theme.to}1e)`,
                          borderColor: `${h.theme.to}40`,
                          color: h.theme.to,
                        }}
                      >
                        <Motif name={h.motif} className="h-5 w-5" />
                      </span>
                    )}
                    <div>
                      <p className="font-bold text-[var(--color-ink)]">
                        {x.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">
                        {x.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {h.deep.amThuc.length > 0 && (
                <>
                  <h3 className="mt-10 font-display text-xl font-extrabold text-[var(--color-ink)]">
                    {t.holiday.cuisine}
                  </h3>
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {h.deep.amThuc.map((a) => (
                      <li
                        key={a.title}
                        className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]"
                      >
                        {a.img && (
                          <LightboxImg
                            slug={h.slug}
                            base={a.img}
                            alt={a.title}
                            caption={a.title}
                            openLabel={t.holiday.viewPhoto(a.title)}
                            closeLabel={t.holiday.closePhoto}
                            sizes="(min-width: 1024px) 272px, (min-width: 640px) 42vw, 86vw"
                            className="aspect-[4/3] h-auto w-full object-cover"
                          />
                        )}
                        <div className="p-5">
                          <p className="font-bold text-[var(--color-ink)]">
                            {a.title}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">
                            {a.text}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <h3 className="mt-10 font-display text-xl font-extrabold text-[var(--color-ink)]">
                {t.holiday.facts}
              </h3>
              <ol className="mt-6 space-y-4">
                {h.deep.facts.map((f, i) => (
                  <li key={f.slice(0, 24)} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="font-display text-3xl font-black leading-none"
                      style={{ color: h.theme.to }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
                      {f}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </div>
      </div>

      {/* ---------- Wishes marquee + cards ---------- */}
      <section
        aria-labelledby="loi-chuc"
        className="cv-auto dot-pattern-ink border-y border-[var(--color-line)] bg-[var(--color-band)]"
      >
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <div data-rv>
            <h2
              id="loi-chuc"
              className="sec-h2 font-display text-3xl font-extrabold text-[var(--color-ink)]"
            >
              {t.holiday.wishes}
            </h2>
          </div>
          <div aria-hidden="true" className="marquee mt-8 print:hidden">
            <div className="marquee-track">
              {[...h.wishes, ...h.wishes].map((w, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] px-5 py-2.5 text-sm text-[var(--color-muted)] shadow-sm"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
          <ul className="mt-8 space-y-3">
            {h.wishes.map((w) => (
              <li
                key={w}
                className="card flex items-start justify-between gap-4 p-5"
              >
                <p className="leading-relaxed text-[var(--color-ink)]">{w}</p>
                <CopyButton
                  text={w}
                  label={t.copy.copy}
                  copiedLabel={t.copy.copied}
                  className="shrink-0 print:hidden"
                />
              </li>
            ))}
          </ul>
          <div data-rv className="print:hidden">
            <h3 className="mt-10 font-display text-xl font-extrabold text-[var(--color-ink)]">
              {t.holiday.wishSuggest}
            </h3>
            <WishGenerator
              holiday={{ slug: h.slug, name: h.name, wishes: h.wishes }}
              locale={locale}
            />
          </div>
        </div>
      </section>

      {/* ---------- Gifts band: same palette-tinted soft wash as the
          traditions band — the two card grids read as siblings. ---------- */}
      <section
        aria-labelledby="qua-tang"
        className="border-b border-[var(--color-line)]"
        style={{
          background: `linear-gradient(205deg, ${h.theme.to}12, transparent 45%, transparent 55%, ${h.theme.from}12), var(--color-soft)`,
        }}
      >
        <div data-rv className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2
            id="qua-tang"
            className="sec-h2 font-display text-3xl font-extrabold text-[var(--color-ink)]"
          >
            {t.holiday.gifts}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {h.gifts.map((g, i) => (
              <li key={g.title} className={`card p-6 ${i === 0 ? "sm:col-span-2" : ""}`}>
                <Motif
                  name={h.motif}
                  className="h-8 w-8"
                  filled
                />
                <p className="mt-3 font-bold text-[var(--color-brand-deep)]">
                  {g.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">
                  {g.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Gallery band: ink-inverted so photos glow; each opens a
          lightbox. ---------- */}
      <section
        aria-labelledby="hinh-anh"
        className="cv-auto relative overflow-hidden bg-[#221b15] print:bg-transparent"
      >
        <Motif
          name={h.motif}
          className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 text-white/10 print:hidden"
        />
        <div data-rv className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2
            id="hinh-anh"
            className="sec-h2 font-display text-3xl font-extrabold text-white print:text-[var(--color-ink)]"
          >
            {t.holiday.images}
          </h2>
          <GalleryGrid
            slug={h.slug}
            layout={galleryLayout}
            items={[1, 2, 3, 4, 5, 6].map((n) => {
              const alt = t.holiday.galleryAlt(h.name, n);
              return {
                base: `gallery${n}`,
                alt,
                openLabel: t.holiday.viewPhoto(alt),
              };
            })}
            labels={{
              closeLabel: t.holiday.closePhoto,
              prevLabel: t.holiday.prevPhoto,
              nextLabel: t.holiday.nextPhoto,
              counter: t.holiday.photoOf,
            }}
          />
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-20 px-4 py-16 sm:px-6">

        {(() => {
          const st = stories[h.slug];
          if (!st) return null;
          return (
            <div data-rv className="cv-auto">
              <section aria-labelledby="cau-chuyen">
                <p className="eyebrow text-[var(--color-brand)]">{t.holiday.storyEyebrow}</p>
                <h2
                  id="cau-chuyen"
                  className="mt-2 sec-h2 font-display text-3xl font-extrabold text-[var(--color-ink)]"
                >
                  {st.story.title}
                </h2>
                <p className="mt-5 max-w-3xl leading-relaxed text-[var(--color-muted)]">
                  {st.story.body}
                </p>
                <h3 className="mt-10 font-display text-xl font-bold text-[var(--color-ink)]">
                  {t.holiday.readMore}
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {st.sources.map((s) => (
                    <li key={s.url} className="card flex flex-col p-5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-brand)]">
                        {s.outlet}
                      </p>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="u-link mt-2 font-display font-bold text-[var(--color-ink)]"
                      >
                        {s.title} ↗
                      </a>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                        {s.summary}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          );
        })()}

        <div data-rv className="cv-auto">
          <section aria-labelledby="faq">
            <h2
              id="faq"
              className="sec-h2 font-display text-3xl font-extrabold text-[var(--color-ink)]"
            >
              {t.holiday.faqTitle}
            </h2>
            <div className="mt-8">
              <Faq items={h.faq} />
            </div>
          </section>
        </div>

        <nav
          aria-label={t.holiday.othersAria}
          className="grid gap-4 border-t border-[var(--color-line)] pt-10 sm:grid-cols-2 print:hidden"
        >
          {[prev, next].map((o, i) => (
            <Link
              key={o.slug}
              href={lp(`/${o.slug}/`)}
              className="card group relative overflow-hidden p-6"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1"
                style={{
                  background: `linear-gradient(90deg, ${o.theme.from}, ${o.theme.to})`,
                }}
              />
              <span className="mt-3 flex items-center gap-4">
                <HImg
                  src={`${o.slug}/card.webp`}
                  thumb={{ slug: o.slug, base: "card" }}
                  alt={o.name}
                  width={480}
                  height={480}
                  sizes="80px"
                  className="h-16 w-16 shrink-0 rounded-xl object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
                />
                <span className="min-w-0">
                  <span className="eyebrow block text-[var(--color-faint)]">
                    {i === 0 ? t.holiday.prev : t.holiday.next}
                  </span>
                  <span className="mt-1 block truncate font-display text-xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-brand-deep)]">
                    {o.name}
                  </span>
                </span>
                <Motif name={o.motif} className="ml-auto h-9 w-9 shrink-0 text-[var(--color-faint)]" />
              </span>
            </Link>
          ))}
        </nav>
      </div>
      </div>
      </Reveals>
    </>
  );
}
