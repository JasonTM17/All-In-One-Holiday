import type { Holiday } from "../data/holidays.js";
import type { Messages } from "@/i18n";

/** The minimal holiday shape the generator needs — keeps client props small. */
export type WishHoliday = Pick<Holiday, "slug" | "name" | "wishes">;

export type Tone = "trong" | "vui" | "lang-man" | "gui-me" | "gui-co";

/** Which tones make sense for a holiday. */
export function tonesFor(h: WishHoliday): Tone[] {
  const t: Tone[] = ["trong", "vui"];
  if (["valentine"].includes(h.slug)) t.push("lang-man");
  if (
    ["ngay-cua-me", "vu-lan", "quoc-te-phu-nu", "phu-nu-viet-nam", "nguoi-cao-tuoi"].includes(
      h.slug,
    )
  )
    t.push("gui-me");
  if (["nha-giao-viet-nam"].includes(h.slug)) t.push("gui-co");
  return t;
}

/** Template-based wish variants for a holiday + tone (locale-aware). */
export function makeWishes(
  h: WishHoliday,
  tone: Tone,
  name: string,
  rel: string,
  strings: Messages["wishGen"],
): string[] {
  const n = name.trim() || strings.fallbackName[tone];
  const r = rel.trim() || strings.fallbackRel[tone];
  const base = strings.templates[tone]
    .replace("{name}", n)
    .replace("{holiday}", h.name)
    .replace("{rel}", r);
  const v2 = h.wishes[0] ?? "";
  const v3 = (h.wishes[1] ?? "").replace(/!/g, `, ${n}!`);
  return [base, v2, v3].filter(Boolean);
}
