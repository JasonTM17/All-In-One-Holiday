"use client";

import { useSyncExternalStore } from "react";

const isDark = () => document.documentElement.classList.contains("dark");
const subscribe = (cb: () => void) => {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => obs.disconnect();
};

/** Dark/light toggle; persists only the theme choice in localStorage. */
export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
      aria-pressed={dark}
      className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-muted)] hover:bg-[var(--color-soft)] focus-visible:outline-2"
    >
      {dark ? (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-15v3m0 14v3M3 12H0m24 0h-3M5.6 5.6 3.4 3.4m17.2 17.2-2.2-2.2m0-12.8 2.2-2.2M3.4 20.6l2.2-2.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
        </svg>
      )}
    </button>
  );
}
