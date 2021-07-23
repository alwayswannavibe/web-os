/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { Apps } from 'src/types/apps';
import { CoordsType } from 'src/types/coord';

type AppCommonType = {
  isOpened: boolean,
  isCollapsed: boolean,
  iconPos: CoordsType,
  windowPos: CoordsType,
};

const initialState: {
  apps: {
    [Apps.Calculator]: AppCommonType,
    [Apps.Settings]: AppCommonType,
    [Apps.Terminal]: AppCommonType,
    [Apps.Chat]: AppCommonType,
    [Apps.ToDo]: AppCommonType,
    [Apps.Simon]: AppCommonType
  },
} = {
  apps: {
    [Apps.Calculator]: {
      isOpened: false,
      isCollapsed: false,
      iconPos: {
        top: '28rem',
        left: '1rem',
      },
      windowPos: {
        top: '15rem',
        left: '8rem',
      },
    },
    [Apps.Settings]: {
      isOpened: false,
      isCollapsed: false,
      iconPos: {
        top: '23rem',
        left: '1rem',
      },
      windowPos: {
        top: '15rem',
        left: '8rem',
      },
    },
    [Apps.Chat]: {
      isOpened: false,
      isCollapsed: false,
      iconPos: {
        top: '18rem',
        left: '1rem',
      },
      windowPos: {
        top: '15rem',
        left: '8rem',
      },
    },
    [Apps.Simon]: {
      isOpened: false,
      isCollapsed: false,
      iconPos: {
        top: '13rem',
        left: '1rem',
      },
      windowPos: {
        top: '15rem',
        left: '8rem',
      },
    },
    [Apps.Terminal]: {
      isOpened: false,
      isCollapsed: false,
      iconPos: {
        top: '8rem',
        left: '1rem',
      },
      windowPos: {
        top: '15rem',
        left: '8rem',
      },
    },
    [Apps.ToDo]: {
      isOpened: false,
      isCollapsed: false,
      iconPos: {
        top: '3rem',
        left: '1rem',
      },
      windowPos: {
        top: '15rem',
        left: '8rem',
      },
    },
  },
};

const appsStateSlice = createSlice({
  name: 'appsState',
  initialState,
  reducers: {
    openApp(state, { payload }: { payload: { type: Apps } }) {
      state.apps[payload.type].isOpened = true;
      state.apps[payload.type].isCollapsed = false;
    },
    toggleCollapseApp(state, { payload }: { payload: { type: Apps } }) {
      state.apps[payload.type].isCollapsed = !state.apps[payload.type].isCollapsed;
    },
    closeApp(state, { payload }: { payload: { type: Apps } }) {
      state.apps[payload.type].isOpened = false;
      state.apps[payload.type].isCollapsed = false;
    },
    changeIconPos(state, { payload }: { payload: { type: Apps, coords: CoordsType } }) {
      state.apps[payload.type].iconPos.top = payload.coords.top;
      state.apps[payload.type].iconPos.left = payload.coords.left;
    },
    changeWindowPos(state, { payload }: { payload: { type: Apps, coords: CoordsType } }) {
      state.apps[payload.type].windowPos.top = payload.coords.top;
      state.apps[payload.type].windowPos.left = payload.coords.left;
    },
  },
});

export default appsStateSlice.reducer;
export const {
  toggleCollapseApp,
  openApp,
  closeApp,
  changeIconPos,
  changeWindowPos,
} = appsStateSlice.actions;
