"use client";

import { useSyncExternalStore } from "react";

const snapshots = new Map<number, () => Date>();
const subscriptions = new Map<number, (cb: () => void) => () => void>();

function getSnapshot(intervalMs: number): () => Date {
  let fn = snapshots.get(intervalMs);
  if (!fn) {
    let cachedTick = -1;
    let cachedDate = new Date(0);
    fn = () => {
      const tick = Math.floor(Date.now() / intervalMs);
      if (tick !== cachedTick) {
        cachedTick = tick;
        cachedDate = new Date();
      }
      return cachedDate;
    };
    snapshots.set(intervalMs, fn);
  }
  return fn;
}

function getSubscribe(intervalMs: number) {
  let fn = subscriptions.get(intervalMs);
  if (!fn) {
    fn = (onChange) => {
      const id = setInterval(onChange, intervalMs);
      return () => clearInterval(id);
    };
    subscriptions.set(intervalMs, fn);
  }
  return fn;
}

function serverSnapshot(): null {
  return null;
}

/**
 * Current time on the client only, ticking every `intervalMs`.
 * Returns null during SSR and hydration so callers can render stable
 * placeholders instead of stale build-time dates.
 */
export function useNow(intervalMs = 60_000): Date | null {
  return useSyncExternalStore(
    getSubscribe(intervalMs),
    getSnapshot(intervalMs),
    serverSnapshot,
  );
}
