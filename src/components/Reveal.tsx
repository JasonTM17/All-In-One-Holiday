"use client";

import { useLayoutEffect, useRef } from "react";

// One shared observer for every Reveal on the page — per-element delay lives
// in a WeakMap so the observer callback can resolve it.
const delays = new WeakMap<Element, number>();
let io: IntersectionObserver | null = null;

function sharedObserver(): IntersectionObserver {
  io ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          el.style.transitionDelay = `${delays.get(el) ?? 0}ms`;
          el.classList.add("rv-in");
          el.classList.remove("rv-prep");
          io!.unobserve(el);
          delays.delete(el);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );
  return io;
}

/**
 * Scroll-reveal wrapper. Content renders visible in SSR HTML; on the client,
 * the element is hidden before paint and revealed on intersection. Without JS
 * or with reduced motion, content is simply always visible.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("rv-prep");
    delays.set(el, delay);
    sharedObserver().observe(el);
    return () => {
      io?.unobserve(el);
      delays.delete(el);
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
