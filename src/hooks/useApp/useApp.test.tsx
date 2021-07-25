import configureStore from 'redux-mock-store';
import { Middleware, Dispatch, AnyAction } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { act, renderHook } from '@testing-library/react-hooks';
import { Apps } from 'src/types/apps';
import { ReactNode } from 'react';
import { useApp } from '.';

describe('useApp', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  describe('handleToggleCollapse', () => {
    it('should set window active and collapse it if it collapsed', () => {
      const initialState = {
        apps: {
          apps: [Apps.Terminal, Apps.Calculator],
        },
        appsState: {
          apps: {
            [Apps.Calculator]: {
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
      const { result } = renderHook(() => useApp(Apps.Calculator), { wrapper });

      act(() => {
        result.current.handleToggleCollapse();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: Apps.Calculator,
        type: 'apps/setWindowActive',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: { type: Apps.Calculator },
        type: 'appsState/toggleCollapseApp',
      });
    });

    it('should set window active and collapse it if it not collapsed and app index not equals 0', () => {
      const initialState = {
        apps: {
          apps: [Apps.Terminal, Apps.Calculator],
        },
        appsState: {
          apps: {
            [Apps.Calculator]: {
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
      const { result } = renderHook(() => useApp(Apps.Calculator), { wrapper });

      act(() => {
        result.current.handleToggleCollapse();
      });

      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: { type: Apps.Calculator },
        type: 'appsState/toggleCollapseApp',
      });
    });

    it('should set window active and collapse it if it not collapsed and app index equals 0', () => {
      const initialState = {
        apps: {
          apps: [Apps.Calculator, Apps.Terminal],
        },
        appsState: {
          apps: {
            [Apps.Calculator]: {
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
      const { result } = renderHook(() => useApp(Apps.Calculator), { wrapper });

      act(() => {
        result.current.handleToggleCollapse();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: Apps.Terminal,
        type: 'apps/setWindowActive',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: { type: Apps.Calculator },
        type: 'appsState/toggleCollapseApp',
      });
    });
  });

  describe('handleOpen', () => {
    it('should open app if it is not open', () => {
      const initialState = {
        apps: {
          apps: [],
        },
        appsState: {
          apps: {
            [Apps.Calculator]: {
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
      const { result } = renderHook(() => useApp(Apps.Calculator), { wrapper });

      act(() => {
        result.current.handleOpen();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: { type: Apps.Calculator },
        type: 'appsState/openApp',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: Apps.Calculator,
        type: 'apps/addWindow',
      });
    });

    it('should toggle collapse if app is open and collapsed', () => {
      const initialState = {
        apps: {
          apps: [Apps.Calculator],
        },
        appsState: {
          apps: {
            [Apps.Calculator]: {
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
      const { result } = renderHook(() => useApp(Apps.Calculator), { wrapper });

      act(() => {
        result.current.handleOpen();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: { type: Apps.Calculator },
        type: 'appsState/toggleCollapseApp',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: Apps.Calculator,
        type: 'apps/setWindowActive',
      });
    });

    it('should does nothing if app is open and not collapsed', () => {
      const initialState = {
        apps: {
          apps: [Apps.Calculator],
        },
        appsState: {
          apps: {
            [Apps.Calculator]: {
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
      const { result } = renderHook(() => useApp(Apps.Calculator), { wrapper });

      act(() => {
        result.current.handleOpen();
      });

      expect(mockDispatch).toBeCalledTimes(0);
    });
  });

  describe('handleClose', () => {
    it('should close app if it is open', () => {
      const initialState = {
        apps: {
          apps: [Apps.Calculator],
        },
        appsState: {
          apps: {
            [Apps.Calculator]: {
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
      const { result } = renderHook(() => useApp(Apps.Calculator), { wrapper });

      act(() => {
        result.current.handleClose();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: { type: Apps.Calculator },
        type: 'appsState/closeApp',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: Apps.Calculator,
        type: 'apps/deleteWindow',
      });
    });

    it('should close app if it is not open', () => {
      const initialState = {
        apps: {
          apps: [Apps.Calculator],
        },
        appsState: {
          apps: {
            [Apps.Calculator]: {
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
      const { result } = renderHook(() => useApp(Apps.Calculator), { wrapper });

      act(() => {
        result.current.handleClose();
      });

      expect(mockDispatch).toBeCalledTimes(0);
    });
  });
});
