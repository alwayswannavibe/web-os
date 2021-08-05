// Libraries
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Locales
import translationEN from 'src/locales/en/translation.json';
import translationRU from 'src/locales/ru/translation.json';

// Types
import { Locales } from 'src/types/locales';

i18n.use(initReactI18next).init({
  fallbackLng: Locales.Britain,
  whitelist: [Locales.Britain, Locales.Russian],
  debug: false,
  detection: {
    order: ['localStorage', 'cookie'],
    cache: ['localStorage', 'cookie'],
  },
  interpolation: {
    escapeValue: false,
  },
  resources: {
    [Locales.Britain]: {
      translation: translationEN,
    },
    [Locales.Russian]: {
      translation: translationRU,
    },
  },
});

export default i18n;
