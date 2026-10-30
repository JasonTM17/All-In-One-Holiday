// After `next build`, copy each extensionless exported opengraph-image to a
// .png sibling so static hosts serve it with an image/* content type.
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
let copied = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      walk(p);
    } else if (name === "opengraph-image") {
      const png = `${p}.png`;
      copyFileSync(p, png);
      copied++;
    }
  }
}

if (existsSync(OUT)) {
  walk(OUT);
  console.log(`postbuild: wrote ${copied} opengraph-image .png copies`);
}
