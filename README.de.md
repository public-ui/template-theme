> [English version](./README.md)

# Benutzerdefinertes Theme für KoliBri

Ein benutzerdefiniertes Theme für die barrierefreie Komponentenbibliothek [KoliBri](https://github.com/public-ui/kolibri).

## Installation

```bash
npm install @your-scope/theme-kolibri @public-ui/components
```

### Assets kopieren

Das Theme-Paket und die KoliBri-Komponenten enthalten wichtige Assets (Schriftarten und Icons), die in Ihr Projekt kopiert werden müssen. Für eine betriebssystemunabhängige Lösung empfehlen wir die Verwendung des `cpy-cli` Pakets:

```bash
npm install --save-dev cpy-cli
```

Erstellen Sie dann npm-Scripts in Ihrer `package.json`:

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

**Wichtig:** Fügen Sie den Theme-Assets-Ordner zu Ihrer `.gitignore` hinzu, da diese Dateien bei jedem `npm install` automatisch kopiert werden:

```gitignore
# Theme Assets (werden automatisch kopiert)
public/assets/theme/
```

### Assets einbinden

Nach dem Kopieren der Assets müssen diese in Ihrer Anwendung eingebunden werden:

#### Option 1: Einbindung über HTML

```html
<!doctype html>
<html lang="de">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Theme Demo</title>

		<!-- KoliBri assets -->
		<link rel="stylesheet" href="/assets/theme/codicon.css" />
	</head>
	<body>
		<!-- Ihre KoliBri-Komponenten -->
	</body>
</html>
```

#### Option 2: Einbindung über SCSS/CSS

```scss
// In Ihrer main.scss oder styles.scss
@import url('/assets/theme/codicon.css');
```

## Verwendung

```typescript
import { register } from '@public-ui/components';
import { CUSTOM_THEME } from '@your-scope/theme-kolibri';
import { defineCustomElements } from '@public-ui/components/loader';

register(CUSTOM_THEME, defineCustomElements)
	.then(() => {
		// Theme und KoliBri-Komponenten sind geladen
	})
	.catch(console.warn);
```

## Features

- ♿ **Barrierefrei** - WCAG-konforme Styles mit korrekten Kontrastverhältnissen
- 📱 **Responsive** - Mobile-First-Ansatz
- 🔧 **CSS Layers** - Moderne Layer-Architektur für bessere Wartbarkeit

## Hinweise zum Theming

Beim Einsatz von Adaptive Styles können globale `CSS` Custom Properties mit denen der Anwendung kollidieren. Nutze für interne Berechnungen bevorzugt `SASS`-Variablen und gib nur klar geprefixte `CSS`-Properties nach außen.

## Entwicklung

### HTML-Verwendung

Nach der Installation können Sie die KoliBri-Komponenten mit dem Theme direkt in HTML verwenden:

```html
<!doctype html>
<html lang="de">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Theme Demo</title>
	</head>
	<body>
		<kol-button _label="Button"></kol-button>
		<kol-input-text _label="Name" _placeholder="Ihr Name"></kol-input-text>
		<kol-card _headline="Card">Inhalt der Karte mit Styling</kol-card>

		<script type="module">
			import { register } from '@public-ui/components';
			import { CUSTOM_THEME } from '@your-scope/theme-kolibri';
			import { defineCustomElements } from '@public-ui/components/loader';

			register(CUSTOM_THEME, defineCustomElements)
				.then(() => {
					console.log('Theme erfolgreich geladen');
				})
				.catch(console.warn);
		</script>
	</body>
</html>
```

## Support

Wenn Sie während der Entwicklung oder des Build-Prozesses auf Probleme stoßen, schauen Sie sich [CONTRIBUTING.de.md](./CONTRIBUTING.de.md) für detaillierte Leitfäden zur Fehlerbehebung an.

## Lizenz

Dieses Projekt steht unter der [European Union Public Licence (EUPL) v1.2](https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12). Die EUPL ist eine Open-Source-Lizenz, die von der Europäischen Kommission entwickelt wurde und mit anderen bekannten Open-Source-Lizenzen kompatibel ist.

## Verwandte Projekte

- [KoliBri – Der barrierefreie HTML-Standard](https://public-ui.github.io/)
