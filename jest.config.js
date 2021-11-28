// @ts-check
// In your own jest-setup.js (or any other name)

// In jest.config.js add (if you haven't already)
module.exports = {
	roots: ['<rootDir>/src'],
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: [
		'<rootDir>/public/',
		'<rootDir>/node_modules/',
		'<rootDir>/dist/',
		'<rootDir>/e2e/',
	],
	setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
};
