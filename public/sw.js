/* Service worker — cache shell + visited pages for offline. BasePath-aware via scope. */
const VERSION = "nlv-v4";
const SHELL = VERSION + "-shell";
const PAGES = VERSION + "-pages";
const SCOPE = self.registration.scope;
const OFFLINE = SCOPE + "offline.html";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(SHELL)
      .then((c) =>
        c.addAll([SCOPE, SCOPE + "manifest.webmanifest", OFFLINE]),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  if (!url.pathname.startsWith(new URL(SCOPE).pathname)) return;

  // Pages: network-first, fall back to cache (offline visits still work),
  // then to the precached offline page for never-visited routes.
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(PAGES).then((c) => c.put(e.request, copy));
          return res;
        })
        .catch(() =>
          caches.match(e.request).then((hit) => hit || caches.match(OFFLINE)),
        ),
    );
    return;
  }
  // Static assets (_next, images): cache-first.
  e.respondWith(
    caches.match(e.request).then(
      (hit) =>
        hit ||
        fetch(e.request).then((res) => {
          const copy = res.clone();
          caches.open(SHELL).then((c) => c.put(e.request, copy));
          return res;
        }),
    ),
  );
});
