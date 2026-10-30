import type { Metadata } from "next";
import Link from "next/link";
import { holidays } from "@/data/holidays";
import { siteUrl } from "@/lib/site";
import HolidayGrid from "@/components/HolidayGrid";
import NextHolidayHero from "@/components/NextHolidayHero";
import Reveal from "@/components/Reveal";
import Motif from "@/components/Motif";

export const metadata: Metadata = {
  openGraph: {
    images: [`${siteUrl()}/opengraph-image.png`],
  },
};

export default function Home() {
  const wishCount = holidays.reduce((s, h) => s + h.wishes.length, 0);
  const traditionCount = holidays.reduce((s, h) => s + h.traditions.length, 0);
  const allWishes = holidays.flatMap((h) => h.wishes.slice(0, 2));

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

  const heroItems = holidays.map((h) => ({
    slug: h.slug,
    name: h.name,
    dateMark: h.dateMark,
    motif: h.motif,
    rule: h.rule,
    theme: { from: h.theme.from, to: h.theme.to },
  }));

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
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-950 via-rose-800 to-amber-700 text-white">
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
                className="rounded-full bg-white px-7 py-3.5 font-bold text-[var(--color-brand-deep)] transition-transform hover:scale-[1.03]"
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
          <NextHolidayHero items={heroItems} />
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

      {/* ---------- Wishes marquee ---------- */}
      <div aria-hidden="true" className="marquee border-b border-[var(--color-line)] bg-[#faf6ef] py-5">
        <div className="marquee-track">
          {[...allWishes, ...allWishes].map((w, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-[var(--color-line)] bg-white px-5 py-2 text-sm text-[var(--color-muted)] shadow-sm"
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* ---------- Grid ---------- */}
      <section
        id="danh-sach"
        aria-labelledby="danh-sach-title"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6"
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
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-800 to-violet-800 text-white">
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
            className="rounded-full bg-white px-8 py-3.5 font-bold text-[var(--color-brand-deep)] transition-transform hover:scale-[1.04]"
          >
            Tạo thiệp ngay
          </Link>
        </div>
      </section>
    </>
  );
}
