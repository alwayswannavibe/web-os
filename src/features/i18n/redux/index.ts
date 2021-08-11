/* eslint-disable no-param-reassign */

// Libraries
import { createSlice } from '@reduxjs/toolkit';

// Types
import { Language } from 'src/features/i18n/types/language';

// I18n
import i18n from 'src/features/i18n';

i18n.changeLanguage(localStorage.getItem('selectedLanguage') || Language.English);

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    language: (localStorage.getItem('selectedLanguage') as Language) || Language.English,
    languages: [Language.English, Language.Russian],
  },
  reducers: {
    setLanguage(state, { payload }: { payload: { language: Language } }) {
      state.language = payload.language;
      localStorage.setItem('selectedLocale', payload.language);
      i18n.changeLanguage(payload.language);
    },
  },
});

export default languageSlice.reducer;
export const { setLanguage } = languageSlice.actions;
