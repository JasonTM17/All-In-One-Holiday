import { HERO_SRC_W } from "@/data/hero-sizes";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const WIDTHS = [480, 800, 1200, 1600] as const;

/** Pixel widths that exist on disk for a hero: derived rungs + source width. */
function heroRungs(slug: string): number[] {
  const srcW = HERO_SRC_W[slug] ?? 1920;
  return [...WIDTHS.filter((w) => w < srcW), srcW];
}

function heroFile(slug: string, w: number, ext: "webp" | "avif"): string {
  const srcW = HERO_SRC_W[slug] ?? 1920;
  const stem = w === srcW ? "hero" : `hero-${w}`;
  return `${BASE}/images/holidays/${slug}/${stem}.${ext}`;
}

/**
 * srcset ladder for a holiday hero. Only advertises generated variants that
 * actually exist (never wider than the source) plus the original at its real
 * pixel width — a `w` descriptor must never lie and never repeat.
 */
export function heroSrcSet(
  slug: string,
  ext: "webp" | "avif" = "webp",
): string {
  return heroRungs(slug)
    .map((w) => `${heroFile(slug, w, ext)} ${w}w`)
    .join(", ");
}

export function heroUrl(slug: string, w = 800): string {
  return `${BASE}/images/holidays/${slug}/hero-${w}.webp`;
}

/** srcSet for card.webp / galleryN.webp: generated 480w variant + 960w original. */
export function thumbSrcSet(
  slug: string,
  base: string,
  ext: "webp" | "avif" = "webp",
): string {
  return [
    `${BASE}/images/holidays/${slug}/${base}-480.${ext} 480w`,
    `${BASE}/images/holidays/${slug}/${base}.${ext} 960w`,
  ].join(", ");
}

type Props = {
  src: string;
  /** When set to the slug, emits the full hero ladder for webp + avif. */
  hero?: string;
  /** card/gallery thumb: emits the 480w+960w ladder for webp + avif. */
  thumb?: { slug: string; base: string };
  /** Explicit webp srcSet escape hatch (avif derived via thumb/hero props). */
  srcSet?: string;
  avifSrcSet?: string;
  sizes?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  eager?: boolean;
  /** sync keeps an already-local LCP image on the first paint frame. */
  decoding?: "async" | "sync";
  /** base64 data-URI painted behind the img while it loads (LCP heroes). */
  lqip?: string;
  /** hex background placeholder (cheap fallback when no lqip is passed). */
  tint?: string;
};

/**
 * <picture> + <img> that serves avif first with a webp fallback and stays
 * correct under NEXT_PUBLIC_BASE_PATH on static hosts.
 */
export default function HImg({
  src,
  hero,
  thumb,
  srcSet,
  avifSrcSet,
  sizes,
  alt,
  width,
  height,
  className,
  eager,
  decoding,
  lqip,
  tint,
}: Props) {
  const webpSet =
    srcSet ??
    (hero
      ? heroSrcSet(hero)
      : thumb
        ? thumbSrcSet(thumb.slug, thumb.base)
        : undefined);
  const avifSet =
    avifSrcSet ??
    (hero
      ? heroSrcSet(hero, "avif")
      : thumb
        ? thumbSrcSet(thumb.slug, thumb.base, "avif")
        : undefined);
  const sizesAttr = sizes ?? (hero ? "100vw" : undefined);
  // Single-file images (e.g. scenery/hero-480.webp) still get an avif
  // <source>: gen-thumbs writes a .avif twin for every file it produces.
  const singleAvif =
    !avifSet && src.endsWith(".webp")
      ? `${BASE}/images/holidays/${src.replace(/\.webp$/, ".avif")}`
      : null;

  const img = (
    <img
      src={`${BASE}/images/holidays/${src}`}
      srcSet={webpSet}
      sizes={sizesAttr}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding={decoding ?? "async"}
      className={className}
      style={
        lqip || tint
          ? {
              backgroundColor: tint,
              backgroundImage: lqip ? `url("${lqip}")` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    />
  );

  const avif = avifSet ?? singleAvif;
  if (!avif) return img;
  return (
    <picture>
      <source type="image/avif" srcSet={avif} sizes={avifSet ? sizesAttr : undefined} />
      {img}
    </picture>
  );
}
