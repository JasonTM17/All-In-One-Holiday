import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
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
    "next-env.d.ts",
  ]),
]);
