// playwright.config.js
// @ts-check
const { devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	testDir: 'e2e',
	webServer: {
		command: 'npm run e2e:serve',
		port: 3000,
		reuseExistingServer: !process.env.CI,
	},
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	use: {
		trace: 'on-first-retry',
	},
};

module.exports = config;
