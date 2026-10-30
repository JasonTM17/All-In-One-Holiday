"use client";

import { useEffect, useState } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type BipEvent = Event & { prompt: () => Promise<void> };

/** Registers sw.js; shows "Cài đặt ứng dụng" only when the browser offers install. */
export default function PwaRegister() {
  const [installEvt, setInstallEvt] = useState<BipEvent | null>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register(`${BASE}/sw.js`, { scope: `${BASE}/` }).catch(() => {});
    }
    const onBip = (e: Event) => {
      e.preventDefault();
      setInstallEvt(e as BipEvent);
    };
    window.addEventListener("beforeinstallprompt", onBip);
    return () => window.removeEventListener("beforeinstallprompt", onBip);
  }, []);

  if (!installEvt) return null;
  return (
    <button
      type="button"
      onClick={() => installEvt.prompt().then(() => setInstallEvt(null))}
      className="min-h-11 rounded-full border border-[var(--color-line)] px-4 text-sm font-bold text-[var(--color-muted)] hover:bg-[var(--color-soft)] focus-visible:outline-2"
    >
      Cài đặt ứng dụng
    </button>
  );
}
