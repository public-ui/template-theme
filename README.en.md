[German version](./README.md)

# Custom theme for KoliBri

A custom theme for the accessible component library [KoliBri](https://github.com/public-ui/kolibri).

## Installation

```bash
npm install @your-scope/theme-kolibri @public-ui/components
```

### Copy assets

The theme package and the KoliBri components ship important assets (fonts and icons) that must be copied into your project. For a cross-platform solution we recommend the `cpy-cli` package:

```bash
npm install --save-dev cpy-cli
```

Then create npm scripts in your `package.json`:

```json
{
	"scripts": {
		"postinstall": "npm run copy-assets",
		"copy-assets": "npm run copy-theme-assets && npm run copy-kolibri-assets",
		"copy-theme-assets": "cpy 'node_modules/@your-scope/theme-kolibri/assets/**' 'public/assets/theme' --parents",
		"copy-kolibri-assets": "cpy 'node_modules/@public-ui/components/assets/**' 'public/assets/theme' --parents"
	}
}
```

**Important:** add the theme asset folder to your `.gitignore`, because the files are copied automatically on every `npm install`:

```gitignore
# Theme assets (copied automatically)
public/assets/theme/
```

### Include assets

After copying the assets you need to include them in your application:

#### Option 1: include via HTML

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Theme Demo</title>

		<!-- KoliBri assets -->
		<link rel="stylesheet" href="/assets/theme/codicon.css" />
	</head>
	<body>
		<!-- Your KoliBri components -->
	</body>
</html>
```

#### Option 2: include via SCSS/CSS

```scss
// In your main.scss or styles.scss
@import url('/assets/theme/codicon.css');
```

## Usage

```typescript
import { register } from '@public-ui/components';
import { CUSTOM_THEME } from '@your-scope/theme-kolibri';
import { defineCustomElements } from '@public-ui/components/loader';

register(CUSTOM_THEME, defineCustomElements)
	.then(() => {
		// Theme and KoliBri components are ready
	})
	.catch(console.warn);
```

## Features

- ♿ **Accessible** – WCAG compliant styles with proper contrast ratios
- 📱 **Responsive** – mobile-first styling
- 🔧 **CSS layers** – modern layer architecture for maintainability

## Theming notes

When using adaptive styles, global CSS custom properties can collide with application properties. Prefer `SASS` variables for internal calculations and expose only clearly prefixed CSS properties.

## Development

### HTML usage

After installation you can use the KoliBri components with the theme directly in HTML:

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>KERN UX Theme Demo</title>
	</head>
	<body>
		<kol-button _label="Button"></kol-button>
		<kol-input-text _label="Name" _placeholder="Your name"></kol-input-text>
		<kol-card _headline="Card"> Content of the card with styling </kol-card>

		<script type="module">
			import { register } from '@public-ui/components';
			import { CUSTOM_THEME } from '@your-scope/theme-kolibri';
			import { defineCustomElements } from '@public-ui/components/loader';

			register(CUSTOM_THEME, defineCustomElements)
				.then(() => {
					console.log('Theme loaded successfully');
				})
				.catch(console.warn);
		</script>
	</body>
</html>
```

## Support

If you run into issues during development or the build process, take a look at [CONTRIBUTING.en.md](./CONTRIBUTING.en.md) for detailed troubleshooting guidance.

## License

This project is licensed under the [European Union Public Licence (EUPL) v1.2](https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12). The EUPL is an open-source licence developed by the European Commission and is compatible with other well-known open-source licences.

## Related projects

- [KERN UX standard](https://www.kern-ux.de)
- [KoliBri – the accessible HTML standard](https://public-ui.github.io/)
