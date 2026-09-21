import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Directory where your end-to-end tests are located
  testDir: './tests',

  
  // Run tests in files in parallel
  fullyParallel: true,
  
//   // Fail the build on CI if you accidentally left test.only in the source code
//   forbidOnly: !!process.env.CI,
  
//   // Retry on CI only
//   retries: process.env.CI ? 2 : 0,
  
//   // Opt out of parallel tests on CI
//   workers: process.env.CI ? 1 : undefined,
  
  // Reporter to use. See https://playwright.dev
    reporter: [
    ['html', { 
      outputFolder: 'playwright-report', // 📂 The folder where the report is saved
      open: 'always'                      // 🚀 'always' opens the browser report every single time
    }]
  ],
  
  // Shared settings for all the projects below. See https://playwright.dev
  use: {
    // Collect trace when retrying the failed test. See https://playwright.dev
    trace: 'on-first-retry',
      headless: false,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
