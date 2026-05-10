import { defineConfig, devices } from "@playwright/test";

const estimateBaseURL = "http://127.0.0.1:3001";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"]],
  use: {
    baseURL: estimateBaseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      testMatch: /estimate-success\.spec\.ts$/,
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "bash e2e/start-next-with-webhook.sh",
    url: estimateBaseURL,
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      NEXT_TEST_PORT: "3001",
      WEBHOOK_MOCK_PORT: "18080",
    },
  },
});
