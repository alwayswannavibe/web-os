/* eslint-disable no-param-reassign */

// Libraries
import { createSlice } from '@reduxjs/toolkit';

// Types
import { BackgroundImage } from '../types/backgroundImage';
import { Theme } from '../types/theme';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    backgroundImage: localStorage.getItem('BackgroundImage') as BackgroundImage || BackgroundImage.Planet,
    backgroundImages: Object.values(BackgroundImage),
    theme: localStorage.getItem('Theme') || Theme.Dark,
    themes: Object.values(Theme),
  },
  reducers: {
    setBackgroundImage(state, { payload }: { payload: { backgroundImage: BackgroundImage } }) {
      state.backgroundImage = payload.backgroundImage;
      localStorage.setItem('BackgroundImage', payload.backgroundImage);
    },
    setTheme(state, { payload } : { payload : { theme: Theme } }) {
      state.theme = payload.theme;
      localStorage.setItem('Theme', payload.theme.toString());
    },
  },
});

export default themeSlice.reducer;
export const { setBackgroundImage, setTheme } = themeSlice.actions;
