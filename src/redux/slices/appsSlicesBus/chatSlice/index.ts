/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
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
