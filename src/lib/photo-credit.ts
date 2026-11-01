import { imageCredits, type ImageCredit } from "@/data/image-credits";

/**
 * Look up the catalogued credit for public/images/holidays/<slug>/<base>.webp.
 * Returns undefined when the file has no recorded attribution — callers
 * render the credit line only when a record exists.
 */
export function photoCredit(slug: string, base: string): ImageCredit | undefined {
  return imageCredits[slug]?.find((c) => c.file === `${slug}/${base}.webp`);
}
