/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { CoordsType } from 'src/types/coord';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    isSettingsOpen: localStorage.getItem('isSettingsOpen') === 'true' || false,
    isSettingsCollapsed: localStorage.getItem('isSettingsCollapsed') === 'true' || false,
    settingsIconTopCoord: localStorage.getItem('settingsIconTopCoord') || '8rem',
    settingsIconLeftCoord: localStorage.getItem('settingsIconLeftCoord') || '1rem',
    settingsTopCoord: localStorage.getItem('settingsTopCoord') || '7rem',
    settingsLeftCoord: localStorage.getItem('settingsLeftCoord') || '20rem',
  },
  reducers: {
    openSettings(state) {
      state.isSettingsOpen = true;
      state.isSettingsCollapsed = false;
      localStorage.setItem('isSettingsOpen', 'true');
    },
    closeSettings(state) {
      state.isSettingsOpen = false;
      localStorage.setItem('isSettingsOpen', 'false');
    },
    toggleCollapseSettings(state) {
      state.isSettingsCollapsed = !state.isSettingsCollapsed;
      localStorage.setItem('isSettingsCollapsed', state.isSettingsCollapsed.toString());
    },
    changeSettingsCoord(state, { payload }: { payload: CoordsType }) {
      state.settingsTopCoord = payload.top;
      state.settingsLeftCoord = payload.left;
      localStorage.setItem('settingsTopCoord', payload.top);
      localStorage.setItem('settingsLeftCoord', payload.left);
    },
    changeSettingsIconCoord(state, { payload }: { payload: CoordsType }) {
      state.settingsIconTopCoord = payload.top;
      state.settingsIconLeftCoord = payload.left;
      localStorage.setItem('settingsIconTopCoord', payload.top);
      localStorage.setItem('settingsIconLeftCoord', payload.left);
    },
  },
});

export default settingsSlice.reducer;
export const {
  openSettings,
  closeSettings,
  toggleCollapseSettings,
  changeSettingsCoord,
  changeSettingsIconCoord,
} = settingsSlice.actions;
