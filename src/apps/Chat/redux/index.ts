/* eslint-disable no-param-reassign */

// Libraries
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Types
import { Message } from 'src/types/message';
import axios from 'axios';

const messages: Message[] = [];

const fetchMessages = createAsyncThunk('users/fetchMessages', async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/messages`, {
    timeout: 30000,
  });
  return response.data;
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages,
    numberOfRender: 0,
    text: '',
    loading: false,
    hasError: false,
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
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, { payload }: { payload: Message[] }) => {
      state.messages = payload;
      state.loading = false;
      state.hasError = false;
    });
    builder.addCase(fetchMessages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMessages.rejected, (state) => {
      state.hasError = true;
    });
  },
});

export default chatSlice.reducer;

export const {
  setMessages,
  changeMessageInputValue,
  clearMessageInputValue,
  addMessageInputValue,
} = chatSlice.actions;

export { fetchMessages };
