import { writeFileSync } from "node:fs";
import { holidays } from "../src/data/holidays.js";
import { buildIcs } from "../src/lib/ics.js";

const y = new Date().getFullYear();
writeFileSync("public/ngay-le-viet.ics", buildIcs(holidays, [y, y + 1, y + 2]), "utf8");
console.log("wrote ngay-le-viet.ics");
