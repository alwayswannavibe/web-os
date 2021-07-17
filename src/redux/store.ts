import { configureStore } from '@reduxjs/toolkit';
import themeSlice from 'src/redux/slices/themeSlice';
import localeSlice from 'src/redux/slices/localeSlice';
import appsSlice from 'src/redux/slices/appsSlice';
import userSlice from 'src/redux/slices/userSlice';
import terminalSlice from 'src/redux/slices/appsSlicesBus/terminalSlice';
import settingsSlice from 'src/redux/slices/appsSlicesBus/settingsSlice';
import calculatorSlice from 'src/redux/slices/appsSlicesBus/calculatorSlice';
import toDoSlice from 'src/redux/slices/appsSlicesBus/toDoSlice';
import chatSlice from 'src/redux/slices/appsSlicesBus/chatSlice';
import simonSlice from 'src/redux/slices/appsSlicesBus/simonSlice';

const store = configureStore({
  reducer: {
    theme: themeSlice,
    locale: localeSlice,
    terminal: terminalSlice,
    settings: settingsSlice,
    apps: appsSlice,
    calculator: calculatorSlice,
    toDo: toDoSlice,
    user: userSlice,
    chat: chatSlice,
    simon: simonSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
