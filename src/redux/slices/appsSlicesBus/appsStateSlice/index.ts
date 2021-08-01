/* eslint-disable no-param-reassign */

// Libraries
import { createSlice } from '@reduxjs/toolkit';

// Types
import { Apps } from 'src/types/apps';
import { CoordsType } from 'src/types/coord';

interface AppCommon {
  isOpened: boolean,
  isCollapsed: boolean,
  iconPos: CoordsType,
  windowPos: CoordsType,
}

const initialState: {
  apps: {
    [Apps.Calculator]: AppCommon,
    [Apps.Settings]: AppCommon,
    [Apps.Terminal]: AppCommon,
    [Apps.Chat]: AppCommon,
    [Apps.ToDo]: AppCommon,
    [Apps.Simon]: AppCommon
  },
} = {
  apps: {
    [Apps.Calculator]: {
      isOpened: JSON.parse(localStorage.getItem(`${[Apps.Calculator]}IsOpened`) || 'false'),
      isCollapsed: JSON.parse(localStorage.getItem(`${[Apps.Calculator]}IsCollapsed`) || 'false'),
      iconPos: {
        top: localStorage.getItem(`${[Apps.Calculator]}IconTopCoord`) || '28rem',
        left: localStorage.getItem(`${[Apps.Calculator]}IconLeftCoord`) || '1rem',
      },
      windowPos: {
        top: localStorage.getItem(`${[Apps.Calculator]}TopCoord`) || '15rem',
        left: localStorage.getItem(`${[Apps.Calculator]}TopCoord`) || '8rem',
      },
    },
    [Apps.Settings]: {
      isOpened: JSON.parse(localStorage.getItem(`${[Apps.Settings]}IsOpened`) || 'false'),
      isCollapsed: JSON.parse(localStorage.getItem(`${[Apps.Settings]}IsCollapsed`) || 'false'),
      iconPos: {
        top: localStorage.getItem(`${[Apps.Settings]}IconTopCoord`) || '23rem',
        left: localStorage.getItem(`${[Apps.Settings]}IconLeftCoord`) || '1rem',
      },
      windowPos: {
        top: localStorage.getItem(`${[Apps.Settings]}TopCoord`) || '15rem',
        left: localStorage.getItem(`${[Apps.Settings]}LeftCoord`) || '8rem',
      },
    },
    [Apps.Chat]: {
      isOpened: JSON.parse(localStorage.getItem(`${[Apps.Chat]}IsOpened`) || 'false'),
      isCollapsed: JSON.parse(localStorage.getItem(`${[Apps.Chat]}IsCollapsed`) || 'false'),
      iconPos: {
        top: localStorage.getItem(`${[Apps.Chat]}IconTopCoord`) || '18rem',
        left: localStorage.getItem(`${[Apps.Chat]}IconLeftCoord`) || '1rem',
      },
      windowPos: {
        top: localStorage.getItem(`${[Apps.Chat]}TopCoord`) || '15rem',
        left: localStorage.getItem(`${[Apps.Chat]}LeftCoord`) || '8rem',
      },
    },
    [Apps.Simon]: {
      isOpened: JSON.parse(localStorage.getItem(`${[Apps.Simon]}IsOpened`) || 'false'),
      isCollapsed: JSON.parse(localStorage.getItem(`${[Apps.Simon]}IsCollapsed`) || 'false'),
      iconPos: {
        top: localStorage.getItem(`${[Apps.Simon]}IconTopCoord`) || '13rem',
        left: localStorage.getItem(`${[Apps.Simon]}IconLeftCoord`) || '1rem',
      },
      windowPos: {
        top: localStorage.getItem(`${[Apps.Simon]}TopCoord`) || '15rem',
        left: localStorage.getItem(`${[Apps.Simon]}LeftCoord`) || '8rem',
      },
    },
    [Apps.Terminal]: {
      isOpened: JSON.parse(localStorage.getItem(`${[Apps.Terminal]}IsOpened`) || 'false'),
      isCollapsed: JSON.parse(localStorage.getItem(`${[Apps.Terminal]}IsCollapsed`) || 'false'),
      iconPos: {
        top: localStorage.getItem(`${[Apps.Terminal]}IconTopCoord`) || '8rem',
        left: localStorage.getItem(`${[Apps.Terminal]}IconLeftCoord`) || '1rem',
      },
      windowPos: {
        top: localStorage.getItem(`${[Apps.Terminal]}TopCoord`) || '15rem',
        left: localStorage.getItem(`${[Apps.Terminal]}LeftCoord`) || '8rem',
      },
    },
    [Apps.ToDo]: {
      isOpened: JSON.parse(localStorage.getItem(`${[Apps.ToDo]}IsOpened`) || 'false'),
      isCollapsed: JSON.parse(localStorage.getItem(`${[Apps.ToDo]}IsCollapsed`) || 'false'),
      iconPos: {
        top: localStorage.getItem(`${[Apps.ToDo]}IconTopCoord`) || '3rem',
        left: localStorage.getItem(`${[Apps.ToDo]}IconLeftCoord`) || '1rem',
      },
      windowPos: {
        top: localStorage.getItem(`${[Apps.ToDo]}TopCoord`) || '15rem',
        left: localStorage.getItem(`${[Apps.ToDo]}LeftCoord`) || '8rem',
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
      localStorage.setItem(`${[payload.type]}IsOpened`, 'true');
      localStorage.setItem(`${[payload.type]}IsCollapsed`, 'false');
    },
    toggleCollapseApp(state, { payload }: { payload: { type: Apps } }) {
      state.apps[payload.type].isCollapsed = !state.apps[payload.type].isCollapsed;
      localStorage.setItem(`${[payload.type]}IsCollapsed`, state.apps[payload.type].isCollapsed.toString());
    },
    closeApp(state, { payload }: { payload: { type: Apps } }) {
      state.apps[payload.type].isOpened = false;
      state.apps[payload.type].isCollapsed = false;
      localStorage.setItem(`${[payload.type]}IsOpened`, 'false');
      localStorage.setItem(`${[payload.type]}IsCollapsed`, 'false');
    },
    changeIconPos(state, { payload }: { payload: { type: Apps, coords: CoordsType } }) {
      state.apps[payload.type].iconPos.top = payload.coords.top;
      state.apps[payload.type].iconPos.left = payload.coords.left;
      localStorage.setItem(`${[payload.type]}IconTopCoord`, payload.coords.top);
      localStorage.setItem(`${[payload.type]}IconLeftCoord`, payload.coords.left);
    },
    changeWindowPos(state, { payload }: { payload: { type: Apps, coords: CoordsType } }) {
      state.apps[payload.type].windowPos.top = payload.coords.top;
      state.apps[payload.type].windowPos.left = payload.coords.left;
      localStorage.setItem(`${[payload.type]}TopCoord`, payload.coords.top);
      localStorage.setItem(`${[payload.type]}LeftCoord`, payload.coords.left);
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
