// playwright.config.js
// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	testDir: 'e2e',
	webServer: {
		command: 'npm start',
		port: 3000,
		timeout: 120 * 1000,
		reuseExistingServer: !process.env.CI,
	},
	reporter: [['html', { open: 'never', outputFolder: 'public/artifacts' }]],
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	use: { trace: 'on' },
};

module.exports = config;
