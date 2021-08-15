// Libraries
import { configureStore } from '@reduxjs/toolkit';

// Redux
import themeSlice from 'src/features/theme/redux';
import languageSlice from 'src/features/i18n/redux';
import appsSlice from 'src/redux/slices/appsSlice';
import userSlice from 'src/features/user/redux';
import websocketSlice from 'src/features/websocket/redux';

// Apps/redux
import chatSlice from 'src/apps/Chat/redux';
import simonSlice from 'src/apps/Simon/redux';
import calculatorSlice from 'src/apps/Calculator/redux';
import toDoSlice from 'src/apps/ToDoList/redux';
import terminalSlice from 'src/apps/Terminal/redux';
import minesweeperSlice from 'src/apps/Minesweeper/redux';

const store = configureStore({
  reducer: {
    theme: themeSlice,
    language: languageSlice,
    terminal: terminalSlice,
    apps: appsSlice,
    calculator: calculatorSlice,
    toDo: toDoSlice,
    user: userSlice,
    chat: chatSlice,
    simon: simonSlice,
    minesweeper: minesweeperSlice,
    websocket: websocketSlice,
  },
  middleware: ((getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
