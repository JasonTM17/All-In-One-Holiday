import type { Metadata } from "next";
import { Suspense } from "react";
import CardMakerLazy, { CardMakerSkeleton } from "@/components/CardMakerLazy";
import { holidays } from "@/data/holidays";

export const metadata: Metadata = {
  title: "Tạo thiệp",
  description: "Tạo thiệp chúc mừng cho bất kỳ ngày lễ nào và tải về dạng PNG.",
  robots: { index: false, follow: false },
};

export default function ThiepPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="eyebrow text-[var(--color-brand)]">Công cụ</p>
      <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold text-[var(--color-ink)]">
        Tạo thiệp
      </h1>
      <p className="mt-3 max-w-xl text-[var(--color-faint)]">
        Chọn ngày lễ, kiểu thiệp và lời nhắn — tải về dạng PNG.
      </p>
      <div className="mt-8">
        <Suspense fallback={<CardMakerSkeleton />}>
          <CardMakerLazy
            items={holidays.map((h) => ({
              slug: h.slug,
              name: h.name,
              dateMark: h.dateMark,
              wishes: h.wishes,
              theme: { from: h.theme.from, to: h.theme.to },
            }))}
          />
        </Suspense>
      </div>
    </section>
  );
}
