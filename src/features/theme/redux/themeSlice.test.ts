// Redux
import store from 'src/redux/store';
import { setBackgroundImage } from '.';

describe('theme slice', () => {
  it('sets correctly theme then calls setBackgroundImage', () => {
    store.getState().theme.backgroundImages.forEach((backgroundImage) => {
      store.dispatch(setBackgroundImage({ backgroundImage }));
      expect(store.getState().theme.backgroundImage).toEqual(backgroundImage);
    });
  });
});

export {};
