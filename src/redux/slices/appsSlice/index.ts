/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { Apps } from 'src/types/apps';

const apps: Apps[] = JSON.parse(localStorage.getItem('apps') || '[]');

const appsSlice = createSlice({
  name: 'apps',
  initialState: {
    apps,
  },
  reducers: {
    setWindowActive(state, { payload }: { payload: Apps }) {
      const index = state.apps.indexOf(payload);
      if (index === 0) return;
      const firstPart: Apps[] = state.apps.slice(0, index);
      const secondPart: Apps[] = state.apps.slice(index + 1);
      state.apps = [payload, ...firstPart, ...secondPart];
      localStorage.setItem('apps', JSON.stringify(state.apps));
    },
    addWindow(state, { payload }: { payload: Apps }) {
      state.apps.unshift(payload);
      localStorage.setItem('apps', JSON.stringify(state.apps));
    },
    deleteWindow(state, { payload }: { payload: Apps }) {
      state.apps.splice(state.apps.indexOf(payload), 1);
      localStorage.setItem('apps', JSON.stringify(state.apps));
    },
  },
});

export default appsSlice.reducer;
export const { setWindowActive, addWindow, deleteWindow } = appsSlice.actions;
