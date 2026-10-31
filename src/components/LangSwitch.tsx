"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getStrings, translatePath, type Locale } from "@/i18n";

/**
 * VI|EN toggle. Preserves the current subpath: /tet-nguyen-dan/ ⇄
 * /en/tet-nguyen-dan/. Plain anchors (not router.push) because the two
 * locales live under different root layouts — a full document navigation
 * is the correct, bug-proof behavior here.
 */
export default function LangSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const t = getStrings(locale);
  const target = translatePath(pathname);
  const isVi = locale === "vi";

  return (
    <Link
      href={target}
      prefetch={false}
      aria-label={t.nav.langSwitch}
      hrefLang={isVi ? "en" : "vi"}
      className="flex min-h-11 items-center gap-1 rounded-xl border border-[var(--color-line)] px-3 text-xs font-extrabold tracking-wide text-[var(--color-muted)] hover:bg-[var(--color-soft)] focus-visible:outline-2"
    >
      <span className={isVi ? "text-[var(--color-brand)]" : ""}>VI</span>
      <span aria-hidden="true" className="text-[var(--color-faint)]">
        |
      </span>
      <span className={isVi ? "" : "text-[var(--color-brand)]"}>EN</span>
    </Link>
  );
}
