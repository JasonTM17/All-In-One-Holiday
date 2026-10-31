"use client";

import { useLayoutEffect, useRef } from "react";

const delays = new WeakMap<Element, number>();

/**
 * One hydration root for every scroll-reveal on the page: descendants marked
 * with `data-rv` (optionally `data-rv="<delay ms>"`) are hidden just before
 * paint and revealed on intersection. Content renders visible in SSR HTML;
 * without JS or with reduced motion it simply stays visible.
 */
export default function Reveals({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = root.querySelectorAll<HTMLElement>("[data-rv]");
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.transitionDelay = `${delays.get(el) ?? 0}ms`;
            el.classList.add("rv-in");
            el.classList.remove("rv-prep");
            io.unobserve(el);
            delays.delete(el);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    for (const el of els) {
      el.classList.add("rv-prep");
      delays.set(el, Number((el as HTMLElement).dataset.rv) || 0);
      io.observe(el);
    }
    return () => {
      io.disconnect();
      for (const el of els) delays.delete(el);
    };
  }, []);

  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  );
}
