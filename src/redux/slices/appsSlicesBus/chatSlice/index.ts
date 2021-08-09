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
    text: '',
  },
  reducers: {
    setMessages(state, { payload }: { payload: Message[] }) {
      state.messages = payload;
      state.numberOfRender++;
    },
    addMessageInputValue(state, { payload }: { payload: string }) {
      state.text += payload;
    },
    changeMessageInputValue(state, { payload }: { payload: string }) {
      state.text = payload;
    },
    clearMessageInputValue(state) {
      state.text = '';
    },
  },
});

export default chatSlice.reducer;
export const {
  setMessages,
  changeMessageInputValue,
  clearMessageInputValue,
  addMessageInputValue,
} = chatSlice.actions;
