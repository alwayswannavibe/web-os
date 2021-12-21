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
  windowSize: {
    width: string,
    height: string,
  }
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
    isOpened: false,
    isCollapsed: false,
    iconPos: {
      top: localStorage.getItem(`${[App.Calculator]}IconTopCoord`) || '28rem',
      left: localStorage.getItem(`${[App.Calculator]}IconLeftCoord`) || '1rem',
    },
    windowPos: {
      top: '15rem',
      left: '8rem',
    },
    windowSize: {
      width: '48rem',
      height: '27rem',
    },
  },
  [App.Settings]: {
    isOpened: false,
    isCollapsed: false,
    iconPos: {
      top: localStorage.getItem(`${[App.Settings]}IconTopCoord`) || '23rem',
      left: localStorage.getItem(`${[App.Settings]}IconLeftCoord`) || '1rem',
    },
    windowPos: {
      top: '15rem',
      left: '8rem',
    },
    windowSize: {
      width: '48rem',
      height: '27rem',
    },
  },
  [App.Chat]: {
    isOpened: false,
    isCollapsed: false,
    iconPos: {
      top: localStorage.getItem(`${[App.Chat]}IconTopCoord`) || '18rem',
      left: localStorage.getItem(`${[App.Chat]}IconLeftCoord`) || '1rem',
    },
    windowPos: {
      top: '15rem',
      left: '8rem',
    },
    windowSize: {
      width: '48rem',
      height: '27rem',
    },
  },
  [App.Simon]: {
    isOpened: false,
    isCollapsed: false,
    iconPos: {
      top: localStorage.getItem(`${[App.Simon]}IconTopCoord`) || '13rem',
      left: localStorage.getItem(`${[App.Simon]}IconLeftCoord`) || '1rem',
    },
    windowPos: {
      top: '15rem',
      left: '8rem',
    },
    windowSize: {
      width: '48rem',
      height: '27rem',
    },
  },
  [App.Terminal]: {
    isOpened: false,
    isCollapsed: false,
    iconPos: {
      top: localStorage.getItem(`${[App.Terminal]}IconTopCoord`) || '8rem',
      left: localStorage.getItem(`${[App.Terminal]}IconLeftCoord`) || '1rem',
    },
    windowPos: {
      top: '15rem',
      left: '8rem',
    },
    windowSize: {
      width: '48rem',
      height: '27rem',
    },
  },
  [App.ToDo]: {
    isOpened: false,
    isCollapsed: false,
    iconPos: {
      top: localStorage.getItem(`${[App.ToDo]}IconTopCoord`) || '3rem',
      left: localStorage.getItem(`${[App.ToDo]}IconLeftCoord`) || '1rem',
    },
    windowPos: {
      top: '15rem',
      left: '8rem',
    },
    windowSize: {
      width: '48rem',
      height: '27rem',
    },
  },
  [App.Minesweeper]: {
    isOpened: false,
    isCollapsed: false,
    iconPos: {
      top: localStorage.getItem(`${[App.Minesweeper]}IconTopCoord`) || '33rem',
      left: localStorage.getItem(`${[App.Minesweeper]}IconLeftCoord`) || '1rem',
    },
    windowPos: {
      top: '15rem',
      left: '8rem',
    },
    windowSize: {
      width: '48rem',
      height: '27rem',
    },
  },
  [App.Translate]: {
    isOpened: false,
    isCollapsed: false,
    iconPos: {
      top: localStorage.getItem(`${[App.Translate]}IconTopCoord`) || '38rem',
      left: localStorage.getItem(`${[App.Translate]}IconLeftCoord`) || '1rem',
    },
    windowPos: {
      top: '15rem',
      left: '8rem',
    },
    windowSize: {
      width: '48rem',
      height: '27rem',
    },
  },
};

const apps: App[] = [];

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
    },
    openApp(state, { payload }: { payload: App }) {
      state.appsState[payload].isOpened = true;
      state.appsState[payload].isCollapsed = false;
      localStorage.setItem(`${[payload]}IsOpened`, 'true');
      localStorage.setItem(`${[payload]}IsCollapsed`, 'false');
      state.apps.unshift(payload);
    },
    toggleCollapseApp(state, { payload }: { payload: App }) {
      state.appsState[payload].isCollapsed = !state.appsState[payload].isCollapsed;
    },
    closeApp(state, { payload }: { payload: App }) {
      state.appsState[payload].isOpened = false;
      state.appsState[payload].isCollapsed = false;
      localStorage.setItem(`${[payload]}IsOpened`, 'false');
      localStorage.setItem(`${[payload]}IsCollapsed`, 'false');
      state.apps.splice(state.apps.indexOf(payload), 1);
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
    },
    setWindowSize(state, { payload }: { payload: { type: App, newWidth: string, newHeight: string } }) {
      state.appsState[payload.type].windowSize.width = payload.newWidth;
      state.appsState[payload.type].windowSize.height = payload.newHeight;
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
  setWindowSize,
} = appsSlice.actions;
