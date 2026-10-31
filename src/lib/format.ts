import { intlLocale, type Locale } from "@/i18n";

const fmtFull: Partial<Record<Locale, Intl.DateTimeFormat>> = {};
const fmtShort: Partial<Record<Locale, Intl.DateTimeFormat>> = {};

function fullFmt(locale: Locale): Intl.DateTimeFormat {
  return (fmtFull[locale] ??= new Intl.DateTimeFormat(intlLocale(locale), {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }));
}

function shortFmt(locale: Locale): Intl.DateTimeFormat {
  return (fmtShort[locale] ??= new Intl.DateTimeFormat(intlLocale(locale), {
    day: "numeric",
    month: "numeric",
  }));
}

/** VI: "Thứ ba, ngày 17 tháng 2 năm 2026" · EN: "Tuesday, February 17, 2026" */
export function formatFull(d: Date, locale: Locale = "vi"): string {
  return fullFmt(locale).format(d);
}

/** "17/2" (VI) · "2/17" (EN) */
export function formatDayMonth(d: Date, locale: Locale = "vi"): string {
  return shortFmt(locale).format(d);
}
