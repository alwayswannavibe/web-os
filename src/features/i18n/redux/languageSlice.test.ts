// Redux
import store from 'src/redux/store';
import { setLanguage } from '.';

describe('language slice', () => {
  it('sets correctly language then calls setLanguage', () => {
    store.getState().language.languages.forEach((language) => {
      store.dispatch(setLanguage({ language }));
      expect(store.getState().language.language).toEqual(language);
    });
  });
});

export {};
