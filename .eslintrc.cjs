module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
	],
	overrides: [
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
	],
	rules: {
		'no-use-before-define': 'off',
		quotes: 'off',
		indent: ["error", "tab"],
		"no-tabs": "off",
		"no-plusplus": "off",
		"react/jsx-indent": ["error", "tab"],
		"react/jsx-indent-props": ["error", "tab"],
		"react/jsx-no-bind": "off",
		"react/button-has-type": "off",
		"react/prop-types": "off",
		"arrow-parens": "off",
	},
};
