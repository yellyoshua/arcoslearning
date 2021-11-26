// @ts-check
const { expect, test } = require('@playwright/test');
const selector = require('./selectors');

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:3000/');
});

test.describe('Register e2e', () => {
	test.describe('valid redirect and input from /register', () => {
		test('should redirect to register and check if contain the web title', async ({
			page,
		}) => {
			await expect(page).toHaveTitle(selector.siteTitle);

			await expect(page).toHaveURL('http://localhost:3000/register');

			await expect(
				page.locator(selector.textJugadasLink).first()
			).toHaveAttribute('href', '/scores');

			await expect(
				page.locator(selector.formInputForUserName).first()
			).toBeVisible();

			await expect(page.locator(selector.copyrigthText).first()).toBeVisible();

			await expect(
				page.locator(selector.formSubmitButtonForRegister).first()
			).toBeVisible();
		});

		test('should input of name content be writted', async ({ page }) => {
			const nameShort = 'Yoshua Lopez';

			await page.fill(selector.formInputForUserName, nameShort);

			const name = await page
				.locator(selector.formInputForUserName)
				.inputValue();

			expect(name).toBe(nameShort);
		});

		test('should input of name validate limit of 15 characters', async ({
			page,
		}) => {
			const nameLarge = 'Yoshua Erick Lopez';

			await page.fill(selector.formInputForUserName, nameLarge);

			const name = await page
				.locator(selector.formInputForUserName)
				.inputValue();

			expect(name).toBe(nameLarge.slice(0, 15));
		});
	});
});
