// @ts-check
import { beUsername } from 'utils/validator';

describe('be username validator util', () => {
	it('must "yellyoshua" be username', () => {
		const username = 'yellyoshua';
		expect(beUsername(username)).toBeTruthy();
	});

	it('must "Yoshua Lopez" not be username', () => {
		const username = 'Yoshua Lopez';
		expect(beUsername(username)).toBeFalsy();
	});

	it('must "yosh_-" not be username', () => {
		const username = 'yosh_-';
		expect(beUsername(username)).toBeFalsy();
	});

	it('must "yosh_ua" be username', () => {
		const username = 'yosh_ua';
		expect(beUsername(username)).toBeTruthy();
	});

	it('must "yosh-ua" not be username', () => {
		const username = 'yosh-ua';
		expect(beUsername(username)).toBeFalsy();
	});
});
