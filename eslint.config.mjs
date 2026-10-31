import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Static export: we ship pre-optimized local webp files and use plain
      // <img> so URLs work under any basePath without a loader.
      "@next/next/no-img-element": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "node_modules/**",
    "plans/**",
    ".agentkit/**",
    ".agents/**",
    ".claude/**",
    ".codex/**",
    ".devin/**",
    // ad-hoc `_`-prefixed scratch helpers are never shipped
    "scripts/_*",
    "next-env.d.ts",
  ]),
]);
