// Libraries
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Locales/English
import translationEN from '@Features/i18n/translations/en/translation.json';
import calculatorTranslationEn from '@Calculator/translations/en/calculatorTranslation.json';
import settingsTranslationEn from '@Settings/translations/en/settingsTranslation.json';
import simonTranslationEn from '@Simon/translations/en/simonTranslation.json';
import terminalTranslationEn from '@Terminal/translations/en/terminalTranslation.json';
import minesweeperTranslationEn from '@Minesweeper/translations/en/minesweeperTranslation.json';
import authRedirectTranslationEn from '@Components/AuthAppRedirect/translations/en/authAppRedirectTranslation.json';
import welcomeTranslationEn from '@Components/Welcome/translations/en/welcomeTranslation.json';

// Locales/Russian
import translationRU from '@Features/i18n/translations/ru/translation.json';
import calculatorTranslationRu from '@Calculator/translations/ru/calculatorTranslation.json';
import settingsTranslationRu from '@Settings/translations/ru/settingsTranslation.json';
import simonTranslationRu from '@Simon/translations/ru/simonTranslation.json';
import terminalTranslationRu from '@Terminal/translations/ru/terminalTranslation.json';
import minesweeperTranslationRu from '@Minesweeper/translations/ru/minesweeperTranslation.json';
import authRedirectTranslationRu from '@Components/AuthAppRedirect/translations/ru/authAppRedirectTranslation.json';
import welcomeTranslationRu from '@Components/Welcome/translations/ru/welcomeTranslation.json';

// Types
import { Language } from '@Features/i18n/types/language';

i18n.use(initReactI18next).init({
  fallbackLng: Language.English,
  whitelist: [Language.English, Language.Russian],
  debug: false,
  detection: {
    order: ['localStorage', 'cookie'],
    cache: ['localStorage', 'cookie'],
  },
  interpolation: {
    escapeValue: false,
  },
  resources: {
    [Language.English]: {
      translation: translationEN,
      calculator: calculatorTranslationEn,
      settings: settingsTranslationEn,
      simon: simonTranslationEn,
      terminal: terminalTranslationEn,
      minesweeper: minesweeperTranslationEn,
      authRedirect: authRedirectTranslationEn,
      welcome: welcomeTranslationEn,
    },
    [Language.Russian]: {
      translation: translationRU,
      calculator: calculatorTranslationRu,
      settings: settingsTranslationRu,
      simon: simonTranslationRu,
      terminal: terminalTranslationRu,
      minesweeper: minesweeperTranslationRu,
      authRedirect: authRedirectTranslationRu,
      welcome: welcomeTranslationRu,
    },
  },
});

export default i18n;
