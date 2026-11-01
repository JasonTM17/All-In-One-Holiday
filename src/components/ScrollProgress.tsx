"use client";

import { useEffect, useRef } from "react";

/**
 * Hairline reading-progress bar — a scaleX transform driven by scroll,
 * painted inside whatever positioned parent renders it (the sticky TOC).
 * Respects the compositor: no layout work, one rAF per scroll frame.
 */
export default function ScrollProgress({ color }: { color: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, doc.scrollTop / max) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden"
    >
      <div
        ref={bar}
        className="h-full w-full origin-left scale-x-0 will-change-transform"
        style={{ background: color }}
      />
    </div>
  );
}
