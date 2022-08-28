// @ts-check
const { expect, test } = require('@playwright/test');
const selector = require('./selectors');

test.beforeEach(async ({ page }) => {
	await page.goto('http://127.0.0.1:3000/');
});

test.describe('valid redirect and input from /register', () => {
	test.skip('should register page', async ({ page }) => {
		await Promise.all([
			expect(page).toHaveTitle(selector.siteTitle),
			expect(page).toHaveURL(/\/register$/)
		]);

		await Promise.all([
			expect(page.locator(selector.textJugadasLink).first()).toHaveAttribute('href', '/scores'),
			expect(page.locator(selector.formInputForUserName).first()).toBeVisible(),
			expect(page.locator(selector.copyrigthText).first()).toBeVisible(),
			expect(page.locator(selector.formSubmitButtonForRegister).first()).toBeVisible()
		]);
	});

	test('should input of name content be writted', async ({ page }) => {
		const nameShort = 'Yoshua Lopez';

		await page.fill(selector.formInputForUserName, nameShort);

		const name = await page.locator(selector.formInputForUserName).inputValue();

		expect(name).toBe(nameShort);
	});

	test('should input of name validate limit of 15 characters', async ({ page }) => {
		const nameLarge = 'Yoshua Erick Lopez';

		await page.fill(selector.formInputForUserName, nameLarge);

		const name = await page.locator(selector.formInputForUserName).inputValue();

		expect(name).toBe(nameLarge.slice(0, 15));
	});
});
