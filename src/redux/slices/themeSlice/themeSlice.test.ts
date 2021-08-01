// Types
import { Themes } from 'src/types/themes';

// Redux
import store from 'src/redux/store';
import { setTheme } from '.';

describe('theme slice', () => {
  it('sets correctly theme then calls setTheme', () => {
    store.dispatch(setTheme(Themes.Car));
    expect(store.getState().theme.theme).toEqual(Themes.Car);
    store.dispatch(setTheme(Themes.Tree));
    expect(store.getState().theme.theme).toEqual(Themes.Tree);
  });
});

export {};
