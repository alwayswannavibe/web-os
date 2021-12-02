/* eslint-disable no-param-reassign */

// Libraries
import { createSlice } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';

// Redux
import store from 'src/redux/store';
import { changeNewMessageCount, readMessages } from '@Chat/redux/chatSlice/chatSlice';
import { processNewMessage } from '@Chat/logic/processNewMessage';

const socket: Socket = io(process.env.REACT_APP_API_URL as string, {
  withCredentials: true,
});

socket!.on('chatUpdate', (payload) => {
  processNewMessage(payload);
  if ((payload.toUserId !== null && payload.owner.id === store.getState().chat.activeChat && store.getState().chat.activeType)
  || (payload.toRoomId !== null && payload.owner.id === store.getState().chat.activeChat && store.getState().chat.activeType)) {
    store.dispatch(readMessages());
  }
});

socket!.on('readMessages', (payload) => {
  if (payload.roomId) {
    store.dispatch(changeNewMessageCount({ id: payload.id, activeType: payload.activeType, roomId: payload.roomId }));
  } else {
    store.dispatch(changeNewMessageCount({ id: payload.id, activeType: payload.activeType }));
  }
});

const websocketSlice = createSlice({
  name: 'websocket',
  initialState: {
    socket,
  },
  reducers: {},
});

export default websocketSlice.reducer;
