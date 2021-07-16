// React, redux
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AnyAction, Dispatch, Middleware } from 'redux';
import configureStore from 'redux-mock-store';

// Types
import { Apps } from 'src/types/apps';

// Components
import { BottomTab } from '.';

// Styles
import styles from './style.module.css';

describe('bottom tab component', () => {
  const handleOpen = jest.fn();
  const handleCollapse = jest.fn();
  const iconName = 'terminal';
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  describe('renders right components', () => {
    it('renders close icon for closed app', () => {
      const initialState = {
        apps: {
          apps: [],
        },
      };
      const mockStoreWithState = mockStore(initialState);
      render(
        <Provider store={mockStoreWithState}>
          <BottomTab handleOpen={handleOpen} handleCollapse={handleCollapse} type={Apps.Terminal} iconName={iconName} />
        </Provider>,
      );
      const closedIcon = document.getElementsByClassName(styles.close);
      const openedIcon = document.getElementsByClassName(styles.open);
      expect(closedIcon).toHaveLength(1);
      expect(openedIcon).toHaveLength(0);
    });

    it('renders open icon for opened app', () => {
      const initialState = {
        apps: {
          apps: [Apps.Terminal],
        },
      };
      const mockStoreWithState = mockStore(initialState);
      render(
        <Provider store={mockStoreWithState}>
          <BottomTab handleOpen={handleOpen} handleCollapse={handleCollapse} type={Apps.Terminal} iconName={iconName} />
        </Provider>,
      );
      const closedIcon = document.getElementsByClassName(styles.close);
      const openedIcon = document.getElementsByClassName(styles.open);
      expect(closedIcon).toHaveLength(0);
      expect(openedIcon).toHaveLength(1);
    });
  });

  describe('calls correct functions on click', () => {
    it('calls handleOpen on click on open icon', () => {
      const initialState = {
        apps: {
          apps: [],
        },
      };
      const mockStoreWithState = mockStore(initialState);
      render(
        <Provider store={mockStoreWithState}>
          <BottomTab handleOpen={handleOpen} handleCollapse={handleCollapse} type={Apps.Terminal} iconName={iconName} />
        </Provider>,
      );
      const openIcon = document.getElementsByClassName(styles.close);
      userEvent.click(openIcon[0]);
      expect(handleOpen).toHaveBeenCalledTimes(1);
    });

    it('calls handleCollapse on click on close icon', () => {
      const initialState = {
        apps: {
          apps: [Apps.Terminal],
        },
      };
      const mockStoreWithState = mockStore(initialState);
      render(
        <Provider store={mockStoreWithState}>
          <BottomTab handleOpen={handleOpen} handleCollapse={handleCollapse} type={Apps.Terminal} iconName={iconName} />
        </Provider>,
      );
      const openedIcon = document.getElementsByClassName(styles.open);
      userEvent.click(openedIcon[0]);
      expect(handleCollapse).toHaveBeenCalledTimes(1);
    });
  });

  describe('have correct visual', () => {
    it('renders correct icon', () => {
      const initialState = {
        apps: {
          apps: [],
        },
      };
      const mockStoreWithState = mockStore(initialState);
      render(
        <Provider store={mockStoreWithState}>
          <BottomTab handleOpen={handleOpen} handleCollapse={handleCollapse} type={Apps.Terminal} iconName={iconName} />
        </Provider>,
      );
      const icon = document.getElementsByClassName(`fa-${iconName}`);
      const icons = document.getElementsByClassName('fas');
      expect(icon).toHaveLength(1);
      expect(icons).toHaveLength(1);
    });

    it('rednders active icon if window active', () => {
      const initialState = {
        apps: {
          apps: [Apps.Terminal],
        },
      };
      const mockStoreWithState = mockStore(initialState);
      render(
        <Provider store={mockStoreWithState}>
          <BottomTab handleOpen={handleOpen} handleCollapse={handleCollapse} type={Apps.Terminal} iconName={iconName} />
        </Provider>,
      );
      const activeIcon = document.getElementsByClassName(styles.isActive);
      const openIcon = document.getElementsByClassName(styles.open);
      expect(activeIcon).toHaveLength(1);
      expect(openIcon).toHaveLength(1);
    });

    it('rednders not active icon if window not active', () => {
      const initialState = {
        apps: {
          apps: [Apps.ToDo, Apps.Terminal],
        },
      };
      const mockStoreWithState = mockStore(initialState);
      render(
        <Provider store={mockStoreWithState}>
          <BottomTab handleOpen={handleOpen} handleCollapse={handleCollapse} type={Apps.Terminal} iconName={iconName} />
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
