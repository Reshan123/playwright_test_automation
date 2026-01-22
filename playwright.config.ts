import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Read from .env file
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
    /* FIX 1: Restore the fallback! If .env is missing, use the string. */
    baseURL: process.env.BASE_URL_UI || 'https://katalon-demo-cura.herokuapp.com/',

    trace: 'on-first-retry',
    /* Take screenshots on failure [cite: 173] */
    screenshot: 'only-on-failure',
    /* Record video on failure [cite: 173] */
    video: 'retain-on-failure',

    /* FIX 2: Add more "Real Browser" headers to bypass 403 */
    extraHTTPHeaders: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      // Some APIs block requests that don't refer to themselves
      'Referer': 'https://fakestoreapi.com/',
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});