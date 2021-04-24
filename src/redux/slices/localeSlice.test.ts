import store from 'redux/store';
import { Locales } from 'types/locales';
import { setLocale } from './localeSlice';

describe('locale slice', () => {
  it('sets correctly locale then calls setLocale', () => {
    store.dispatch(setLocale(Locales.Russian));
    expect(store.getState().locale.locale).toEqual(Locales.Russian);
    store.dispatch(setLocale(Locales.Britain));
    expect(store.getState().locale.locale).toEqual(Locales.Britain);
  });
});

export {};
