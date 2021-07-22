// React, redux
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

// Components
import { TopBar } from '.';

describe('top bar component', () => {
  it('correct render', () => {
    render(
      <Provider store={store}>
        <TopBar />
      </Provider>,
    );

    const topBar = document.getElementById('top-bar');
    expect(topBar).toBeInTheDocument();
  });
});
