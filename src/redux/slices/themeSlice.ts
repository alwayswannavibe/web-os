import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: 'planet',
  },
  reducers: {
    setTheme(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.theme = action.payload;
    },
  },
});

export default themeSlice.reducer;
export const {
  setTheme,
} = themeSlice.actions;
