// Libraries
import { render } from '@testing-library/react';
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Enums
import { App } from '@Enums/app.enum';

// Components
import { BottomPanel } from './BottomPanel';

// Styles
import styles from './bottomPanel.module.css';

describe('bottom panel component', () => {
  const initialState = {
    apps: {
      apps: [],
      appsState: {
        [App.Terminal]: {
          isOpen: false,
          isCollapsed: false,
        },
        [App.Simon]: {
          isOpen: false,
          isCollapsed: false,
        },
        [App.Settings]: {
          isOpen: false,
          isCollapsed: false,
        },
        [App.Chat]: {
          isOpen: false,
          isCollapsed: false,
        },
        [App.ToDo]: {
          isOpen: false,
          isCollapsed: false,
        },
        [App.Calculator]: {
          isOpen: false,
          isCollapsed: false,
        },
        [App.Minesweeper]: {
          isOpen: false,
          isCollapsed: false,
        },
        [App.Translate]: {
          isOpen: false,
          isCollapsed: false,
        },
      },
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
    expect(icons).toHaveLength(9);
  });
});

export {};
