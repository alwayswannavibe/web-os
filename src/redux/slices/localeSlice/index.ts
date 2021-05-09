/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { Locales } from 'types/locales';

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
    },
  },
});

export default localeSlice.reducer;
export const { setLocale } = localeSlice.actions;
