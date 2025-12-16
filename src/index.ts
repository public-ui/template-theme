import { KoliBri } from '@public-ui/components';
import buttonCss from './components/button.scss';
import linkButtonCss from './components/link-button.scss';

import globalCss from './global.scss';

export const MY_THEME = KoliBri.createTheme('my-theme', {
	GLOBAL: globalCss,
	'KOL-BUTTON': buttonCss,
	'KOL-LINK-BUTTON': linkButtonCss,
});
