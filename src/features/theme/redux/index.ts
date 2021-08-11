/* eslint-disable no-param-reassign */

// Libraries
import { createSlice } from '@reduxjs/toolkit';

// Types
import { BackgroundImage } from 'src/features/theme/types/backgroundImage';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    backgroundImage: localStorage.getItem('BackgroundImage') as BackgroundImage || BackgroundImage.Planet,
    backgroundImages: Object.values(BackgroundImage),
  },
  reducers: {
    setBackgroundImage(state, { payload }: { payload: { backgroundImage: BackgroundImage } }) {
      state.backgroundImage = payload.backgroundImage;
      localStorage.setItem('BackgroundImage', payload.backgroundImage);
    },
  },
});

export default themeSlice.reducer;
export const { setBackgroundImage } = themeSlice.actions;
