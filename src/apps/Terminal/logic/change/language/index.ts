// Redux
import { setLanguage } from 'src/features/i18n/redux';
import { addTerminalHistory } from 'src/apps/Terminal/redux';
import store from 'src/redux/store';

// I18n
import i18n from 'src/features/i18n';

// Types
import { Language } from 'src/features/i18n/types/language';

const terminalProcessChangeLanguage = (input: string) => {
  const { dispatch } = store;

  switch (input.split(' ')[0]) {
    case 'ru': {
      dispatch(setLanguage({ language: Language.Russian }));
      dispatch(addTerminalHistory(`${i18n.t('terminal:languageChange')}`));
      break;
    }
    case 'en': {
      dispatch(setLanguage({ language: Language.English }));
      dispatch(addTerminalHistory(`${i18n.t('terminal:languageChange')}`));
      break;
    }
    case 'help':
    case '-h': {
      dispatch(addTerminalHistory(`${i18n.t('terminal:changeLanguageHelpInfo')}`));
      dispatch(addTerminalHistory(`${i18n.t('terminal:availableLanguages')}`));
      break;
    }
    case '': {
      dispatch(addTerminalHistory(`${i18n.t('terminal:wrongCommand')}`));
      dispatch(addTerminalHistory(`${i18n.t('terminal:changeExample')}`));
      break;
    }
    default: {
      dispatch(addTerminalHistory(`${i18n.t('terminal:unknownLanguage')}`));
      dispatch(addTerminalHistory(`${i18n.t('terminal:availableLanguages')}`));
    }
  }
};

export { terminalProcessChangeLanguage };
