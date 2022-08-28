// @ts-check

/**
 * @param {string} text
 * @returns {boolean}
 */
export const beUsername = (text) => {
	const validator = new RegExp(/^[a-zA-Z0-9_]+$/);
	return validator.test(text);
};
