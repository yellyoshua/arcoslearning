// In your own jest-setup.js (or any other name)

// In jest.config.js add (if you haven't already)
module.exports = {
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: ['<rootDir>/public/', '<rootDir>/node_modules/', '<rootDir>/dist/'],
	setupFilesAfterEnv: ['<rootDir>/setupTests.ts']
};
