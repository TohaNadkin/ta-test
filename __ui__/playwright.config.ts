import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './tests',
    /* Maximum time one test can run for. */
    timeout: 120 * 1000,
    expect: {
        timeout: 5000,
    },
    /* Run tests in files in parallel */
    fullyParallel: false,

    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : 1,
    reporter: [['html'], ['list']],

    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: 'https://stable-gusa-desktop.gusadev.com/',
        trace: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        launchOptions: {
            devtools: true,
            args: ['--start-maximized'],
        },
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                viewport: { height: 1080, width: 1920 },
            },
        },
    ],
    outputDir: 'test-results/',
});
