const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  eager?: boolean;
};

/** Plain <img> that stays correct under NEXT_PUBLIC_BASE_PATH on static hosts. */
export default function HImg({ src, alt, width, height, className, eager }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${BASE}/images/holidays/${src}`}
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
