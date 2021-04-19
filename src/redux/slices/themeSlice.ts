import { createSlice } from '@reduxjs/toolkit';
import { Themes } from '../../types/themes';

type ThemeType = {
  payload: Themes;
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: Themes.Planet,
  },
  reducers: {
    setTheme(state, { payload }: ThemeType) {
      // eslint-disable-next-line no-param-reassign
      state.theme = payload;
    },
  },
});

export default themeSlice.reducer;
export const { setTheme } = themeSlice.actions;
