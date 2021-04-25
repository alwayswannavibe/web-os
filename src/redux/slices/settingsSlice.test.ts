import store from 'redux/store';
import {
  changeSettingsCoord,
  changeSettingsIconCoord,
  closeSettings,
  openSettings,
  toggleCollapseSettings,
} from './settingsSlice';

describe('calculator slice', () => {
  it('opens then calls openSettings', () => {
    store.dispatch(openSettings());
    expect(store.getState().settings.isSettingsOpen).toEqual(true);
    store.dispatch(closeSettings());
  });

  it('closes then calls closeSettings', () => {
    store.dispatch(openSettings());
    store.dispatch(closeSettings());
    expect(store.getState().settings.isSettingsOpen).toEqual(false);
  });

  it('toggles collapse then calls toggleCollapseSettings', () => {
    store.dispatch(openSettings());
    store.dispatch(toggleCollapseSettings());
    expect(store.getState().settings.isSettingsCollapsed).toEqual(true);
    store.dispatch(toggleCollapseSettings());
    expect(store.getState().settings.isSettingsCollapsed).toEqual(false);
    store.dispatch(closeSettings());
  });

  it('changes coordinates then calls changeSettingsCoord', () => {
    store.dispatch(
      changeSettingsCoord({
        top: '23px',
        left: '250px',
      }),
    );
    expect(store.getState().settings.settingsLeftCoord).toEqual('250px');
    expect(store.getState().settings.settingsTopCoord).toEqual('23px');
    store.dispatch(
      changeSettingsCoord({
        top: '13rem',
        left: '1.5rem',
      }),
    );
  });

  it('changes icon coordinates then calls changeSettingsIconCoord', () => {
    store.dispatch(
      changeSettingsIconCoord({
        top: '210px',
        left: '750px',
      }),
    );
    expect(store.getState().settings.settingsIconLeftCoord).toEqual('750px');
    expect(store.getState().settings.settingsIconTopCoord).toEqual('210px');
    store.dispatch(
      changeSettingsIconCoord({
        top: '15rem',
        left: '8rem',
      }),
    );
  });
});

export {};
