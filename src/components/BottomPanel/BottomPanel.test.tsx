// React, redux
import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AnyAction, Dispatch, Middleware } from 'redux';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Components
import { BottomPanel } from '.';

// Styles
import styles from './style.module.css';

describe('bottom panel component', () => {
  const initialState = {
    apps: {
      apps: [],
    },
    terminal: {
      isTerminalOpen: false,
      isTerminalCollapsed: false,
    },
    settings: {
      isSettingsOpen: false,
      isSettingsCollapsed: false,
    },
    calculator: {
      isCalculatorOpen: false,
      isCalculatorCollapsed: false,
    },
    toDo: {
      isToDoOpen: false,
      isToDoCollapsed: false,
    },
    chat: {
      isChatOpen: false,
      isChatCollapsed: false,
    },
    user: {
      username: 'User-asd13da3',
    },
  };
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);
  const mockStoreWithState = mockStore(initialState);
  render(
    <Provider store={mockStoreWithState}>
      <BottomPanel />
    </Provider>,
  );

  it('correct render icons', () => {
    const icons = document.getElementsByClassName(styles.container)[0].children;
    expect(icons).toHaveLength(6);
  });
});

export {};
