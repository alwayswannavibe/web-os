import { createSlice } from '@reduxjs/toolkit';
import { Locales } from 'types/locales';

type LocaleType = {
  payload: Locales;
};

const localeSlice = createSlice({
  name: 'locale',
  initialState: {
    locale: Locales.Britain,
  },
  reducers: {
    setLocale(state, { payload }: LocaleType) {
      // eslint-disable-next-line no-param-reassign
      state.locale = payload;
    },
  },
});

export default localeSlice.reducer;
export const { setLocale } = localeSlice.actions;
