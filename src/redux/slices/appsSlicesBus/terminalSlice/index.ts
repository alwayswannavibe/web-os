/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv } from 'uuid';

export type TerminalMessage = {
  message: string;
  id: string;
};

const terminalHistory: TerminalMessage[] = [];
const terminalInputHistory: string[] = [];

const terminalSlice = createSlice({
  name: 'terminal',
  initialState: {
    terminalHistory,
    terminalInputHistory,
  },
  reducers: {
    addTerminalHistory(state, { payload }) {
      state.terminalHistory.push({
        message: payload,
        id: uuidv(),
      });
      if (payload.split(' ')[0] === '<') {
        state.terminalInputHistory.push(
          payload
            .split(' ')
            .splice(1, payload.length - 1)
            .join(' '),
        );
      }
    },
    clearTerminalHistory(state) {
      state.terminalHistory = [];
    },
    clearTerminalInputHistory(state) {
      state.terminalInputHistory = [];
    },
  },
});

export default terminalSlice.reducer;
export const {
  addTerminalHistory,
  clearTerminalHistory,
  clearTerminalInputHistory,
} = terminalSlice.actions;
