import store from 'redux/store';
import { addWindow, deleteWindow } from 'redux/slices/appsSlice';
import { Apps } from 'types/apps';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import React, { ReactNode } from 'react';
import { useApps } from './useApps';

describe('use apps hook', () => {
  const wrapper = ({ children }: { children: ReactNode }) => <Provider store={store}>{children}</Provider>;
  const { result, rerender } = renderHook(() => useApps(), { wrapper });

  describe('isIncludeApp function', () => {
    it('return true if app in apps', () => {
      store.dispatch(addWindow(Apps.Terminal));
      store.dispatch(addWindow(Apps.Settings));
      rerender();
      const { isIncludeApp } = result.current;
      expect(isIncludeApp(Apps.Settings)).toBe(true);
      expect(isIncludeApp(Apps.Terminal)).toBe(true);
      store.dispatch(deleteWindow(Apps.Settings));
      store.dispatch(deleteWindow(Apps.Terminal));
    });

    it('return false if app not in apps', () => {
      rerender();
      const { isIncludeApp } = result.current;
      expect(isIncludeApp(Apps.Terminal)).toBe(false);
      expect(isIncludeApp(Apps.Settings)).toBe(false);
      expect(isIncludeApp(Apps.Calculator)).toBe(false);
      expect(isIncludeApp(Apps.ToDo)).toBe(false);
    });
  });

  describe('getAppIndex function', () => {
    it('return index of app in apps', () => {
      store.dispatch(addWindow(Apps.Terminal));
      store.dispatch(addWindow(Apps.Settings));
      rerender();
      const { getAppIndex } = result.current;
      expect(getAppIndex(Apps.Settings)).toBe(0);
      expect(getAppIndex(Apps.Terminal)).toBe(1);
      store.dispatch(deleteWindow(Apps.Settings));
      store.dispatch(deleteWindow(Apps.Terminal));
    });

    it('return -1 if app not in apps', () => {
      rerender();
      const { getAppIndex } = result.current;
      expect(getAppIndex(Apps.Terminal)).toBe(-1);
      expect(getAppIndex(Apps.Settings)).toBe(-1);
      expect(getAppIndex(Apps.Calculator)).toBe(-1);
      expect(getAppIndex(Apps.ToDo)).toBe(-1);
    });
  });
});
