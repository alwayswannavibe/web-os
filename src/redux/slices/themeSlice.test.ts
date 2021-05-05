import store from 'redux/store';
import { Themes } from 'types/themes';
import { setTheme } from './themeSlice';

describe('theme slice', () => {
  it('sets correctly theme then calls setTheme', () => {
    store.dispatch(setTheme(Themes.Car));
    expect(store.getState().theme.theme).toEqual(Themes.Car);
    store.dispatch(setTheme(Themes.Tree));
    expect(store.getState().theme.theme).toEqual(Themes.Tree);
  });
});

export {};
