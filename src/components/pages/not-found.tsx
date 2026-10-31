// Shared 404 body for both locale route groups.
import Link from "next/link";
import { getStrings, localePath, type Locale } from "@/i18n";

export default function NotFoundPage({ locale }: { locale: Locale }) {
  const t = getStrings(locale);
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="font-display text-7xl font-black text-[var(--color-brand-deep)]">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-[var(--color-ink)]">
        {t.meta.notFoundTitle}
      </h1>
      <Link
        href={localePath(locale, "/")}
        className="mt-8 rounded-full bg-[var(--color-brand)] px-6 py-3 font-semibold text-[var(--color-on-brand)] hover:bg-[var(--color-brand-deep)]"
      >
        {t.meta.notFoundBack}
      </Link>
    </section>
  );
}
