import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getHoliday, holidays, CATEGORY_LABELS } from "@/data/holidays";
import { siteUrl } from "@/lib/site";
import { occurrenceInYear } from "@/lib/dates";
import RuleCountdown from "@/components/RuleCountdown";
import CopyButton from "@/components/CopyButton";
import Faq from "@/components/Faq";
import Motif from "@/components/Motif";
import Reveal from "@/components/Reveal";
import HolidayActions from "@/components/HolidayActions";

export function generateStaticParams() {
  return holidays.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const h = getHoliday(slug);
  if (!h) return {};
  const description = `${h.name} (${h.displayDate}): ${h.tagline} Ý nghĩa, phong tục, lời chúc và gợi ý quà tặng.`;
  return {
    title: h.name,
    description,
    alternates: { canonical: `/${h.slug}/` },
    openGraph: {
      title: h.name,
      description,
      url: `/${h.slug}/`,
      images: [`${siteUrl()}/${h.slug}/opengraph-image.png`],
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

export default async function HolidayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const h = getHoliday(slug);
  if (!h) notFound();

  const idx = holidays.findIndex((x) => x.slug === slug);
  const prev = holidays[(idx - 1 + holidays.length) % holidays.length];
  const next = holidays[(idx + 1) % holidays.length];
  const eventYear = new Date().getFullYear();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: h.name,
    description: `${h.name} — ${h.displayDate}. ${h.tagline}`,
    startDate: occurrenceInYear(h.rule, eventYear)
      .toISOString()
      .slice(0, 10),
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "Country", name: "Việt Nam" },
    url: `${siteUrl()}/${h.slug}/`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ---------- Hero ---------- */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: heroBackground(h.theme.from, h.theme.to) }}
      >
        <div className="dot-pattern absolute inset-0" aria-hidden="true" />
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
                  className="rounded-full border border-white/30 px-2.5 py-0.5 text-[10px] tracking-widest"
                >
                  {CATEGORY_LABELS[c]}
                </span>
              ))}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,5vw+1rem,4.5rem)] font-extrabold leading-[1.05]">
              {h.name}
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/85">{h.tagline}</p>
            <p
              aria-hidden="true"
              className="pointer-events-none -mb-8 mt-8 select-none font-display text-[clamp(4.5rem,12vw,9rem)] font-black leading-none text-white/15 lg:-mb-10"
            >
              {h.dateMark}
            </p>
          </div>

          <div className="self-center">
            <div className="glass rounded-3xl p-6 shadow-2xl sm:p-7">
              <p className="eyebrow text-white/75">Đếm ngược</p>
              <div className="mt-4">
                <RuleCountdown rule={h.rule} />
              </div>
              <div className="mt-5 border-t border-white/20 pt-4">
                <HolidayActions
                  name={h.name}
                  slug={h.slug}
                  displayDate={h.displayDate}
                  tagline={h.tagline}
                  rule={h.rule}
                />
              </div>
            </div>
          </div>
        </div>

        <svg
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-10 w-full text-[var(--color-surface)] sm:h-14"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
        >
          <path d="M0 60V25c200 28 400 35 600 18S1000 5 1200 30v30z" fill="currentColor" />
        </svg>
      </section>

      {/* ---------- Body ---------- */}
      <div className="mx-auto max-w-4xl space-y-20 px-4 py-16 sm:px-6">
        <Reveal>
          <section aria-labelledby="nguon-goc">
            <h2
              id="nguon-goc"
              className="font-display text-3xl font-extrabold text-[var(--color-ink)]"
            >
              Nguồn gốc
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
        </Reveal>

        <Reveal>
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
              Ý nghĩa
            </figcaption>
          </figure>
        </Reveal>

        <Reveal>
          <section aria-labelledby="phong-tuc">
            <h2
              id="phong-tuc"
              className="font-display text-3xl font-extrabold text-[var(--color-ink)]"
            >
              Phong tục &amp; hoạt động
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {h.traditions.map((t, i) => (
                <li
                  key={t.title}
                  className={`card p-6 ${i === 0 ? "sm:col-span-2 sm:row-span-1" : ""}`}
                >
                  <p
                    aria-hidden="true"
                    className="font-display text-3xl font-black"
                    style={{ color: h.theme.to }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 font-bold text-[var(--color-ink)]">
                    {t.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">
                    {t.text}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      </div>

      {/* ---------- Wishes marquee + cards ---------- */}
      <section
        aria-labelledby="loi-chuc"
        className="dot-pattern-ink border-y border-[var(--color-line)] bg-[#faf6ef]"
      >
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <Reveal>
            <h2
              id="loi-chuc"
              className="font-display text-3xl font-extrabold text-[var(--color-ink)]"
            >
              Lời chúc
            </h2>
          </Reveal>
          <div aria-hidden="true" className="marquee mt-8">
            <div className="marquee-track">
              {[...h.wishes, ...h.wishes].map((w, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap rounded-full border border-[var(--color-line)] bg-white px-5 py-2.5 text-sm text-[var(--color-muted)] shadow-sm"
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
                <CopyButton text={w} className="shrink-0" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-20 px-4 py-16 sm:px-6">
        <Reveal>
          <section aria-labelledby="qua-tang">
            <h2
              id="qua-tang"
              className="font-display text-3xl font-extrabold text-[var(--color-ink)]"
            >
              Gợi ý quà tặng
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
          </section>
        </Reveal>

        <Reveal>
          <section aria-labelledby="faq">
            <h2
              id="faq"
              className="font-display text-3xl font-extrabold text-[var(--color-ink)]"
            >
              Câu hỏi thường gặp
            </h2>
            <div className="mt-8">
              <Faq items={h.faq} />
            </div>
          </section>
        </Reveal>

        <nav
          aria-label="Ngày lễ khác"
          className="grid gap-4 border-t border-[var(--color-line)] pt-10 sm:grid-cols-2"
        >
          {[prev, next].map((o, i) => (
            <Link
              key={o.slug}
              href={`/${o.slug}/`}
              className="card group relative overflow-hidden p-6"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1"
                style={{
                  background: `linear-gradient(90deg, ${o.theme.from}, ${o.theme.to})`,
                }}
              />
              <span className="eyebrow text-[var(--color-faint)]">
                {i === 0 ? "← Trước" : "Sau →"}
              </span>
              <span className="mt-2 flex items-center justify-between gap-3">
                <span className="font-display text-xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-brand-deep)]">
                  {o.name}
                </span>
                <Motif name={o.motif} className="h-9 w-9 shrink-0 text-stone-400" />
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
