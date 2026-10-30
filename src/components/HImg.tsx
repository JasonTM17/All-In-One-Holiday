const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const WIDTHS = [480, 800, 1200, 1600] as const;

export function heroSrcSet(slug: string): string {
  const parts = WIDTHS.map(
    (w) => `${BASE}/images/holidays/${slug}/hero-${w}.webp ${w}w`,
  );
  return parts.join(", ");
}

export function heroUrl(slug: string, w = 800): string {
  return `${BASE}/images/holidays/${slug}/hero-${w}.webp`;
}

type Props = {
  src: string;
  /** When set to the slug, emits a full 480-1600w srcSet for hero.webp. */
  hero?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  eager?: boolean;
};

/** Plain <img> that stays correct under NEXT_PUBLIC_BASE_PATH on static hosts. */
export default function HImg({ src, hero, alt, width, height, className, eager }: Props) {
  return (
    <img
      src={`${BASE}/images/holidays/${src}`}
      srcSet={hero ? heroSrcSet(hero) : undefined}
      sizes={hero ? "100vw" : undefined}
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
