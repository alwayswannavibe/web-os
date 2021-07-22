// React, redux
import { act, renderHook } from '@testing-library/react-hooks';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Middleware, Dispatch, AnyAction } from '@reduxjs/toolkit';

// Types
import { Apps } from 'src/types/apps';

// Hooks
import { useSimon } from '.';

describe('useSimon hook', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  describe('handleSimonCollapseToggle function', () => {
    it('should toggle coolapse if simon not collapsed and not active', () => {
      const initialState = {
        apps: {
          apps: [Apps.Terminal, Apps.Simon],
        },
        simon: {
          isSimonCollapsed: false,
          isSimonOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useSimon(), { wrapper });

      act(() => {
        result.current.handleSimonCollapseToggle();
      });

      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch).toBeCalledWith({
        payload: undefined,
        type: 'simon/toggleCollapseSimon',
      });
    });

    it('should toggle coolapse if simon collapsed and not active', () => {
      const initialState = {
        apps: {
          apps: [Apps.Terminal, Apps.Simon],
        },
        simon: {
          isSimonCollapsed: true,
          isSimonOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useSimon(), { wrapper });

      act(() => {
        result.current.handleSimonCollapseToggle();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: Apps.Simon,
        type: 'apps/setWindowActive',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: undefined,
        type: 'simon/toggleCollapseSimon',
      });
    });

    it('should toggle coolapse if simon not collapsed and active', () => {
      const initialState = {
        apps: {
          apps: [Apps.Simon, Apps.Terminal],
        },
        simon: {
          isSimonCollapsed: false,
          isSimonOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useSimon(), { wrapper });

      act(() => {
        result.current.handleSimonCollapseToggle();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: Apps.Terminal,
        type: 'apps/setWindowActive',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: undefined,
        type: 'simon/toggleCollapseSimon',
      });
    });
  });

  describe('handleOpenSimon function', () => {
    it('should toggle coolapse if simon open and collapsed', () => {
      const initialState = {
        apps: {
          apps: [Apps.Simon],
        },
        simon: {
          isSimonCollapsed: true,
          isSimonOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useSimon(), { wrapper });

      act(() => {
        result.current.handleOpenSimon();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: undefined,
        type: 'simon/toggleCollapseSimon',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: Apps.Simon,
        type: 'apps/setWindowActive',
      });
    });

    it('should does nothing if simon open and not collapsed', () => {
      const initialState = {
        apps: {
          apps: [Apps.Simon],
        },
        simon: {
          isSimonCollapsed: false,
          isSimonOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useSimon(), { wrapper });

      act(() => {
        result.current.handleOpenSimon();
      });

      expect(mockDispatch).toBeCalledTimes(0);
    });

    it('should open simon if it closed', () => {
      const initialState = {
        apps: {
          apps: [],
        },
        simon: {
          isSimonCollapsed: false,
          isSimonOpen: false,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useSimon(), { wrapper });

      act(() => {
        result.current.handleOpenSimon();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: undefined,
        type: 'simon/openSimon',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: Apps.Simon,
        type: 'apps/addWindow',
      });
    });
  });

  describe('handleCloseSimon function', () => {
    it('shoud close simon and delete window if it open', () => {
      const initialState = {
        apps: {
          apps: [Apps.Simon],
        },
        simon: {
          isSimonCollapsed: true,
          isSimonOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useSimon(), { wrapper });

      act(() => {
        result.current.handleCloseSimon();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: undefined,
        type: 'simon/closeSimon',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: Apps.Simon,
        type: 'apps/deleteWindow',
      });
    });

    it('should does nothing if simon closed', () => {
      const initialState = {
        apps: {
          apps: [],
        },
        simon: {
          isSimonCollapsed: true,
          isSimonOpen: false,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useSimon(), { wrapper });

      act(() => {
        result.current.handleCloseSimon();
      });

      expect(mockDispatch).toBeCalledTimes(0);
    });
  });
});

export {};
