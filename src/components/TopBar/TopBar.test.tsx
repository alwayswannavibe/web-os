import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { TopBar } from './index';

describe('top bar component', () => {
  it('correct render', () => {
    render(
      <Provider store={store}>
        <TopBar />
      </Provider>,
    );

    const topBar = document.getElementById('top-bar');
    expect(topBar).not.toBeNull();
  });
});
