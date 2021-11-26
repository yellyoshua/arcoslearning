// @ts-check
const elementsSelectors = require('./elements.selectors');
const registerSelectors = require('./register.selectors');

module.exports = {
	...elementsSelectors,
	...registerSelectors,
};
