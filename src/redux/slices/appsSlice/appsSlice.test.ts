// Enums
import { App } from '@Enums/app.enum';

// Redux
import store from 'src/redux/store';
import {
  changeIconPos, changeWindowPos,
  closeApp,
  openApp,
  setWindowActive,
  toggleCollapseApp,
} from './appsSlice';

describe('app slice', () => {
  beforeEach(() => {
    store.dispatch(closeApp(App.Terminal));
    store.dispatch(closeApp(App.Settings));
    store.dispatch(closeApp(App.Calculator));
  });

  describe('openApp', () => {
    it('should change app status then calls openApp', () => {
      store.dispatch(openApp(App.Terminal));
      expect(store.getState().apps.appsState[App.Terminal].isCollapsed).toEqual(false);
      expect(store.getState().apps.appsState[App.Terminal].isOpened).toEqual(true);
      expect(localStorage.getItem('TerminalIsOpened')).toEqual('true');
      expect(localStorage.getItem('TerminalIsCollapsed')).toEqual('false');
      expect(JSON.parse(localStorage.getItem('apps') || '[]')).toEqual([App.Terminal]);
      expect(store.getState().apps.apps[0]).toEqual(App.Terminal);
    });
  });

  describe('closeApp', () => {
    it('should change app status then calls closeApp', () => {
      store.dispatch(openApp(App.Terminal));
      store.dispatch(closeApp(App.Terminal));
      expect(store.getState().apps.appsState[App.Terminal].isCollapsed).toEqual(false);
      expect(store.getState().apps.appsState[App.Terminal].isOpened).toEqual(false);
      expect(localStorage.getItem('TerminalIsOpened')).toEqual('false');
      expect(localStorage.getItem('TerminalIsCollapsed')).toEqual('false');
      expect(store.getState().apps.apps).toEqual([]);
      expect(JSON.parse(localStorage.getItem('apps') || '[]')).toEqual([]);
    });
  });

  describe('toggleCollapseApp', () => {
    it('should change app status then calls toggleCollapseApp and app is not collapsed', () => {
      store.dispatch(openApp(App.Terminal));
      store.dispatch(toggleCollapseApp(App.Terminal));
      expect(store.getState().apps.appsState[App.Terminal].isCollapsed).toEqual(true);
      expect(store.getState().apps.appsState[App.Terminal].isOpened).toEqual(true);
      expect(localStorage.getItem('TerminalIsOpened')).toEqual('true');
      expect(localStorage.getItem('TerminalIsCollapsed')).toEqual('true');
    });

    it('should change app status then calls toggleCollapseApp and app is collapsed', () => {
      store.dispatch(openApp(App.Terminal));
      store.dispatch(toggleCollapseApp(App.Terminal));
      store.dispatch(toggleCollapseApp(App.Terminal));
      expect(store.getState().apps.appsState[App.Terminal].isOpened).toEqual(true);
      expect(store.getState().apps.appsState[App.Terminal].isCollapsed).toEqual(false);
      expect(localStorage.getItem('TerminalIsOpened')).toEqual('true');
      expect(localStorage.getItem('TerminalIsCollapsed')).toEqual('false');
    });
  });

  describe('changeIconPos', () => {
    it('should change app state then calls changeIconPos', () => {
      store.dispatch(changeIconPos({ type: App.Terminal, coords: { top: '250px', left: '200px' } }));
      expect(localStorage.getItem('TerminalIconTopCoord')).toEqual('250px');
      expect(localStorage.getItem('TerminalIconLeftCoord')).toEqual('200px');
      localStorage.setItem('TerminalIconTopCoord', '8rem');
      localStorage.setItem('TerminalIconLeftCoord', '1rem');
    });
  });

  describe('changeWindowPos', () => {
    it('should change app state then calls changeWindowPos', () => {
      store.dispatch(changeWindowPos({ type: App.Terminal, coords: { top: '250px', left: '200px' } }));
      expect(localStorage.getItem('TerminalTopCoord')).toEqual('250px');
      expect(localStorage.getItem('TerminalLeftCoord')).toEqual('200px');
      localStorage.setItem('TerminalTopCoord', '15rem');
      localStorage.setItem('TerminalLeftCoord', '8rem');
    });
  });

  describe('setWindowActive', () => {
    it('should change when calls setWindowActive', () => {
      store.dispatch(openApp(App.Terminal));
      store.dispatch(openApp(App.Settings));
      store.dispatch(openApp(App.Calculator));
      store.dispatch(setWindowActive(App.Settings));
      expect(store.getState().apps.apps[0]).toEqual(App.Settings);
      expect(JSON.parse(localStorage.getItem('apps') || '[]')).toEqual([App.Settings, App.Calculator, App.Terminal]);
    });
  });
});

export {};
