// Libraries
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';

// Enums
import { App } from '@Enums/app.enum';

// Components
import { BottomTab } from './BottomTab';

// Styles
import styles from './style.module.css';

describe('bottom tab component', () => {
  const iconName = 'terminal';
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  describe('should render components', () => {
    it('should renders close icon for closed app', () => {
      const initialState = {
        apps: {
          apps: [],
          appsState: {
            [App.Terminal]: {
              isCollapsed: false,
              isOpened: false,
            },
          },
        },
      };
      const mockStoreWithState = mockStore(initialState);
      render(
        <Provider store={mockStoreWithState}>
          <BottomTab type={App.Terminal} iconName={iconName} />
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
          apps: [App.Terminal],
          appsState: {
            [App.Terminal]: {
              isCollapsed: false,
              isOpened: true,
            },
          },
        },
      };
      const mockStoreWithState = mockStore(initialState);
      render(
        <Provider store={mockStoreWithState}>
          <BottomTab type={App.Terminal} icon={faTerminal} />
        </Provider>,
      );
      const closedIcon = document.getElementsByClassName(styles.close);
      const openedIcon = document.getElementsByClassName(styles.open);
      expect(closedIcon).toHaveLength(0);
      expect(openedIcon).toHaveLength(1);
    });
  });

  describe('should have correct visual', () => {
    it('should render icon', () => {
      const initialState = {
        apps: {
          apps: [],
          appsState: {
            [App.Terminal]: {
              isCollapsed: false,
              isOpened: false,
            },
          },
        },
      };
      const mockStoreWithState = mockStore(initialState);
      render(
        <Provider store={mockStoreWithState}>
          <BottomTab type={App.Terminal} icon={faTerminal} />
        </Provider>,
      );
      const icon = document.getElementsByClassName(`fa-${iconName}`);
      expect(icon).toHaveLength(1);
    });

    it('should render active icon if window active', () => {
      const initialState = {
        apps: {
          apps: [App.Terminal],
          appsState: {
            [App.Terminal]: {
              isCollapsed: false,
              isOpened: true,
            },
          },
        },
      };
      const mockStoreWithState = mockStore(initialState);
      render(
        <Provider store={mockStoreWithState}>
          <BottomTab type={App.Terminal} icon={faTerminal} />
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
          apps: [App.ToDo, App.Terminal],
          appsState: {
            [App.Terminal]: {
              isCollapsed: false,
              isOpened: true,
            },
          },
        },
      };
      const mockStoreWithState = mockStore(initialState);
      render(
        <Provider store={mockStoreWithState}>
          <BottomTab type={App.Terminal} icon={faTerminal} />
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
