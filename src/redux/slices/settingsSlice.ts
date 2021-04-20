import { createSlice } from '@reduxjs/toolkit';
import { CoordsType } from 'types/coord';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    isSettingsOpen: localStorage.getItem('isSettingsOpen') === 'true' || false,
    isSettingsCollapsed: localStorage.getItem('isSettingsCollapsed') === 'true' || false,
    settingsIconTopCoord: localStorage.getItem('settingsIconTopCoord') || '8rem',
    settingsIconLeftCoord: localStorage.getItem('settingsIconLeftCoord') || '1rem',
    settingsTopCoord: localStorage.getItem('settingsTopCoord') || '7rem',
    settingsLeftCoord: localStorage.getItem('settingsLeftCoord') || '9rem',
  },
  reducers: {
    openSettings(state) {
      // eslint-disable-next-line no-param-reassign
      state.isSettingsOpen = true;
      localStorage.setItem('isSettingsOpen', 'true');
    },
    closeSettings(state) {
      // eslint-disable-next-line no-param-reassign
      state.isSettingsOpen = false;
      localStorage.setItem('isSettingsOpen', 'false');
    },
    toggleCollapseSettings(state) {
      // eslint-disable-next-line no-param-reassign
      state.isSettingsCollapsed = !state.isSettingsCollapsed;
      localStorage.setItem('isSettingsCollapsed', state.isSettingsCollapsed.toString());
    },
    changeSettingsCoord(state, { payload }: CoordsType) {
      // eslint-disable-next-line no-param-reassign
      state.settingsTopCoord = payload.top;
      // eslint-disable-next-line no-param-reassign
      state.settingsLeftCoord = payload.left;
    },
    changeSettingsIconCoord(state, { payload }: CoordsType) {
      // eslint-disable-next-line no-param-reassign
      state.settingsIconTopCoord = payload.top;
      // eslint-disable-next-line no-param-reassign
      state.settingsIconLeftCoord = payload.left;
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
