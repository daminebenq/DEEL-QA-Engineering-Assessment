// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    screenshot: 'only-on-failure',
    headless: true,
  },
  fullyParallel: true,
  reporter: [
    ['line'], 
    ['experimental-allure-playwright']
  ],
};

export default config;