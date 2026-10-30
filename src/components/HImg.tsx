const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Props = {
  src: string;
  /** Optional 800w variant — emits a srcSet so small screens skip the big file. */
  sm?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  eager?: boolean;
};

/** Plain <img> that stays correct under NEXT_PUBLIC_BASE_PATH on static hosts. */
export default function HImg({ src, sm, alt, width, height, className, eager }: Props) {
  return (
    <img
      src={`${BASE}/images/holidays/${src}`}
      srcSet={
        sm
          ? `${BASE}/images/holidays/${sm} 800w, ${BASE}/images/holidays/${src} 1600w`
          : undefined
      }
      sizes={sm ? "100vw" : undefined}
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
