import { createSlice } from '@reduxjs/toolkit';
import { CoordsType } from 'types/coord';
import { v4 as uuidv } from 'uuid';

export type TerminalMessage = {
  message: string;
  id: string;
};

const terminalHistory: TerminalMessage[] = [];
const inputHistory: string[] = [];

const terminalSlice = createSlice({
  name: 'terminal',
  initialState: {
    isTerminalOpen: localStorage.getItem('isTerminalOpen') === 'true' || false,
    isTerminalCollapsed: localStorage.getItem('isTerminalCollapsed') === 'true' || false,
    terminalIconTopCoord: localStorage.getItem('terminalIconTopCoord') || '3rem',
    terminalIconLeftCoord: localStorage.getItem('terminalIconLeftCoord') || '1rem',
    terminalTopCoord: localStorage.getItem('terminalTopCoord') || '5rem',
    terminalLeftCoord: localStorage.getItem('terminalLeftCoord') || '5rem',
    terminalHistory,
    inputHistory,
  },
  reducers: {
    openTerminal(state) {
      // eslint-disable-next-line no-param-reassign
      state.isTerminalOpen = true;
      localStorage.setItem('isTerminalOpen', 'true');
    },
    closeTerminal(state) {
      // eslint-disable-next-line no-param-reassign
      state.isTerminalOpen = false;
      localStorage.setItem('isTerminalOpen', 'false');
    },
    toggleCollapseTerminal(state) {
      // eslint-disable-next-line no-param-reassign
      state.isTerminalCollapsed = !state.isTerminalCollapsed;
      localStorage.setItem('isSettingsCollapsed', state.isTerminalCollapsed.toString());
    },
    addTerminalHistory(state, { payload }) {
      state.terminalHistory.push({
        message: payload,
        id: uuidv(),
      });
      if (payload.split(' ')[0] === '<') {
        state.inputHistory.push(
          payload
            .split(' ')
            .splice(1, payload.length - 1)
            .join(' '),
        );
      }
    },
    clearTerminalHistory(state) {
      // eslint-disable-next-line no-param-reassign
      state.terminalHistory = [];
    },
    changeTerminalCoord(state, { payload }: { payload: CoordsType }) {
      // eslint-disable-next-line no-param-reassign
      state.terminalTopCoord = payload.top;
      // eslint-disable-next-line no-param-reassign
      state.terminalLeftCoord = payload.left;
      localStorage.setItem('terminalTopCoord', payload.top);
      localStorage.setItem('terminalLeftCoord', payload.left);
    },
    changeTerminalIconCoord(state, { payload }: { payload: CoordsType }) {
      // eslint-disable-next-line no-param-reassign
      state.terminalIconTopCoord = payload.top;
      // eslint-disable-next-line no-param-reassign
      state.terminalIconLeftCoord = payload.left;
      localStorage.setItem('terminalIconTopCoord', payload.top);
      localStorage.setItem('terminalIconLeftCoord', payload.left);
    },
  },
});

export default terminalSlice.reducer;
export const {
  openTerminal,
  closeTerminal,
  toggleCollapseTerminal,
  addTerminalHistory,
  clearTerminalHistory,
  changeTerminalCoord,
  changeTerminalIconCoord,
} = terminalSlice.actions;
