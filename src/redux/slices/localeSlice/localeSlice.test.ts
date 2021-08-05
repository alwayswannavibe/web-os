// Types
import { Locales } from 'src/types/locales';

// Redux
import store from 'src/redux/store';
import { setLocale } from '.';

describe('locale slice', () => {
  it('sets correctly locale then calls setLocale', () => {
    store.dispatch(setLocale(Locales.Russian));
    expect(store.getState().locale.locale).toEqual(Locales.Russian);
    store.dispatch(setLocale(Locales.Britain));
    expect(store.getState().locale.locale).toEqual(Locales.Britain);
  });
});

export {};
