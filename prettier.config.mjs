import organizeImportsPlugin from 'prettier-plugin-organize-imports';

export default {
	plugins: [organizeImportsPlugin],
	printWidth: 160,
	singleQuote: true,
	useTabs: true,
	overrides: [
		{
			files: ['*.json', '*.jsonc'],
			options: {
				useTabs: false,
				tabWidth: 2,
			},
		},
	],
};
