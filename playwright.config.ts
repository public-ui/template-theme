/* eslint-disable */
// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright configuration for visual tests with @public-ui/visual-tests
 *
 * This configuration increases various timeouts to handle slower CI environments
 * where package installation and server startup can take longer.
 *
 * Note: The @public-ui/visual-tests package manages the webServer configuration,
 * but Playwright will respect timeout values set here.
 *
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
	testDir: '.',
	testMatch: '**/theme-snapshots.spec.js',

	// Timeout configuration - increased for CI environments
	timeout: 90000, // 90 seconds per test (increased for slow CI)
	expect: {
		timeout: 20000, // 20 seconds for assertions
	},

	// Run tests sequentially for stability in CI
	fullyParallel: false,

	// Fail the build on CI if you accidentally left test.only in the source code
	forbidOnly: !!process.env.CI,

	// Retry once on CI only
	retries: process.env.CI ? 1 : 0,

	// Use a single worker in CI to avoid resource contention
	workers: 1,

	// Reporter configuration
	reporter: [['list'], ['html', { outputFolder: 'test-results/html-report' }]],

	// Shared settings for all projects
	use: {
		// Collect trace when retrying failed tests
		trace: 'on-first-retry',

		// Screenshot on failure
		screenshot: 'only-on-failure',

		// Increase action and navigation timeouts
		actionTimeout: 20000,
		navigationTimeout: 30000,
	},

	// Browser configuration
	projects: [
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
	],

	// Global timeout for entire test run (30 minutes)
	globalTimeout: 30 * 60 * 1000,
});
