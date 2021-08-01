/* eslint-disable no-param-reassign */

// Libraries
import { createSlice } from '@reduxjs/toolkit';

// Types
import { Message } from 'src/types/message';

const messages: Message[] = [];

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages,
    numberOfRender: 0,
  },
  reducers: {
    setMessages(state, { payload }: { payload: Message[] }) {
      state.messages = payload;
      state.numberOfRender++;
    },
  },
});

export default chatSlice.reducer;
export const {
  setMessages,
} = chatSlice.actions;
