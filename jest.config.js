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
	transformIgnorePatterns: [
		'/node_modules/(?!(sanitize-html|htmlparser2|domhandler|domutils|dom-serializer|entities|css-select|boolbase|css-what)/).+\\.js$',
	],
	moduleFileExtensions: ['ts', 'js', 'json'],
};
