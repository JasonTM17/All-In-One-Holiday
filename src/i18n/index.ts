import { en } from "./en";
import { vi } from "./vi";
import type { Locale, Messages } from "./types";

export type { Locale, Messages } from "./types";

export const LOCALES: Locale[] = ["vi", "en"];
export const DEFAULT_LOCALE: Locale = "vi";

const MESSAGES: Record<Locale, Messages> = { vi, en };

/** All UI strings for a locale. */
export function getStrings(locale: Locale): Messages {
  return MESSAGES[locale];
}

/**
 * URL prefix for a locale. Vietnamese stays at the site root (""),
 * English lives under "/en".
 */
export function localePrefix(locale: Locale): string {
  return locale === "en" ? "/en" : "";
}

/**
 * Build a locale-aware path. localePath("en", "/lich/") -> "/en/lich/";
 * localePath("vi", "/") -> "/".
 */
export function localePath(locale: Locale, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return `/en${p === "/" ? "/" : p}`;
  return p;
}

/** Locale code understood by Intl APIs: "vi-VN" | "en-US". */
export function intlLocale(locale: Locale): string {
  return locale === "en" ? "en-US" : "vi-VN";
}

/** The other locale, used by the language switch and hreflang pairs. */
export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "vi" : "en";
}

/**
 * Translate a pathname from one locale to the other, preserving the
 * subpath: "/" <-> "/en/", "/tet-nguyen-dan/" <-> "/en/tet-nguyen-dan/".
 */
export function translatePath(pathname: string): string {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const rest = pathname.slice(3); // drop "/en"
    return rest === "" ? "/" : rest;
  }
  return pathname === "/" ? "/en/" : `/en${pathname}`;
}
