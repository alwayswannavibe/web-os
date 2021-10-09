// Enums
import { App } from '@Enums/app.enum';

// Redux
import store from 'src/redux/store';
import { addWindow, deleteWindow, setWindowActive } from './appsSlice';

describe('app slice', () => {
  afterEach(() => {
    store.dispatch(deleteWindow(App.Settings));
    store.dispatch(deleteWindow(App.Calculator));
    store.dispatch(deleteWindow(App.Terminal));
  });

  it('has correct order when calls setWindowActive', () => {
    store.dispatch(addWindow(App.Terminal));
    store.dispatch(addWindow(App.Settings));
    store.dispatch(addWindow(App.Calculator));
    store.dispatch(setWindowActive(App.Calculator));
    expect(store.getState().apps.apps[0]).toEqual(App.Calculator);
  });

  it('has correct list when delete one app', () => {
    store.dispatch(addWindow(App.Terminal));
    store.dispatch(addWindow(App.Settings));
    store.dispatch(addWindow(App.Calculator));
    store.dispatch(deleteWindow(App.Settings));
    expect(store.getState().apps.apps).toEqual([App.Calculator, App.Terminal]);
  });

  it('has correct order when adds app', () => {
    store.dispatch(addWindow(App.Terminal));
    store.dispatch(addWindow(App.Settings));
    store.dispatch(addWindow(App.Calculator));
    expect(store.getState().apps.apps).toEqual([App.Calculator, App.Settings, App.Terminal]);
  });
});

export {};
