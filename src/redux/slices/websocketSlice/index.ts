// Libraries
import { createSlice } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import axios from 'axios';

// Redux
import store from 'src/redux/store';
import { setMessages } from 'src/redux/slices/appsSlicesBus/chatSlice';

const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io('http://localhost:3001');
socket.disconnect();

socket!.on('chatUpdate', async () => {
  const messages = await axios.get('http://localhost:3001/messages');
  store.dispatch(setMessages(messages.data));
});

const websocketSlice = createSlice({
  name: 'websocket',
  initialState: {
    socket,
  },
  reducers: {
    connect(state) {
      if (!socket.connected) {
        state.socket.connect();
      }
    },
    disconnect(state) {
      if (socket.connected) {
        state.socket.disconnect();
      }
    },
  },
});

export default websocketSlice.reducer;
export const { connect, disconnect } = websocketSlice.actions;
