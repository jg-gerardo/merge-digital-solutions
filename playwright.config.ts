import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: "http://127.0.0.1:4321",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm astro dev --host 127.0.0.1",
    env: {
      ...process.env,
      ASTRO_DEV_BACKGROUND: "0",
    },
    url: "http://127.0.0.1:4321",
    reuseExistingServer: !process.env.CI,
  },
});
