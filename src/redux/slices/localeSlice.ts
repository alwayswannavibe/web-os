import { createSlice } from '@reduxjs/toolkit';

const localeSlice = createSlice({
  name: 'locale',
  initialState: {
    locale: 'en-GB',
  },
  reducers: {
    setLocale(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.locale = action.payload;
    },
  },
});

export default localeSlice.reducer;
export const { setLocale } = localeSlice.actions;
