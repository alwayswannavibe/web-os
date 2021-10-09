// Libraries
import { configureStore } from '@reduxjs/toolkit';

// Feature/redux
import themeSlice from '@Features/theme/redux';
import languageSlice from '@Features/i18n/redux';
import userSlice from '@Features/user/redux';
import websocketSlice from '@Features/websocket/redux';

// Redux
import appsSlice from 'src/redux/slices/appsSlice/appsSlice';

// Apps/redux
import chatSlice from '@Chat/redux/chatSlice/chatSlice';
import chatRoomsSlice from '@Chat/redux/chatRoomsSlice/chatRooms';
import chatUsersSlice from '@Chat/redux/chatUsersSlice/chatUsersSlice';
import simonSlice from '@Simon/redux/simonSlice/simonSlice';
import calculatorSlice from '@Calculator/redux/calculatorSlice/calculatorSlice';
import toDoSlice from '@ToDo/redux/toDoSlice/toDoSlice';
import terminalSlice from '@Terminal/redux/terminalSlice/terminalSlice';
import minesweeperSlice from '@Minesweeper/redux/minesweeperSlice/minesweeperSlice';

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
    chatRooms: chatRoomsSlice,
    chatUsers: chatUsersSlice,
    simon: simonSlice,
    minesweeper: minesweeperSlice,
    websocket: websocketSlice,
  },
  middleware: ((getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
