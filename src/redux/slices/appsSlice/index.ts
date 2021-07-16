/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { Apps } from 'src/types/apps';

const apps: Apps[] = [];

// Initialize apps
if (localStorage.getItem('isTerminalOpen') === 'true') {
  apps.push(Apps.Terminal);
}
if (localStorage.getItem('isSettingsOpen') === 'true') {
  apps.push(Apps.Settings);
}
if (localStorage.getItem('isCalculatorOpen') === 'true') {
  apps.push(Apps.Calculator);
}
if (localStorage.getItem('isChatOpen') === 'true') {
  apps.push(Apps.Chat);
}
if (localStorage.getItem('isToDoOpen') === 'true') {
  apps.push(Apps.ToDo);
}

const appsSlice = createSlice({
  name: 'apps',
  initialState: {
    apps,
  },
  reducers: {
    setWindowActive(state, { payload }: { payload: Apps }) {
      const index = state.apps.indexOf(payload);
      const firstPart: Apps[] = state.apps.slice(0, index);
      const secondPart: Apps[] = state.apps.slice(index + 1);
      state.apps = [payload, ...firstPart, ...secondPart];
    },
    addWindow(state, { payload }: { payload: Apps }) {
      state.apps.unshift(payload);
    },
    deleteWindow(state, { payload }: { payload: Apps }) {
      state.apps.splice(state.apps.indexOf(payload), 1);
    },
  },
});

export default appsSlice.reducer;
export const { setWindowActive, addWindow, deleteWindow } = appsSlice.actions;
