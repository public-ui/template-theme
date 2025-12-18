#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function toKebabCase(str) {
	return str
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

function toScreamingSnakeCase(str) {
	return str
		.toUpperCase()
		.replace(/[^A-Z0-9]+/g, '_')
		.replace(/^_+|_+$/g, '');
}

function replaceInFile(filePath, replacements) {
	try {
		let content = fs.readFileSync(filePath, 'utf8');
		let modified = false;

		for (const [oldValue, newValue] of replacements) {
			if (content.includes(oldValue)) {
				content = content.replaceAll(oldValue, newValue);
				modified = true;
			}
		}

		if (modified) {
			fs.writeFileSync(filePath, content, 'utf8');
			console.log(`✅ Updated: ${path.relative(process.cwd(), filePath)}`);
		}
	} catch (error) {
		console.error(`❌ Error updating ${filePath}:`, error.message);
		process.exit(1);
	}
}

function main() {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		console.error('❌ Error: Theme name is required');
		console.log('\nUsage: pnpm init-theme "theme-name"');
		console.log('Example: pnpm init-theme "theme-firma"');
		process.exit(1);
	}

	const themeName = args[0];
	const kebabCaseName = toKebabCase(themeName);
	const screamingSnakeCaseName = toScreamingSnakeCase(themeName);

	console.log('\n🎨 Initializing theme...');
	console.log(`   Theme name (kebab-case): ${kebabCaseName}`);
	console.log(`   Export name (SCREAMING_SNAKE_CASE): ${screamingSnakeCaseName}\n`);

	// Define files to update and their replacements
	const projectRoot = path.resolve(__dirname, '..');
	const filesToUpdate = [
		{
			path: path.join(projectRoot, 'src', 'index.ts'),
			replacements: [
				['MY_THEME', screamingSnakeCaseName],
				['KERN_V2', screamingSnakeCaseName],
				["'my-theme'", `'${kebabCaseName}'`],
				["'kern-v2'", `'${kebabCaseName}'`],
			],
		},
		{
			path: path.join(projectRoot, 'serve.sh'),
			replacements: [
				['MY_THEME', screamingSnakeCaseName],
				['KERN_V2', screamingSnakeCaseName],
			],
		},
		{
			path: path.join(projectRoot, 'package.json'),
			replacements: [
				['KERN_V2', screamingSnakeCaseName],
				['MY_THEME', screamingSnakeCaseName],
			],
		},
		{
			path: path.join(projectRoot, 'README.md'),
			replacements: [
				['KERN_V2', screamingSnakeCaseName],
				['MY_THEME', screamingSnakeCaseName],
				["'kern-v2'", `'${kebabCaseName}'`],
				["'my-theme'", `'${kebabCaseName}'`],
				['"kern-v2"', `"${kebabCaseName}"`],
				['"my-theme"', `"${kebabCaseName}"`],
			],
		},
		{
			path: path.join(projectRoot, 'README.en.md'),
			replacements: [
				['KERN_V2', screamingSnakeCaseName],
				['MY_THEME', screamingSnakeCaseName],
				["'kern-v2'", `'${kebabCaseName}'`],
				["'my-theme'", `'${kebabCaseName}'`],
				['"kern-v2"', `"${kebabCaseName}"`],
				['"my-theme"', `"${kebabCaseName}"`],
			],
		},
		{
			path: path.join(projectRoot, 'CONTRIBUTING.md'),
			replacements: [
				['KERN_V2', screamingSnakeCaseName],
				['MY_THEME', screamingSnakeCaseName],
			],
		},
		{
			path: path.join(projectRoot, 'CONTRIBUTING.en.md'),
			replacements: [
				['KERN_V2', screamingSnakeCaseName],
				['MY_THEME', screamingSnakeCaseName],
			],
		},
	];

	// Update files
	for (const { path: filePath, replacements } of filesToUpdate) {
		if (!fs.existsSync(filePath)) {
			console.warn(`⚠️  File not found: ${path.relative(projectRoot, filePath)}`);
			continue;
		}
		replaceInFile(filePath, replacements);
	}

	console.log('\n✨ Theme initialization complete!');
	console.log(`\nYour theme is now named: ${screamingSnakeCaseName} (export) / ${kebabCaseName} (internal)\n`);
}

main();
