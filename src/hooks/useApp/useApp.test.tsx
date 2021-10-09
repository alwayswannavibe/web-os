// Libraries
import configureStore from 'redux-mock-store';
import { Middleware, Dispatch, AnyAction } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { act, renderHook } from '@testing-library/react-hooks';
import { ReactNode } from 'react';

// Enums
import { App } from '@Enums/app.enum';

// Hooks
import { useApp } from './useApp';

describe('useApp', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  describe('handleToggleCollapse', () => {
    it('should set window active and collapse it if it collapsed', () => {
      const initialState = {
        apps: {
          apps: [App.Terminal, App.Calculator],
          appsState: {
            [App.Calculator]: {
              isOpened: true,
              isCollapsed: true,
            },
          },
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useApp(App.Calculator), { wrapper });

      act(() => {
        result.current.handleToggleCollapse();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: App.Calculator,
        type: 'apps/setWindowActive',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: { type: App.Calculator },
        type: 'apps/toggleCollapseApp',
      });
    });

    it('should set window active and collapse it if it is not collapsed and app index not equals 0', () => {
      const initialState = {
        apps: {
          apps: [App.Terminal, App.Calculator],
          appsState: {
            [App.Calculator]: {
              isOpened: true,
              isCollapsed: false,
            },
          },
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useApp(App.Calculator), { wrapper });

      act(() => {
        result.current.handleToggleCollapse();
      });

      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: { type: App.Calculator },
        type: 'apps/toggleCollapseApp',
      });
    });

    it('should set window active and collapse it if it is not collapsed and app index equals 0', () => {
      const initialState = {
        apps: {
          apps: [App.Calculator, App.Terminal],
          appsState: {
            [App.Calculator]: {
              isOpened: true,
              isCollapsed: false,
            },
          },
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useApp(App.Calculator), { wrapper });

      act(() => {
        result.current.handleToggleCollapse();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: App.Terminal,
        type: 'apps/setWindowActive',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: { type: App.Calculator },
        type: 'apps/toggleCollapseApp',
      });
    });
  });

  describe('handleOpen', () => {
    it('should open app if it is not open', () => {
      const initialState = {
        apps: {
          apps: [],
          appsState: {
            [App.Calculator]: {
              isOpened: false,
              isCollapsed: false,
            },
          },
        },
      };

      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useApp(App.Calculator), { wrapper });

      act(() => {
        result.current.handleOpen();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: { type: App.Calculator },
        type: 'apps/openApp',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: App.Calculator,
        type: 'apps/addWindow',
      });
    });

    it('should toggle collapse if app is open and collapsed', () => {
      const initialState = {
        apps: {
          apps: [App.Calculator],
          appsState: {
            [App.Calculator]: {
              isOpened: true,
              isCollapsed: true,
            },
          },
        },
      };

      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useApp(App.Calculator), { wrapper });

      act(() => {
        result.current.handleOpen();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: { type: App.Calculator },
        type: 'apps/toggleCollapseApp',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: App.Calculator,
        type: 'apps/setWindowActive',
      });
    });

    it('should do nothing if app is open and not collapsed', () => {
      const initialState = {
        apps: {
          apps: [App.Calculator],
          appsState: {
            [App.Calculator]: {
              isOpened: true,
              isCollapsed: false,
            },
          },
        },
      };

      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useApp(App.Calculator), { wrapper });

      act(() => {
        result.current.handleOpen();
      });

      expect(mockDispatch).toBeCalledTimes(0);
    });
  });

  describe('handleClose', () => {
    it('should close app if it opens', () => {
      const initialState = {
        apps: {
          apps: [App.Calculator],
          appsState: {
            [App.Calculator]: {
              isOpened: true,
              isCollapsed: false,
            },
          },
        },
      };

      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useApp(App.Calculator), { wrapper });

      act(() => {
        result.current.handleClose();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: { type: App.Calculator },
        type: 'apps/closeApp',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: App.Calculator,
        type: 'apps/deleteWindow',
      });
    });

    it('should close app if it not opens', () => {
      const initialState = {
        apps: {
          apps: [App.Calculator],
          appsState: {
            [App.Calculator]: {
              isOpened: false,
              isCollapsed: false,
            },
          },
        },
      };

      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useApp(App.Calculator), { wrapper });

      act(() => {
        result.current.handleClose();
      });

      expect(mockDispatch).toBeCalledTimes(0);
    });
  });
});
