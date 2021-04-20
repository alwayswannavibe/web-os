import { configureStore } from '@reduxjs/toolkit';
import themeSlice from 'redux/slices/themeSlice';
import localeSlice from 'redux/slices/localeSlice';
import terminalSlice from './slices/terminalSlice';

const store = configureStore({
  reducer: {
    theme: themeSlice,
    locale: localeSlice,
    terminal: terminalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
