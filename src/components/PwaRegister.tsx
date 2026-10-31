"use client";

import { useEffect, useState } from "react";
import { getStrings, type Locale } from "@/i18n";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type BipEvent = Event & { prompt: () => Promise<void> };

const onIdle = (cb: () => void) => {
  const ric = (
    window as {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout: number },
      ) => number;
    }
  ).requestIdleCallback;
  if (ric) ric(cb, { timeout: 4000 });
  else window.setTimeout(cb, 2000);
};

/**
 * Shows "Cài đặt ứng dụng" only when the browser offers install.
 * Service-worker registration is deferred to post-load idle time so it never
 * competes with first paint or hydration.
 */
export default function PwaRegister({ locale }: { locale: Locale }) {
  const t = getStrings(locale);
  const [installEvt, setInstallEvt] = useState<BipEvent | null>(null);

  useEffect(() => {
    const onBip = (e: Event) => {
      e.preventDefault();
      setInstallEvt(e as BipEvent);
    };
    window.addEventListener("beforeinstallprompt", onBip);

    const register = () => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register(`${BASE}/sw.js`, { scope: `${BASE}/` })
          .catch(() => {});
      }
    };
    if (document.readyState === "complete") {
      onIdle(register);
    } else {
      window.addEventListener("load", () => onIdle(register), { once: true });
    }
    return () => window.removeEventListener("beforeinstallprompt", onBip);
  }, []);

  if (!installEvt) return null;
  return (
    <button
      type="button"
      onClick={() => installEvt.prompt().then(() => setInstallEvt(null))}
      className="min-h-11 rounded-xl border border-[var(--color-line)] px-4 text-sm font-bold text-[var(--color-muted)] hover:bg-[var(--color-soft)] focus-visible:outline-2"
    >
      {t.nav.installApp}
    </button>
  );
}
