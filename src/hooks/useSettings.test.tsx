import { act, renderHook } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Middleware, Dispatch, AnyAction } from 'redux';
import { Apps } from 'types/apps';
import { useSettings } from './useSettings';

describe('use settings hook', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  describe('handleSettingsCollapseToggle function', () => {
    it('toggle coolapse if settings not collapsed and not active', () => {
      const initialState = {
        apps: {
          apps: [Apps.Terminal, Apps.Settings],
        },
        settings: {
          isSettingsCollapsed: false,
          isSettingsOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useSettings(), { wrapper });

      act(() => {
        result.current.handleSettingsCollapseToggle();
      });

      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch).toBeCalledWith({
        payload: undefined,
        type: 'settings/toggleCollapseSettings',
      });
    });

    it('toggle coolapse if settings collapsed and not active', () => {
      const initialState = {
        apps: {
          apps: [Apps.Terminal, Apps.Settings],
        },
        settings: {
          isSettingsCollapsed: true,
          isSettingsOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useSettings(), { wrapper });

      act(() => {
        result.current.handleSettingsCollapseToggle();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: Apps.Settings,
        type: 'apps/setWindowActive',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: undefined,
        type: 'settings/toggleCollapseSettings',
      });
    });

    it('toggle coolapse if settings not collapsed and active', () => {
      const initialState = {
        apps: {
          apps: [Apps.Settings, Apps.Terminal],
        },
        settings: {
          isSettingsCollapsed: false,
          isSettingsOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useSettings(), { wrapper });

      act(() => {
        result.current.handleSettingsCollapseToggle();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: Apps.Terminal,
        type: 'apps/setWindowActive',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: undefined,
        type: 'settings/toggleCollapseSettings',
      });
    });
  });

  describe('handleOpenSettings function', () => {
    it('toggle coolapse if settings open and collapsed', () => {
      const initialState = {
        apps: {
          apps: [Apps.Settings],
        },
        settings: {
          isSettingsCollapsed: true,
          isSettingsOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useSettings(), { wrapper });

      act(() => {
        result.current.handleOpenSettings();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: undefined,
        type: 'settings/toggleCollapseSettings',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: Apps.Settings,
        type: 'apps/setWindowActive',
      });
    });

    it('does nothing if settings open and not collapsed', () => {
      const initialState = {
        apps: {
          apps: [Apps.Settings],
        },
        settings: {
          isSettingsCollapsed: false,
          isSettingsOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useSettings(), { wrapper });

      act(() => {
        result.current.handleOpenSettings();
      });

      expect(mockDispatch).toBeCalledTimes(0);
    });

    it('open settings if settings closed', () => {
      const initialState = {
        apps: {
          apps: [],
        },
        settings: {
          isSettingsCollapsed: false,
          isSettingsOpen: false,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useSettings(), { wrapper });

      act(() => {
        result.current.handleOpenSettings();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: undefined,
        type: 'settings/openSettings',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: Apps.Settings,
        type: 'apps/addWindow',
      });
    });
  });

  describe('handleCloseSettings function', () => {
    it('close settings and delete window if settings open', () => {
      const initialState = {
        apps: {
          apps: [Apps.Settings],
        },
        settings: {
          isSettingsCollapsed: true,
          isSettingsOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useSettings(), { wrapper });

      act(() => {
        result.current.handleCloseSettings();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: undefined,
        type: 'settings/closeSettings',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: Apps.Settings,
        type: 'apps/deleteWindow',
      });
    });

    it('does nothing if settings closed', () => {
      const initialState = {
        apps: {
          apps: [],
        },
        settings: {
          isSettingsCollapsed: true,
          isSettingsOpen: false,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useSettings(), { wrapper });

      act(() => {
        result.current.handleCloseSettings();
      });

      expect(mockDispatch).toBeCalledTimes(0);
    });
  });
});

export {};
