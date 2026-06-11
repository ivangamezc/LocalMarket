import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    /* Toma la URL que le inyectamos en GitHub Actions, o la de Vercel por defecto, o localhost si estás en tu PC */
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || (process.env.CI 
      ? 'https://local-market-ten.vercel.app/' 
      : 'http://localhost:4321'),
    trace: 'on-first-retry',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],

  webServer: process.env.CI ? undefined : {
    command: 'pnpm dev',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
    timeout: 60 * 1000,
  },
});