// React, redux
import { render } from '@testing-library/react';
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Types
import { Apps } from 'src/types/apps';

// Components
import { BottomPanel } from '.';

// Styles
import styles from './style.module.css';

describe('bottom panel component', () => {
  const initialState = {
    apps: {
      apps: [],
    },
    appsState: {
      apps: {
        [Apps.Terminal]: {
          isOpen: false,
          isCollapsed: false,
        },
        [Apps.Simon]: {
          isOpen: false,
          isCollapsed: false,
        },
        [Apps.Settings]: {
          isOpen: false,
          isCollapsed: false,
        },
        [Apps.Chat]: {
          isOpen: false,
          isCollapsed: false,
        },
        [Apps.ToDo]: {
          isOpen: false,
          isCollapsed: false,
        },
        [Apps.Calculator]: {
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
    expect(icons).toHaveLength(7);
  });
});

export {};
