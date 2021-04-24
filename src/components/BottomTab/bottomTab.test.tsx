import React from 'react';
import { render } from '@testing-library/react';
import { Apps } from 'types/apps';
import store from 'redux/store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { addWindow, deleteWindow } from 'redux/slices/appsSlice';
import { BottomTab } from '.';
import styles from './style.module.css';

describe('bottom tab', () => {
  const handleOpen = jest.fn();
  const handleCollapse = jest.fn();
  const iconName = 'terminal';
  const type = Apps.Terminal;
  const otherType = Apps.Settings;

  beforeEach(() => {
    render(
      <Provider store={store}>
        <BottomTab handleOpen={handleOpen} handleCollapse={handleCollapse} type={type} iconName={iconName} />
      </Provider>,
    );
  });

  describe('renders right components', () => {
    it('renders close icon for closed app', () => {
      const closedIcon = document.getElementsByClassName(styles.close);
      const openedIcon = document.getElementsByClassName(styles.open);
      expect(closedIcon).toHaveLength(1);
      expect(openedIcon).toHaveLength(0);
    });

    it('renders open icon for opened app', () => {
      store.dispatch(addWindow(type));
      const closedIcon = document.getElementsByClassName(styles.close);
      const openedIcon = document.getElementsByClassName(styles.open);
      expect(closedIcon).toHaveLength(0);
      expect(openedIcon).toHaveLength(1);
      store.dispatch(deleteWindow(type));
    });
  });

  describe('calls correct functions on click', () => {
    it('calls handleOpen on click on open icon', () => {
      const openIcon = document.getElementsByClassName(styles.close);
      userEvent.click(openIcon[0]);
      expect(handleOpen).toHaveBeenCalledTimes(1);
      store.dispatch(deleteWindow(type));
    });

    it('calls handleCollapse on click on close icon', () => {
      store.dispatch(addWindow(type));
      const openedIcon = document.getElementsByClassName(styles.open);
      userEvent.click(openedIcon[0]);
      expect(handleCollapse).toHaveBeenCalledTimes(1);
      store.dispatch(deleteWindow(type));
    });
  });

  describe('have correct visual', () => {
    it('renders correct icon', () => {
      const icon = document.getElementsByClassName(`fa-${iconName}`);
      const icons = document.getElementsByClassName('fas');
      expect(icon).toHaveLength(1);
      expect(icons).toHaveLength(1);
    });

    it('rednders active icon if window active', () => {
      store.dispatch(addWindow(type));
      const activeIcon = document.getElementsByClassName(styles.isActive);
      const openIcon = document.getElementsByClassName(styles.open);
      expect(activeIcon).toHaveLength(1);
      expect(openIcon).toHaveLength(1);
      store.dispatch(deleteWindow(type));
    });

    it('rednders not active icon if window not active', () => {
      store.dispatch(addWindow(type));
      store.dispatch(addWindow(otherType));
      const activeIcon = document.getElementsByClassName(styles.isActive);
      const openIcon = document.getElementsByClassName(styles.open);
      expect(activeIcon).toHaveLength(0);
      expect(openIcon).toHaveLength(1);
      store.dispatch(deleteWindow(type));
      store.dispatch(deleteWindow(otherType));
    });
  });
});

export {};
