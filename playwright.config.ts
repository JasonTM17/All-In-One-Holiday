import { defineConfig } from "@playwright/test";

const PORT = 3100;
const BASE = process.env.E2E_BASE_PATH ?? "";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  retries: 0,
  workers: 4,
  use: {
    baseURL: `http://localhost:${PORT}${BASE}`,
  },
  webServer: {
    command: "npx serve out -l 3100 --no-clipboard",
    port: PORT,
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
