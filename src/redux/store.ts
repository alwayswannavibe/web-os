import { configureStore } from '@reduxjs/toolkit';
import themeSlice from 'redux/slices/themeSlice';
import localeSlice from 'redux/slices/localeSlice';
import appsSlice from 'redux/slices/appsSlice';
import userSlice from 'redux/slices/userSlice';

// Apps
import terminalSlice from 'redux/slices/appsSlicesBus/terminalSlice';
import settingsSlice from 'redux/slices/appsSlicesBus/settingsSlice';
import calculatorSlice from 'redux/slices/appsSlicesBus/calculatorSlice';
import toDoSlice from 'redux/slices/appsSlicesBus/toDoSlice';
import chatSlice from 'redux/slices/appsSlicesBus/chatSlice';

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
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
