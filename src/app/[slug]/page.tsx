import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getHoliday, holidays, CATEGORY_LABELS } from "@/data/holidays";
import RuleCountdown from "@/components/RuleCountdown";
import CopyButton from "@/components/CopyButton";
import Faq from "@/components/Faq";

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
    openGraph: { title: h.name, description },
  };
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

  return (
    <>
      <section
        className="dot-pattern text-white"
        style={{
          background: `linear-gradient(135deg, ${h.theme.from}, ${h.theme.to})`,
        }}
      >
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_auto] lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] opacity-80">
              {h.displayDate} · {h.categories.map((c) => CATEGORY_LABELS[c]).join(" · ")}
            </p>
            <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
              {h.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/85">{h.tagline}</p>
            <p
              aria-hidden="true"
              className="mt-6 font-display text-7xl font-black text-white/15 sm:text-8xl"
            >
              {h.dateMark}
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-widest opacity-80">
              Đếm ngược
            </p>
            <RuleCountdown rule={h.rule} />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-16 px-4 py-14 sm:px-6">
        <section aria-labelledby="nguon-goc">
          <h2
            id="nguon-goc"
            className="font-display text-2xl font-bold text-stone-900 sm:text-3xl"
          >
            Nguồn gốc
          </h2>
          {h.history.map((p) => (
            <p key={p.slice(0, 24)} className="mt-4 leading-relaxed text-stone-700">
              {p}
            </p>
          ))}
        </section>

        <section
          aria-labelledby="y-nghia"
          className="rounded-2xl border-l-4 bg-white p-6 shadow-sm"
          style={{ borderColor: h.theme.to }}
        >
          <h2
            id="y-nghia"
            className="font-display text-2xl font-bold text-stone-900"
          >
            Ý nghĩa
          </h2>
          <p className="mt-3 leading-relaxed text-stone-700">{h.meaning}</p>
        </section>

        <section aria-labelledby="phong-tuc">
          <h2
            id="phong-tuc"
            className="font-display text-2xl font-bold text-stone-900 sm:text-3xl"
          >
            Phong tục &amp; hoạt động
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {h.traditions.map((t) => (
              <li
                key={t.title}
                className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
              >
                <p className="font-semibold text-stone-900">{t.title}</p>
                <p className="mt-1 text-sm text-stone-600">{t.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="loi-chuc">
          <h2
            id="loi-chuc"
            className="font-display text-2xl font-bold text-stone-900 sm:text-3xl"
          >
            Lời chúc
          </h2>
          <ul className="mt-6 space-y-3">
            {h.wishes.map((w) => (
              <li
                key={w}
                className="flex items-start justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
              >
                <p className="leading-relaxed text-stone-700">{w}</p>
                <CopyButton text={w} className="shrink-0" />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="qua-tang">
          <h2
            id="qua-tang"
            className="font-display text-2xl font-bold text-stone-900 sm:text-3xl"
          >
            Gợi ý quà tặng
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {h.gifts.map((g) => (
              <li
                key={g.title}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200"
              >
                <p className="font-semibold text-rose-800">{g.title}</p>
                <p className="mt-1 text-sm text-stone-600">{g.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="faq">
          <h2
            id="faq"
            className="font-display text-2xl font-bold text-stone-900 sm:text-3xl"
          >
            Câu hỏi thường gặp
          </h2>
          <div className="mt-6">
            <Faq items={h.faq} />
          </div>
        </section>

        <nav
          aria-label="Ngày lễ khác"
          className="flex flex-col gap-4 border-t border-stone-200 pt-8 sm:flex-row sm:justify-between"
        >
          <Link
            href={`/${prev.slug}/`}
            className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:max-w-xs"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">
              ← Trước
            </span>
            <span className="mt-1 block font-display font-bold text-stone-900 group-hover:text-rose-800">
              {prev.name}
            </span>
          </Link>
          <Link
            href={`/${next.slug}/`}
            className="group rounded-2xl border border-stone-200 bg-white p-5 text-right shadow-sm transition-shadow hover:shadow-md sm:max-w-xs"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">
              Sau →
            </span>
            <span className="mt-1 block font-display font-bold text-stone-900 group-hover:text-rose-800">
              {next.name}
            </span>
          </Link>
        </nav>
      </div>
    </>
  );
}
