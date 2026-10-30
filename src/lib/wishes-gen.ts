import type { Holiday } from "@/data/holidays";

export type Tone = "trong" | "vui" | "lang-man" | "gui-me" | "gui-co";

export const TONE_LABEL: Record<Tone, string> = {
  trong: "Trang trọng",
  vui: "Vui vẻ",
  "lang-man": "Lãng mạn",
  "gui-me": "Gửi mẹ",
  "gui-co": "Gửi cô giáo",
};

/** Which tones make sense for a holiday. */
export function tonesFor(h: Holiday): Tone[] {
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

const TEMPLATE: Record<Tone, string> = {
  trong: "Kính gửi {name}, nhân dịp {holiday}, kính chúc {rel} sức khỏe, bình an và thật nhiều niềm vui. Trân trọng!",
  vui: "{name} ơi, {holiday} rồi! Chúc {rel} luôn khỏe, luôn cười và gặp toàn điều tuyệt vời nhé!",
  "lang-man": "Gửi {name} yêu dấu — ngày {holiday} này anh/em chỉ muốn nói: có {rel} là điều quý giá nhất. Yêu thật nhiều!",
  "gui-me": "Mẹ {name} kính yêu, nhân {holiday}, con chúc mẹ luôn khỏe mạnh, an vui. Con thương mẹ nhiều lắm!",
  "gui-co": "Kính gửi cô {name}, nhân {holiday}, em kính chúc cô sức khỏe dồi dào và luôn giữ ngọn lửa nghề. Em cảm ơn cô!",
};

/** Template-based wish variants for a holiday + tone. */
export function makeWishes(
  h: Holiday,
  tone: Tone,
  name: string,
  rel: string,
): string[] {
  const n = name.trim() || (tone === "gui-me" ? "của con" : tone === "gui-co" ? "ả" : "bạn");
  const r = rel.trim() || (tone === "gui-me" ? "mẹ" : tone === "gui-co" ? "cô" : "bạn");
  const base = TEMPLATE[tone]
    .replace("{name}", n)
    .replace("{holiday}", h.name)
    .replace("{rel}", r);
  const v2 = h.wishes[0] ?? "";
  const v3 = (h.wishes[1] ?? "").replace(/!/g, `, ${n}!`);
  return [base, v2, v3].filter(Boolean);
}
