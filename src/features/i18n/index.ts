// Libraries
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Locales/English
import translationEN from 'src/features/i18n/translations/en/translation.json';
import calculatorTranslationEn from 'src/apps/Calculator/translations/en/calculatorTranslation.json';
import settingsTranslationEn from 'src/apps/Settings/translations/en/settingsTranslation.json';
import simonTranslationEn from 'src/apps/Simon/translations/en/simonTranslation.json';
import terminalTranslationEn from 'src/apps/Terminal/translations/en/terminalTranslation.json';
import minesweeperTranslationEn from 'src/apps/Minesweeper/translations/en/minesweeperTranslation.json';

// Locales/Russian
import translationRU from 'src/features/i18n/translations/ru/translation.json';
import calculatorTranslationRu from 'src/apps/Calculator/translations/ru/calculatorTranslation.json';
import settingsTranslationRu from 'src/apps/Settings/translations/ru/settingsTranslation.json';
import simonTranslationRu from 'src/apps/Simon/translations/ru/simonTranslation.json';
import terminalTranslationRu from 'src/apps/Terminal/translations/ru/terminalTranslation.json';
import minesweeperTranslationRu from 'src/apps/Minesweeper/translations/ru/minesweeperTranslation.json';

// Types
import { Language } from 'src/features/i18n/types/language';

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
    },
    [Language.Russian]: {
      translation: translationRU,
      calculator: calculatorTranslationRu,
      settings: settingsTranslationRu,
      simon: simonTranslationRu,
      terminal: terminalTranslationRu,
      minesweeper: minesweeperTranslationRu,
    },
  },
});

export default i18n;
