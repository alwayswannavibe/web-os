import { configureStore } from '@reduxjs/toolkit';
import themeSlice from 'redux/slices/themeSlice';
import localeSlice from 'redux/slices/localeSlice';

const store = configureStore({
  reducer: {
    theme: themeSlice,
    locale: localeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
