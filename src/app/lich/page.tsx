import type { Metadata } from "next";
import Calendar from "@/components/Calendar";
import { holidays } from "@/data/holidays";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lịch ngày lễ",
  description:
    "Lịch cả năm các ngày lễ Việt Nam và quốc tế — xem ngày dương, ngày âm, lọc theo loại lễ và đăng ký lịch .ics.",
  alternates: { canonical: `${siteUrl()}/lich/` },
  openGraph: {
    title: "Lịch ngày lễ — Ngày Lễ Việt",
    url: `${siteUrl()}/lich/`,
    type: "website",
  },
};

export default function LichPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="eyebrow text-[var(--color-brand)]">Công cụ</p>
      <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold text-[var(--color-ink)]">
        Lịch ngày lễ cả năm
      </h1>
      <p className="mt-3 max-w-xl text-[var(--color-faint)]">
        Ngày dương, ngày âm và tất cả lễ hội trong năm — lọc theo loại hoặc đăng ký cả lịch về máy.
      </p>
      <div className="mt-8">
        <Calendar
          items={holidays.map((h) => ({
            slug: h.slug,
            name: h.name,
            categories: h.categories,
            rule: h.rule,
            theme: { from: h.theme.from },
          }))}
        />
      </div>
    </section>
  );
}
