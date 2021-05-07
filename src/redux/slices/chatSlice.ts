import { createSlice } from '@reduxjs/toolkit';
import { CoordsType } from 'types/coord';
import { Message } from '../../types/message';

const messages: Message[] = [];

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages,
    isChatOpen: localStorage.getItem('isChatOpen') === 'true' || false,
    isChatCollapsed: localStorage.getItem('isChatCollapsed') === 'true' || false,
    chatIconTopCoord: localStorage.getItem('chatIconTopCoord') || '23rem',
    chatIconLeftCoord: localStorage.getItem('chatIconLeftCoord') || '3rem',
    chatTopCoord: localStorage.getItem('chatTopCoord') || '7rem',
    chatLeftCoord: localStorage.getItem('chatLeftCoord') || '20rem',
  },
  reducers: {
    openChat(state) {
      // eslint-disable-next-line no-param-reassign
      state.isChatOpen = true;
      // eslint-disable-next-line no-param-reassign
      state.isChatCollapsed = false;
      localStorage.setItem('isChatOpen', 'true');
    },
    closeChat(state) {
      // eslint-disable-next-line no-param-reassign
      state.isChatOpen = false;
      localStorage.setItem('isChatOpen', 'false');
    },
    toggleCollapseChat(state) {
      // eslint-disable-next-line no-param-reassign
      state.isChatCollapsed = !state.isChatCollapsed;
      localStorage.setItem('isChatCollapsed', state.isChatCollapsed.toString());
    },
    changeChatCoord(state, { payload }: { payload: CoordsType }) {
      // eslint-disable-next-line no-param-reassign
      state.chatTopCoord = payload.top;
      // eslint-disable-next-line no-param-reassign
      state.chatLeftCoord = payload.left;
      localStorage.setItem('chatTopCoord', payload.top);
      localStorage.setItem('chatLeftCoord', payload.left);
    },
    changeChatIconCoord(state, { payload }: { payload: CoordsType }) {
      // eslint-disable-next-line no-param-reassign
      state.chatIconTopCoord = payload.top;
      // eslint-disable-next-line no-param-reassign
      state.chatIconLeftCoord = payload.left;
      localStorage.setItem('chatIconTopCoord', payload.top);
      localStorage.setItem('chatIconLeftCoord', payload.left);
    },
    setMessages(state, { payload }: { payload: Message[] }) {
      // eslint-disable-next-line no-param-reassign
      state.messages = payload;
    },
  },
});

export default chatSlice.reducer;
export const {
  openChat,
  closeChat,
  toggleCollapseChat,
  changeChatCoord,
  changeChatIconCoord,
  setMessages,
} = chatSlice.actions;
