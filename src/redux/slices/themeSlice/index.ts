/* eslint-disable no-param-reassign */

// Libraries
import { createSlice } from '@reduxjs/toolkit';

// Types
import { Themes } from 'src/types/themes';

type ThemeType = {
  payload: Themes;
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: localStorage.getItem('theme') || Themes.Planet,
  },
  reducers: {
    setTheme(state, { payload }: ThemeType) {
      state.theme = payload;
      localStorage.setItem('theme', payload);
    },
  },
});

export default themeSlice.reducer;
export const { setTheme } = themeSlice.actions;
