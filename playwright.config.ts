import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  ...(process.env.CI ? { workers: 1 } : {}),

  reporter: [
  ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ['allure-playwright']
],

  use: {
    trace: 'on-first-retry',
    headless: !!process.env.CI,
    screenshot: 'on'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});