import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Read from .env file [cite: 95]
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel [cite: 164] */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only [cite: 162] */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. [cite: 174] */
  reporter: [
    ['html'], 
    ['list']
  ],

  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL_UI,

    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',
    
    /* Take screenshots on failure [cite: 173] */
    screenshot: 'only-on-failure',
    
    /* Record video on failure [cite: 173] */
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // You can uncomment firefox/webkit later if needed
  ],
});