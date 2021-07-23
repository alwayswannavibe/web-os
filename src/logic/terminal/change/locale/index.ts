// React, redux
import store from 'src/redux/store';
import { setLocale } from 'src/redux/slices/localeSlice';
import { addTerminalHistory } from 'src/redux/slices/appsSlicesBus/terminalSlice';
import i18n from 'src/i18n/i18next';

// Types
import { Locales } from 'src/types/locales';

const terminalProcessChangeLocale = (input: string) => {
  const { dispatch } = store;

  switch (input.split(' ')[0]) {
    case 'ru': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.localeChange')}`));
      dispatch(setLocale(Locales.Russian));
      break;
    }
    case 'en': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.localeChange')}`));
      dispatch(setLocale(Locales.Britain));
      break;
    }
    case 'help':
    case '-h': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.changeLocaleHelpInfo')}`));
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.availableLocales')}: ru, en`));
      break;
    }
    case '': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.wrongCommand')}`));
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.changeExample')}`));
      break;
    }
    default: {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.unknownLocale')}`));
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.availableLocales')}: ru, en`));
    }
  }
};

export { terminalProcessChangeLocale };
