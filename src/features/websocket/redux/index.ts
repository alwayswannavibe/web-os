// Libraries
import { createSlice } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import axios from 'axios';

// Redux
import store from 'src/redux/store';
import { setMessages } from 'src/apps/Chat/redux';

const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io('https://web-os-back.herokuapp.com');
socket.disconnect();

socket!.on('chatUpdate', async () => {
  try {
    const messages = await axios.get('https://web-os-back.herokuapp.com/messages');
    store.dispatch(setMessages(messages.data));
  } catch (error) {
    console.log(error);
  }
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
        axios.get('https://web-os-back.herokuapp.com/messages').then((messages) => {
          store.dispatch(setMessages(messages.data));
        }).catch(() => {});
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
