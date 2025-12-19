import { KoliBri } from '@public-ui/components';
import buttonCss from './components/button.scss';
import linkButtonCss from './components/link-button.scss';

import globalCss from './global.scss';

export const CUSTOM_THEME = KoliBri.createTheme('custom-theme', {
	GLOBAL: globalCss,
	'KOL-BUTTON': buttonCss,
	'KOL-LINK-BUTTON': linkButtonCss,
});
