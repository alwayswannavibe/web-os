// Libraries
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';

// Types
import { Apps } from 'src/types/apps';

// Components
import { BottomTab } from '.';

// Styles
import styles from './style.module.css';

describe('bottom tab component', () => {
  const iconName = 'terminal';
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  describe('should renders components', () => {
    it('should renders close icon for closed app', () => {
      const initialState = {
        apps: {
          apps: [],
          appsState: {
            [Apps.Terminal]: {
              isCollapsed: false,
              isOpened: false,
            },
          },
        },
      };
      const mockStoreWithState = mockStore(initialState);
      render(
        <Provider store={mockStoreWithState}>
          <BottomTab type={Apps.Terminal} iconName={iconName} />
        </Provider>,
      );
      const closedIcon = document.getElementsByClassName(styles.close);
      const openedIcon = document.getElementsByClassName(styles.open);
      expect(closedIcon).toHaveLength(1);
      expect(openedIcon).toHaveLength(0);
    });

    it('should renders open icon for opened app', () => {
      const initialState = {
        apps: {
          apps: [Apps.Terminal],
          appsState: {
            [Apps.Terminal]: {
              isCollapsed: false,
              isOpened: true,
            },
          },
        },
      };
      const mockStoreWithState = mockStore(initialState);
      render(
        <Provider store={mockStoreWithState}>
          <BottomTab type={Apps.Terminal} iconName={iconName} />
        </Provider>,
      );
      const closedIcon = document.getElementsByClassName(styles.close);
      const openedIcon = document.getElementsByClassName(styles.open);
      expect(closedIcon).toHaveLength(0);
      expect(openedIcon).toHaveLength(1);
    });
  });

  describe('should have correct visual', () => {
    it('should renders icon', () => {
      const initialState = {
        apps: {
          apps: [],
          appsState: {
            [Apps.Terminal]: {
              isCollapsed: false,
              isOpened: false,
            },
          },
        },
      };
      const mockStoreWithState = mockStore(initialState);
      render(
        <Provider store={mockStoreWithState}>
          <BottomTab type={Apps.Terminal} iconName={iconName} />
        </Provider>,
      );
      const icon = document.getElementsByClassName(`fa-${iconName}`);
      const icons = document.getElementsByClassName('fas');
      expect(icon).toHaveLength(1);
      expect(icons).toHaveLength(1);
    });

    it('should rednders active icon if window active', () => {
      const initialState = {
        apps: {
          apps: [Apps.Terminal],
          appsState: {
            [Apps.Terminal]: {
              isCollapsed: false,
              isOpened: true,
            },
          },
        },
      };
      const mockStoreWithState = mockStore(initialState);
      render(
        <Provider store={mockStoreWithState}>
          <BottomTab type={Apps.Terminal} iconName={iconName} />
        </Provider>,
      );
      const activeIcon = document.getElementsByClassName(styles.isActive);
      const openIcon = document.getElementsByClassName(styles.open);
      expect(activeIcon).toHaveLength(1);
      expect(openIcon).toHaveLength(1);
    });

    it('should rednders not active icon if window not active', () => {
      const initialState = {
        apps: {
          apps: [Apps.ToDo, Apps.Terminal],
          appsState: {
            [Apps.Terminal]: {
              isCollapsed: false,
              isOpened: true,
            },
          },
        },
      };
      const mockStoreWithState = mockStore(initialState);
      render(
        <Provider store={mockStoreWithState}>
          <BottomTab type={Apps.Terminal} iconName={iconName} />
        </Provider>,
      );
      const activeIcon = document.getElementsByClassName(styles.isActive);
      const openIcon = document.getElementsByClassName(styles.open);
      expect(activeIcon).toHaveLength(0);
      expect(openIcon).toHaveLength(1);
    });
  });
});

export {};
