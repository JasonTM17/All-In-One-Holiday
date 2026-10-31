import type { Metadata } from "next";
import Link from "next/link";
import { holidays } from "@/data/holidays";
import { siteUrl } from "@/lib/site";
import HolidayGrid from "@/components/HolidayGrid";
import NextHolidayHero from "@/components/NextHolidayHero";
import Reveal from "@/components/Reveal";
import { heroSrcSet, thumbSrcSet } from "@/components/HImg";
import { nextOccurrence } from "@/lib/dates";
import Motif from "@/components/Motif";

export const metadata: Metadata = {
  openGraph: {
    images: [`${siteUrl()}/opengraph-image.png`],
  },
};

export default function Home() {
  const wishCount = holidays.reduce((s, h) => s + h.wishes.length, 0);
  const traditionCount = holidays.reduce((s, h) => s + h.traditions.length, 0);
  // ~20 chips are plenty for a continuous marquee (track ×2 ≫ viewport).
  const allWishes = holidays.flatMap((h) => h.wishes.slice(0, 2)).slice(0, 20);

  const gridItems = holidays.map((h) => ({
    slug: h.slug,
    name: h.name,
    dateMark: h.dateMark,
    displayDate: h.displayDate,
    motif: h.motif,
    categories: h.categories,
    rule: h.rule,
    theme: h.theme,
    tagline: h.tagline,
  }));



  const now = new Date();
  const next90 = holidays
    .map((h) => ({ h, date: nextOccurrence(h.rule, now) }))
    .filter((x) => x.date.getTime() - now.getTime() <= 90 * 86400000)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ngày Lễ Việt",
    url: `${siteUrl()}/`,
    description:
      "Lịch các ngày lễ Việt Nam và quốc tế: đếm ngược, ý nghĩa, phong tục và lời chúc.",
    inLanguage: "vi",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ---------- Hero ---------- */}
      {}
      <link
        rel="preload"
        as="image"
        href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/holidays/scenery/hero.webp`}
        imageSrcSet={heroSrcSet("scenery")}
        imageSizes="100vw"
        fetchPriority="high"
      />
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-950 via-rose-800 to-amber-700 text-white">
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/holidays/scenery/hero.webp`}
          srcSet={heroSrcSet("scenery")}
          sizes="100vw"
          alt=""
          width={1920}
          height={1280}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-rose-950/90 via-rose-900/75 to-amber-800/55"
          aria-hidden="true"
        />
        <div className="dot-pattern absolute inset-0" aria-hidden="true" />
        <Motif
          name="lantern"
          className="floaty-slow pointer-events-none absolute -left-8 top-10 h-40 w-40 text-white/10"
        />
        <Motif
          name="fireworks"
          className="floaty pointer-events-none absolute right-[42%] top-14 h-14 w-14 text-white/20 [--r:10deg]"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div>
            <p className="eyebrow text-amber-200">Lịch lễ hội Việt Nam</p>
            <h1 className="mt-4 font-display text-[clamp(2.6rem,5.5vw+1rem,5rem)] font-extrabold leading-[1.02]">
              Mỗi ngày lễ, một lời yêu thương.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/85">
              Đếm ngược các ngày lễ Việt Nam và quốc tế, khám phá ý nghĩa,
              phong tục và những lời chúc sẵn sàng gửi đi.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#danh-sach"
                className="rounded-full bg-white px-7 py-3.5 font-bold text-[var(--color-brand-ink)] transition-transform hover:scale-[1.03]"
              >
                Xem các ngày lễ
              </a>
              <Link
                href="/birthday/"
                className="glass rounded-full px-7 py-3.5 font-bold text-white transition-colors hover:bg-white/25"
              >
                Tạo thiệp sinh nhật
              </Link>
            </div>
          </div>
          {/* NextHolidayHero uses a subset of GridItem — sharing the array
              means the flight payload serializes it only once. */}
          <NextHolidayHero items={gridItems} />
        </div>

        {/* Stats strip fused into hero edge */}
        <div className="relative border-t border-white/15">
          <dl className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-white/15 px-4 sm:px-6">
            {[
              { v: `${holidays.length}`, l: "Ngày lễ" },
              { v: `${wishCount}`, l: "Lời chúc sẵn có" },
              { v: `${traditionCount}`, l: "Phong tục" },
            ].map((s) => (
              <div key={s.l} className="px-3 py-5 text-center sm:py-7">
                <dd className="font-display text-3xl font-extrabold tabular-nums sm:text-4xl">
                  {s.v}
                </dd>
                <dt className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-white/65 sm:text-xs">
                  {s.l}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Tools row ---------- */}
      <section aria-label="Công cụ" className="cv-auto border-b border-[var(--color-line)] bg-[var(--color-surface)]">
        <div className="mx-auto grid max-w-6xl gap-3 px-4 py-8 sm:grid-cols-3 sm:px-6">
          {[
            { href: "/lich/", t: "Lịch ngày lễ", d: "Ngày dương, ngày âm, đăng ký .ics" },
            { href: "/thiep/", t: "Tạo thiệp", d: "6 mẫu, tải PNG miễn phí" },
            { href: "/birthday/", t: "Thiệp sinh nhật", d: "Cá nhân hóa qua liên kết" },
          ].map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="card group flex items-center justify-between gap-4 p-5 transition-transform hover:-translate-y-0.5 focus-visible:outline-2"
            >
              <div>
                <p className="font-display text-lg font-extrabold text-[var(--color-ink)] group-hover:text-[var(--color-brand-deep)]">
                  {tool.t}
                </p>
                <p className="mt-0.5 text-sm text-[var(--color-faint)]">{tool.d}</p>
              </div>
              <span aria-hidden="true" className="text-xl text-[var(--color-brand)] transition-transform group-hover:translate-x-1">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- Wishes marquee ---------- */}
      <div aria-hidden="true" className="marquee border-b border-[var(--color-line)] bg-[var(--color-band)] py-5">
        <div className="marquee-track">
          {[...allWishes, ...allWishes].map((w, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-[var(--color-line)] bg-[var(--color-card)] px-5 py-2 text-sm text-[var(--color-muted)] shadow-sm"
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* ---------- Vietnam scenery strip ---------- */}
      <section
        aria-labelledby="viet-nam"
        className="cv-auto border-b border-[var(--color-line)] bg-[var(--color-band)]"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <Reveal>
            <p className="eyebrow text-[var(--color-brand)]">Việt Nam</p>
            <h2
              id="viet-nam"
              className="mt-3 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold text-[var(--color-ink)]"
            >
              Đất nước của những lễ hội
            </h2>
          </Reveal>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              ["scenery/hero-480.webp", "Vịnh Hạ Long"],
              ["scenery/gallery1-480.webp", "Miền Tây sông nước"],
              ["home-hero/gallery2-480.webp", "Hội An rực đèn"],
              ["scenery/gallery3-480.webp", "Đảo đá vôi"],
              ["scenery/card-480.webp", "Đà Lạt về đêm"],
              ["gio-to-hung-vuong/hero-480.webp", "Đền Hùng, Phú Thọ"],
            ].map(([src, cap]) => (
              <li key={src} className="group relative overflow-hidden rounded-2xl">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/holidays/${src}`}
                  alt={cap}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8 text-xs font-bold text-white">
                  {cap}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Women's days band ---------- */}
      <section
        aria-labelledby="phai-dep"
        className="cv-auto dot-pattern-ink border-b border-[var(--color-line)] bg-[var(--color-band)]"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <Reveal>
            <p className="eyebrow text-[var(--color-brand)]">Dành cho phái đẹp</p>
            <h2
              id="phai-dep"
              className="mt-3 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold text-[var(--color-ink)]"
            >
              Những ngày tôn vinh phụ nữ
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {holidays
              .filter((h) => h.categories.includes("phu-nu"))
              .map((h) => (
                <li key={h.slug}>
                  <Link
                    href={`/${h.slug}/`}
                    className="card group block h-full overflow-hidden"
                  >
                    <div
                      className="relative flex h-24 items-center justify-center overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${h.theme.from}, ${h.theme.to})`,
                      }}
                    >
                      <img
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/holidays/${h.slug}/card.webp`}
                        srcSet={thumbSrcSet(h.slug, "card")}
                        sizes="(min-width: 1024px) 270px, (min-width: 640px) 46vw, 92vw"
                        alt=""
                        width={800}
                        height={600}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover opacity-50"
                      />
                      <Motif
                        name={h.motif}
                        className="pointer-events-none absolute -right-3 -top-3 h-16 w-16 text-white/20 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                      />
                      <span className="font-display text-2xl font-extrabold text-white">
                        {h.dateMark}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="font-display font-bold text-[var(--color-ink)] group-hover:text-[var(--color-brand-deep)]">
                        {h.name}
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--color-faint)]">
                        {h.displayDate}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      {/* ---------- Next 90 days timeline ---------- */}
      <section
        aria-labelledby="sap-toi"
        className="cv-auto border-b border-[var(--color-line)] bg-[var(--color-surface)]"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <Reveal>
            <p className="eyebrow text-[var(--color-brand)]">Sắp tới</p>
            <h2
              id="sap-toi"
              className="mt-3 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold text-[var(--color-ink)]"
            >
              Trong 90 ngày tới
            </h2>
          </Reveal>
          <ol className="mt-8 space-y-0">
            {next90.map(({ h, date }) => (
              <li key={h.slug} className="group relative flex gap-5 pb-8 last:pb-0">
                <span className="absolute left-[13px] top-8 h-full w-px bg-[var(--color-line)] last:hidden" aria-hidden="true" />
                <span
                  className="relative z-10 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-extrabold text-[var(--color-ink)]"
                  style={{ borderColor: h.theme.from }}
                  aria-hidden="true"
                >
                  {h.dateMark.slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <Link
                      href={`/${h.slug}/`}
                      className="u-link font-display text-lg font-extrabold text-[var(--color-ink)] hover:text-[var(--color-brand-deep)]"
                    >
                      {h.name}
                    </Link>
                    <time className="text-sm font-bold text-[var(--color-faint)]">
                      {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
                    </time>
                    <span className="rounded-full bg-[var(--color-soft)] px-2.5 py-0.5 text-xs font-bold text-[var(--color-muted)]">
                      còn {Math.round((date.getTime() - now.getTime()) / 86400000)} ngày
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-sm text-[var(--color-faint)]">{h.tagline}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Grid ---------- */}
      <section
        id="danh-sach"
        aria-labelledby="danh-sach-title"
        className="cv-tall mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6"
      >
        <Reveal>
          <h2
            id="danh-sach-title"
            className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold text-[var(--color-ink)]"
          >
            Các ngày lễ trong năm
          </h2>
          <p className="mb-10 mt-3 max-w-xl leading-relaxed text-[var(--color-muted)]">
            Sắp xếp theo ngày gần nhất — bấm vào từng ngày lễ để xem ý nghĩa,
            phong tục và lời chúc.
          </p>
        </Reveal>
        <HolidayGrid items={gridItems} />
      </section>

      {/* ---------- Birthday CTA ---------- */}
      <section className="cv-auto relative overflow-hidden bg-gradient-to-br from-rose-800 to-violet-800 text-white">
        <div className="dot-pattern absolute inset-0" aria-hidden="true" />
        <Motif
          name="balloon"
          className="floaty pointer-events-none absolute left-[8%] top-8 h-24 w-24 text-white/15 [--r:-8deg]"
        />
        <Motif
          name="heart"
          className="floaty-slow pointer-events-none absolute right-[10%] bottom-8 h-20 w-20 text-white/15"
          filled
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6">
          <h2 className="max-w-2xl font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold">
            Sinh nhật ai đó sắp đến?
          </h2>
          <p className="max-w-xl leading-relaxed text-white/85">
            Tạo thiệp sinh nhật cá nhân trong vài giây — có đếm ngược, pháo
            giấy và liên kết để chia sẻ.
          </p>
          <Link
            href="/birthday/"
            className="rounded-full bg-white px-8 py-3.5 font-bold text-[var(--color-brand-ink)] transition-transform hover:scale-[1.04]"
          >
            Tạo thiệp ngay
          </Link>
        </div>
      </section>
    </>
  );
}
