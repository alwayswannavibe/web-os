// React, redux
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import configureStore from 'redux-mock-store';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AnyAction, Dispatch, Middleware } from 'redux';

// Types
import { Apps } from 'src/types/apps';

// Hooks
import { useApps } from '.';

describe('use apps hook', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  describe('isIncludeApp function', () => {
    it('return true if app in apps', () => {
      const initialState = {
        apps: {
          apps: [Apps.Terminal, Apps.Calculator, Apps.Settings, Apps.ToDo],
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useApps(), { wrapper });

      expect(result.current.isIncludeApp(Apps.ToDo)).toBe(true);
      expect(result.current.isIncludeApp(Apps.Settings)).toBe(true);
      expect(result.current.isIncludeApp(Apps.Terminal)).toBe(true);
      expect(result.current.isIncludeApp(Apps.Calculator)).toBe(true);
    });

    it('return false if app not in apps', () => {
      const initialState = {
        apps: {
          apps: [],
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useApps(), { wrapper });

      expect(result.current.isIncludeApp(Apps.ToDo)).toBe(false);
      expect(result.current.isIncludeApp(Apps.Settings)).toBe(false);
      expect(result.current.isIncludeApp(Apps.Terminal)).toBe(false);
      expect(result.current.isIncludeApp(Apps.Calculator)).toBe(false);
    });
  });

  describe('getAppIndex function', () => {
    it('return index of app in apps', () => {
      const initialState = {
        apps: {
          apps: [Apps.Terminal, Apps.Calculator, Apps.Settings, Apps.ToDo],
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useApps(), { wrapper });

      expect(result.current.getAppIndex(Apps.ToDo)).toBe(3);
      expect(result.current.getAppIndex(Apps.Settings)).toBe(2);
      expect(result.current.getAppIndex(Apps.Terminal)).toBe(0);
      expect(result.current.getAppIndex(Apps.Calculator)).toBe(1);
    });

    it('return -1 if app not in apps', () => {
      const initialState = {
        apps: {
          apps: [Apps.Terminal, Apps.Calculator],
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useApps(), { wrapper });

      expect(result.current.getAppIndex(Apps.ToDo)).toBe(-1);
      expect(result.current.getAppIndex(Apps.Settings)).toBe(-1);
    });
  });
});
