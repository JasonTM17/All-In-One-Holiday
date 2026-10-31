import { HERO_SRC_W } from "@/data/hero-sizes";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const WIDTHS = [480, 800, 1200, 1600] as const;

/**
 * srcset ladder for a holiday hero. Only advertises generated variants that
 * actually exist (never wider than the source) plus the original hero.webp
 * at its real pixel width — a `w` descriptor must never lie.
 */
export function heroSrcSet(slug: string): string {
  const srcW = HERO_SRC_W[slug] ?? 1920;
  const parts = WIDTHS.filter((w) => w <= srcW).map(
    (w) => `${BASE}/images/holidays/${slug}/hero-${w}.webp ${w}w`,
  );
  parts.push(`${BASE}/images/holidays/${slug}/hero.webp ${srcW}w`);
  return parts.join(", ");
}

export function heroUrl(slug: string, w = 800): string {
  return `${BASE}/images/holidays/${slug}/hero-${w}.webp`;
}

/** srcSet for card.webp / galleryN.webp: generated 480w variant + 960w original. */
export function thumbSrcSet(slug: string, base: string): string {
  return [
    `${BASE}/images/holidays/${slug}/${base}-480.webp 480w`,
    `${BASE}/images/holidays/${slug}/${base}.webp 960w`,
  ].join(", ");
}

type Props = {
  src: string;
  /** When set to the slug, emits a full 480-1600w srcSet for hero.webp. */
  hero?: string;
  /** Optional explicit srcSet (e.g. thumbSrcSet for card/gallery thumbs). */
  srcSet?: string;
  sizes?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  eager?: boolean;
};

/** Plain <img> that stays correct under NEXT_PUBLIC_BASE_PATH on static hosts. */
export default function HImg({ src, hero, srcSet, sizes, alt, width, height, className, eager }: Props) {
  return (
    <img
      src={`${BASE}/images/holidays/${src}`}
      srcSet={srcSet ?? (hero ? heroSrcSet(hero) : undefined)}
      sizes={sizes ?? (hero ? "100vw" : undefined)}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      className={className}
    />
  );
}
