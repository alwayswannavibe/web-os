/* eslint-disable no-param-reassign */

// Redux
import { createSlice } from '@reduxjs/toolkit';

// Enums
import { App } from '@Enums/app.enum';
import { Coordinates } from '@Interfaces/coordinates.interface';

interface AppCommon {
  isOpened: boolean,
  isCollapsed: boolean,
  iconPos: Coordinates,
  windowPos: Coordinates,
}

const appsInitialState: {
  [App.Calculator]: AppCommon,
  [App.Settings]: AppCommon,
  [App.Terminal]: AppCommon,
  [App.Chat]: AppCommon,
  [App.ToDo]: AppCommon,
  [App.Simon]: AppCommon,
  [App.Minesweeper]: AppCommon,
  [App.Translate]: AppCommon,
} = {
  [App.Calculator]: {
    isOpened: JSON.parse(localStorage.getItem(`${[App.Calculator]}IsOpened`) || 'false'),
    isCollapsed: JSON.parse(localStorage.getItem(`${[App.Calculator]}IsCollapsed`) || 'false'),
    iconPos: {
      top: localStorage.getItem(`${[App.Calculator]}IconTopCoord`) || '28rem',
      left: localStorage.getItem(`${[App.Calculator]}IconLeftCoord`) || '1rem',
    },
    windowPos: {
      top: localStorage.getItem(`${[App.Calculator]}TopCoord`) || '15rem',
      left: localStorage.getItem(`${[App.Calculator]}TopCoord`) || '8rem',
    },
  },
  [App.Settings]: {
    isOpened: JSON.parse(localStorage.getItem(`${[App.Settings]}IsOpened`) || 'false'),
    isCollapsed: JSON.parse(localStorage.getItem(`${[App.Settings]}IsCollapsed`) || 'false'),
    iconPos: {
      top: localStorage.getItem(`${[App.Settings]}IconTopCoord`) || '23rem',
      left: localStorage.getItem(`${[App.Settings]}IconLeftCoord`) || '1rem',
    },
    windowPos: {
      top: localStorage.getItem(`${[App.Settings]}TopCoord`) || '15rem',
      left: localStorage.getItem(`${[App.Settings]}LeftCoord`) || '8rem',
    },
  },
  [App.Chat]: {
    isOpened: JSON.parse(localStorage.getItem(`${[App.Chat]}IsOpened`) || 'false'),
    isCollapsed: JSON.parse(localStorage.getItem(`${[App.Chat]}IsCollapsed`) || 'false'),
    iconPos: {
      top: localStorage.getItem(`${[App.Chat]}IconTopCoord`) || '18rem',
      left: localStorage.getItem(`${[App.Chat]}IconLeftCoord`) || '1rem',
    },
    windowPos: {
      top: localStorage.getItem(`${[App.Chat]}TopCoord`) || '15rem',
      left: localStorage.getItem(`${[App.Chat]}LeftCoord`) || '8rem',
    },
  },
  [App.Simon]: {
    isOpened: JSON.parse(localStorage.getItem(`${[App.Simon]}IsOpened`) || 'false'),
    isCollapsed: JSON.parse(localStorage.getItem(`${[App.Simon]}IsCollapsed`) || 'false'),
    iconPos: {
      top: localStorage.getItem(`${[App.Simon]}IconTopCoord`) || '13rem',
      left: localStorage.getItem(`${[App.Simon]}IconLeftCoord`) || '1rem',
    },
    windowPos: {
      top: localStorage.getItem(`${[App.Simon]}TopCoord`) || '15rem',
      left: localStorage.getItem(`${[App.Simon]}LeftCoord`) || '8rem',
    },
  },
  [App.Terminal]: {
    isOpened: JSON.parse(localStorage.getItem(`${[App.Terminal]}IsOpened`) || 'false'),
    isCollapsed: JSON.parse(localStorage.getItem(`${[App.Terminal]}IsCollapsed`) || 'false'),
    iconPos: {
      top: localStorage.getItem(`${[App.Terminal]}IconTopCoord`) || '8rem',
      left: localStorage.getItem(`${[App.Terminal]}IconLeftCoord`) || '1rem',
    },
    windowPos: {
      top: localStorage.getItem(`${[App.Terminal]}TopCoord`) || '15rem',
      left: localStorage.getItem(`${[App.Terminal]}LeftCoord`) || '8rem',
    },
  },
  [App.ToDo]: {
    isOpened: JSON.parse(localStorage.getItem(`${[App.ToDo]}IsOpened`) || 'false'),
    isCollapsed: JSON.parse(localStorage.getItem(`${[App.ToDo]}IsCollapsed`) || 'false'),
    iconPos: {
      top: localStorage.getItem(`${[App.ToDo]}IconTopCoord`) || '3rem',
      left: localStorage.getItem(`${[App.ToDo]}IconLeftCoord`) || '1rem',
    },
    windowPos: {
      top: localStorage.getItem(`${[App.ToDo]}TopCoord`) || '15rem',
      left: localStorage.getItem(`${[App.ToDo]}LeftCoord`) || '8rem',
    },
  },
  [App.Minesweeper]: {
    isOpened: JSON.parse(localStorage.getItem(`${[App.Minesweeper]}IsOpened`) || 'false'),
    isCollapsed: JSON.parse(localStorage.getItem(`${[App.Minesweeper]}IsCollapsed`) || 'false'),
    iconPos: {
      top: localStorage.getItem(`${[App.Minesweeper]}IconTopCoord`) || '33rem',
      left: localStorage.getItem(`${[App.Minesweeper]}IconLeftCoord`) || '1rem',
    },
    windowPos: {
      top: localStorage.getItem(`${[App.Minesweeper]}TopCoord`) || '15rem',
      left: localStorage.getItem(`${[App.Minesweeper]}LeftCoord`) || '8rem',
    },
  },
  [App.Translate]: {
    isOpened: JSON.parse(localStorage.getItem(`${[App.Translate]}IsOpened`) || 'false'),
    isCollapsed: JSON.parse(localStorage.getItem(`${[App.Translate]}IsCollapsed`) || 'false'),
    iconPos: {
      top: localStorage.getItem(`${[App.Translate]}IconTopCoord`) || '38rem',
      left: localStorage.getItem(`${[App.Translate]}IconLeftCoord`) || '1rem',
    },
    windowPos: {
      top: localStorage.getItem(`${[App.Translate]}TopCoord`) || '15rem',
      left: localStorage.getItem(`${[App.Translate]}LeftCoord`) || '8rem',
    },
  },
};

const apps: App[] = JSON.parse(localStorage.getItem('apps') || '[]');

const appsSlice = createSlice({
  name: 'apps',
  initialState: {
    apps,
    appsState: appsInitialState,
  },
  reducers: {
    setWindowActive(state, { payload }: { payload: App }) {
      const index = state.apps.indexOf(payload);
      if (index === 0) return;
      const firstPart: App[] = state.apps.slice(0, index);
      const secondPart: App[] = state.apps.slice(index + 1);
      state.apps = [payload, ...firstPart, ...secondPart];
      localStorage.setItem('apps', JSON.stringify(state.apps));
    },
    openApp(state, { payload }: { payload: App }) {
      state.appsState[payload].isOpened = true;
      state.appsState[payload].isCollapsed = false;
      localStorage.setItem(`${[payload]}IsOpened`, 'true');
      localStorage.setItem(`${[payload]}IsCollapsed`, 'false');
      state.apps.unshift(payload);
      localStorage.setItem('apps', JSON.stringify(state.apps));
    },
    toggleCollapseApp(state, { payload }: { payload: App }) {
      state.appsState[payload].isCollapsed = !state.appsState[payload].isCollapsed;
      localStorage.setItem(`${[payload]}IsCollapsed`, state.appsState[payload].isCollapsed.toString());
    },
    closeApp(state, { payload }: { payload: App }) {
      state.appsState[payload].isOpened = false;
      state.appsState[payload].isCollapsed = false;
      localStorage.setItem(`${[payload]}IsOpened`, 'false');
      localStorage.setItem(`${[payload]}IsCollapsed`, 'false');
      state.apps.splice(state.apps.indexOf(payload), 1);
      localStorage.setItem('apps', JSON.stringify(state.apps));
    },
    changeIconPos(state, { payload }: { payload: { type: App, coords: Coordinates } }) {
      state.appsState[payload.type].iconPos.top = payload.coords.top;
      state.appsState[payload.type].iconPos.left = payload.coords.left;
      localStorage.setItem(`${[payload.type]}IconTopCoord`, payload.coords.top);
      localStorage.setItem(`${[payload.type]}IconLeftCoord`, payload.coords.left);
    },
    changeWindowPos(state, { payload }: { payload: { type: App, coords: Coordinates } }) {
      state.appsState[payload.type].windowPos.top = payload.coords.top;
      state.appsState[payload.type].windowPos.left = payload.coords.left;
      localStorage.setItem(`${[payload.type]}TopCoord`, payload.coords.top);
      localStorage.setItem(`${[payload.type]}LeftCoord`, payload.coords.left);
    },
  },
});

export default appsSlice.reducer;
export const {
  setWindowActive,
  toggleCollapseApp,
  openApp,
  closeApp,
  changeIconPos,
  changeWindowPos,
} = appsSlice.actions;
