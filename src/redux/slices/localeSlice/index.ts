/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { Locales } from 'src/types/locales';
import i18n from 'src/i18n/i18next';

i18n.changeLanguage(localStorage.getItem('selectedLocale') || Locales.Britain);

type LocaleType = {
  payload: Locales;
};

const localeSlice = createSlice({
  name: 'locale',
  initialState: {
    locale: localStorage.getItem('selectedLocale') || Locales.Britain,
  },
  reducers: {
    setLocale(state, { payload }: LocaleType) {
      state.locale = payload;
      localStorage.setItem('selectedLocale', payload);
      i18n.changeLanguage(payload);
    },
  },
});

export default localeSlice.reducer;
export const { setLocale } = localeSlice.actions;
