import type { MotifName } from "@/data/holidays";

const P: Record<MotifName, React.ReactNode> = {
  fireworks: (
    <>
      <circle cx="32" cy="32" r="4" fill="currentColor" />
      {[
        [32, 10, 32, 18],
        [32, 46, 32, 54],
        [10, 32, 18, 32],
        [46, 32, 54, 32],
        [16.4, 16.4, 22, 22],
        [42, 42, 47.6, 47.6],
        [16.4, 47.6, 22, 42],
        [42, 22, 47.6, 16.4],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
      ))}
      <circle cx="14" cy="50" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="50" cy="14" r="2.5" fill="currentColor" stroke="none" />
    </>
  ),
  lantern: (
    <>
      <line x1="32" y1="6" x2="32" y2="12" />
      <rect x="24" y="10" width="16" height="5" rx="2" fill="currentColor" stroke="none" />
      <ellipse cx="32" cy="32" rx="16" ry="17" />
      <path d="M32 15v34M22 17c-3 5-3 25 0 30M42 17c3 5 3 25 0 30" />
      <rect x="24" y="46" width="16" height="5" rx="2" fill="currentColor" stroke="none" />
      <line x1="32" y1="51" x2="32" y2="58" />
      <circle cx="32" cy="59" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  fullmoon: (
    <>
      <circle cx="30" cy="30" r="19" />
      <circle cx="24" cy="26" r="3.2" />
      <circle cx="35" cy="34" r="2.2" />
      <circle cx="29" cy="40" r="1.6" />
      <path d="M48 12l1.8 4.2L54 18l-4.2 1.8L48 24l-1.8-4.2L42 18l4.2-1.8z" fill="currentColor" stroke="none" />
      <path d="M12 50l1.2 2.8L16 54l-2.8 1.2L12 58l-1.2-2.8L8 54l2.8-1.2z" fill="currentColor" stroke="none" />
    </>
  ),
  heart: (
    <path d="M32 54S8 38.5 8 22.8C8 14.5 14.4 9 21.4 9c5 0 8.7 2.9 10.6 6.3C33.9 11.9 37.6 9 42.6 9 49.6 9 56 14.5 56 22.8 56 38.5 32 54 32 54z" />
  ),
  rose: (
    <>
      <path d="M32 30c-5 0-9-3.6-9-8.5C23 16.6 27 13 32 13s9 3.6 9 8.5c0 4.9-4 8.5-9 8.5z" />
      <path d="M32 30c-2.5-1-4-3.4-4-6 0-2.8 1.8-5 4-5s4 2.2 4 5c0 1.6-1 3.4-4 6z" fill="currentColor" stroke="none" />
      <path d="M32 30v24" />
      <path d="M32 40c-6 0-11-3-13-8M32 46c6 0 11-3 13-8" />
    </>
  ),
  temple: (
    <>
      <path d="M8 26c8-3 16-3 24 0 8-3 16-3 24 0-3-8-7-10-12-12-2-1-10-1-12 0-5 2-9 4-12 12z" />
      <path d="M12 34c7-2 14-2 20 0 6-2 13-2 20 0-2-4-5-5-8-6h-24c-3 1-6 2-8 6z" />
      <path d="M18 40v14M28 40v14M36 40v14M46 40v14" />
      <path d="M12 56h40" />
    </>
  ),
  star: (
    <path d="M32 8l7.3 15.2L56 25l-12 11.5 3 16.5-15-8.3-15 8.3 3-16.5L8 25l16.7-1.8z" />
  ),
  wheat: (
    <>
      <path d="M32 56V22" />
      {[
        [32, 12],
        [25, 18],
        [39, 18],
        [24, 27],
        [40, 27],
        [25, 36],
        [39, 36],
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="4.5" ry="8" transform={`rotate(${x === 32 ? 0 : x < 32 ? -35 : 35} ${x} ${y})`} />
      ))}
    </>
  ),
  carnation: (
    <>
      <path d="M32 26c-3.5-6-1.5-14 0-18 1.5 4 3.5 12 0 18z" />
      <path d="M32 26c-7-1-12-6-13-11 4 0 11 3 13 11z" />
      <path d="M32 26c7-1 12-6 13-11-4 0-11 3-13 11z" />
      <circle cx="32" cy="28" r="5" />
      <path d="M32 33v23" />
      <path d="M32 44c-5 1-9-1-11-5M32 48c5 1 9-1 11-5" />
    </>
  ),
  balloon: (
    <>
      <path d="M32 40c-8 0-14-6.3-14-14C18 17.4 24.3 12 32 12s14 5.4 14 14c0 7.7-6 14-14 14z" />
      <path d="M28 40l2 4h4l2-4" />
      <path d="M32 44c-3 4 3 8 0 12" />
      <path d="M25 20c-2 1.5-3 3.5-3 6" />
    </>
  ),
  home: (
    <>
      <path d="M10 32L32 12l22 20" />
      <path d="M15 30v22h34V30" />
      <path d="M32 46s-7-4.6-7-9.4C25 33.7 27.2 32 29.4 32c1.5 0 2.6 1.2 2.6 2.4 0-1.2 1.1-2.4 2.6-2.4 2.2 0 4.4 1.7 4.4 4.6 0 4.8-7 9.4-7 9.4z" fill="currentColor" stroke="none" />
    </>
  ),
  candle: (
    <>
      <path d="M32 14c3 4 4.5 6.5 4.5 9a4.5 4.5 0 11-9 0c0-2.5 1.5-5 4.5-9z" />
      <rect x="25" y="30" width="14" height="22" rx="3" />
      <path d="M22 56h20" />
      <path d="M32 24v6" />
    </>
  ),
  lotus: (
    <>
      <path d="M32 18c3 5 3 11 0 16-3-5-3-11 0-16z" />
      <path d="M20 24c5 2 8 6 9 11-6-1-9-5-9-11z" />
      <path d="M44 24c-5 2-8 6-9 11 6-1 9-5 9-11z" />
      <path d="M12 34c4 2 14 8 20 8s16-6 20-8c-2 8-10 14-20 14s-18-6-20-14z" />
      <path d="M22 52h20" />
    </>
  ),
  flag: (
    <>
      <path d="M14 56V10" />
      <path d="M14 12c8-4 16-4 24 0 6 3 10 3 12 2v20c-8 4-16 4-24 0-6-3-10-3-12-2" />
      <path d="M31 17l2.4 5 5.4.6-4 3.7 1 5.3-4.8-2.7-4.8 2.7 1-5.3-4-3.7 5.4-.6z" fill="currentColor" stroke="none" />
    </>
  ),
  moonstar: (
    <>
      <circle cx="28" cy="30" r="16" />
      <path d="M44 22l8 6-6 2v8l-6-4-6 4v-8l-6-2 8-6z" fill="currentColor" stroke="none" />
      <path d="M22 26a3 3 0 103 3M30 34a2.4 2.4 0 102.4 2.4" />
    </>
  ),
  ribbon: (
    <>
      <path d="M32 18c-4-6-11-8-14-5s-1 9 4 11c-5 2-7 8-4 11s10 1 14-5c4 6 11 8 14 5s1-9-4-11c5-2 7-8 4-11s-10-1-14 5z" />
      <path d="M26 34l-6 22 7-3 5 5 6-22" />
      <path d="M38 34l6 22-7-3-5 5" />
    </>
  ),
  book: (
    <>
      <path d="M32 16c-6-4-14-4-20-2v38c6-2 14-2 20 2 6-4 14-4 20-2V14c-6-2-14-2-20 2z" />
      <path d="M32 16v38" />
      <path d="M18 24c4-1 8-1 10 1M18 32c4-1 8-1 10 1M38 25c2-2 6-2 10-1M38 33c2-2 6-2 10-1" />
    </>
  ),
  medal: (
    <>
      <circle cx="32" cy="34" r="13" />
      <path d="M32 27l2.4 4.9 5.4.7-4 3.7 1 5.3-4.8-2.7-4.8 2.7 1-5.3-4-3.7 5.4-.7z" fill="currentColor" stroke="none" />
      <path d="M24 8l4 13M40 8l-4 13M24 8h16" />
    </>
  ),
  pine: (
    <>
      <path d="M32 10l-8 12h5l-9 12h6l-9 12h30l-9-12h6l-9-12h5z" />
      <path d="M32 46v10" />
      <path d="M32 4l1.2 2.8L36 8l-2.8 1.2L32 12l-1.2-2.8L28 8l2.8-1.2z" fill="currentColor" stroke="none" />
    </>
  ),
};

export default function Motif({
  name,
  className = "",
  filled = false,
}: {
  name: MotifName;
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {P[name]}
    </svg>
  );
}
