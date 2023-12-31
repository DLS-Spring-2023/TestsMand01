module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	ignorePatterns: ['dist/', 'scripts/', 'Jenkinsfile', 'sonar-project.properties'],
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		'prettier/prettier': 'error',
	},
};
