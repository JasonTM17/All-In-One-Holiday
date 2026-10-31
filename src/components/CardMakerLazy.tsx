"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { CardHoliday } from "./CardMaker";

// The maker is the only heavy island on /thiep. It stays out of the static
// HTML (ssr:false) and is only mounted once the placeholder scrolls near the
// viewport AND the main thread is idle — so its chunk fetch, eval and first
// canvas paint never block the initial render.
const CardMaker = dynamic(() => import("./CardMaker"), {
  ssr: false,
  loading: () => <CardMakerSkeleton />,
});

/** Same box geometry as the real maker so mounting never shifts layout. */
export function CardMakerSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid animate-pulse gap-8 lg:grid-cols-[1fr_1.1fr]"
    >
      <div className="h-[34rem] rounded-2xl bg-[var(--color-soft)]/60" />
      <div className="aspect-[1080/1350] max-h-[34rem] w-full rounded-2xl bg-[var(--color-soft)]/60" />
    </div>
  );
}

export default function CardMakerLazy({ items }: { items: CardHoliday[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    let idleId: number | undefined;
    let timer: number | undefined;

    const mount = () => {
      if (!cancelled) setShow(true);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        if (typeof window.requestIdleCallback === "function") {
          idleId = window.requestIdleCallback(mount, { timeout: 2500 });
        } else {
          timer = window.setTimeout(mount, 800);
        }
      },
      // Mount a viewport-and-a-half early so real users never see the swap.
      { rootMargin: "400px 0px" },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={ref}>{show ? <CardMaker items={items} /> : <CardMakerSkeleton />}</div>
  );
}
