// After `next build`, copy each extensionless exported opengraph-image to a
// .png sibling so static hosts serve it with an image/* content type.
// Also flatten nested client-router payload dirs (`<route>/__next.<seg>/<file>`
// -> `<route>/__next.<seg>.<file>`) because the client router requests the
// flattened URL; without the copy every prefetch 404s on static hosts.
// And inject a <meta> Content-Security-Policy into every exported page —
// GitHub Pages cannot send security headers, so the meta-equiv form is the
// only available delivery channel. Everything the site loads is same-origin;
// 'unsafe-inline' stays because the theme bootstrap and router payloads are
// inline scripts. Dev mode is untouched: the tag only exists in `out/`.
import { copyFileSync, existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
let copied = 0;
let flattened = 0;
let cspInjected = 0;

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-src 'none'",
].join("; ");
const CSP_TAG = `<meta http-equiv="Content-Security-Policy" content="${CSP.replace(/"/g, "&quot;")}"/>`;

function flattenPayload(dir, name) {
  // Recursively flatten every file under `<dir>/<name>/...` to
  // `<dir>/<name>.<joined path>.<file>` — the client router requests the
  // payload at the dotted URL, e.g. `__next.<id>.<route>.__PAGE__.txt`.
  const base = join(dir, name);
  function rec(rel) {
    const abs = join(base, rel);
    for (const f of readdirSync(abs)) {
      const sub = rel ? `${rel}/${f}` : f;
      const src = join(abs, f);
      if (statSync(src).isDirectory()) {
        rec(sub);
      } else {
        copyFileSync(src, join(dir, `${name}.${sub.split("/").join(".")}`));
        flattened++;
      }
    }
  }
  rec("");
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name.startsWith("__next.")) {
        flattenPayload(dir, name);
      } else {
        walk(p);
      }
    } else if (name === "opengraph-image" || name.startsWith("opengraph-image-")) {
      // Next dedupes same-named metadata files across route groups by hashing
      // one of them (`opengraph-image-XXXX`); the canonical og:image URL is
      // always `<route>/opengraph-image.png`, so copy the hashed variant to it.
      const png =
        name === "opengraph-image" ? `${p}.png` : join(dir, "opengraph-image.png");
      copyFileSync(p, png);
      copied++;
    } else if (name.endsWith(".html")) {
      const html = readFileSync(p, "utf8");
      if (html.includes("Content-Security-Policy")) continue;
      // Right after the charset meta: before any resource reference so the
      // policy governs every subsequent fetch on the page.
      const next = html.replace(/<meta\s+charSet="utf-8"\s*\/>/, (m) => m + CSP_TAG);
      if (next !== html) {
        writeFileSync(p, next);
        cspInjected++;
      }
    }
  }
}

if (existsSync(OUT)) {
  walk(OUT);
  console.log(
    `postbuild: wrote ${copied} opengraph-image .png copies, flattened ${flattened} router payload files, injected CSP meta into ${cspInjected} pages`,
  );
}
