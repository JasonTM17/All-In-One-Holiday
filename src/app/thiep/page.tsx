import type { Metadata } from "next";
import { Suspense } from "react";
import CardMaker from "@/components/CardMaker";

export const metadata: Metadata = {
  title: "Crear thiệp",
  description: "Crea una thiệp de felicitación para cualquier ngày lễ y descárgala en PNG.",
  robots: { index: false, follow: false },
};

export default function ThiepPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="eyebrow text-[var(--color-brand)]">Công cụ</p>
      <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold text-[var(--color-ink)]">
        Crear thiệp
      </h1>
      <p className="mt-3 max-w-xl text-[var(--color-faint)]">
        Elige el día festivo, una plantilla y personaliza el mensaje. Descarga en PNG.
      </p>
      <div className="mt-8">
        <Suspense fallback={null}>
          <CardMaker />
        </Suspense>
      </div>
    </section>
  );
}
