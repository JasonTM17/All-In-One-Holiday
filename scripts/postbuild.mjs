// After `next build`, copy each extensionless exported opengraph-image to a
// .png sibling so static hosts serve it with an image/* content type.
// Also flatten nested client-router payload dirs (`<route>/__next.<seg>/<file>`
// -> `<route>/__next.<seg>.<file>`) because the client router requests the
// flattened URL; without the copy every prefetch 404s on static hosts.
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
let copied = 0;
let flattened = 0;

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
    }
  }
}

if (existsSync(OUT)) {
  walk(OUT);
  console.log(
    `postbuild: wrote ${copied} opengraph-image .png copies, flattened ${flattened} router payload files`,
  );
}
