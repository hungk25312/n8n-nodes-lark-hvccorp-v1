module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/__tests__/**/*.test.ts'],
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.json',
			},
		],
	},
	modulePathIgnorePatterns: ['<rootDir>/dist/'],
	moduleNameMapper: {
		'^sanitize-html$': '<rootDir>/__mocks__/sanitize-html.js',
	},
	moduleFileExtensions: ['ts', 'js', 'json'],
};
