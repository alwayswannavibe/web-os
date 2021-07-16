// React, redux
import { act, renderHook } from '@testing-library/react-hooks';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Middleware, Dispatch, AnyAction } from '@reduxjs/toolkit';

// Types
import { Apps } from 'src/types/apps';

// Hooks
import { useToDo } from './useToDo';

describe('use to do hook', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  describe('handleToDoCollapseToggle function', () => {
    it('toggle coolapse if to do not collapsed and not active', () => {
      const initialState = {
        apps: {
          apps: [Apps.Terminal, Apps.ToDo],
        },
        toDo: {
          isToDoCollapsed: false,
          isToDoOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useToDo(), { wrapper });

      act(() => {
        result.current.handleToDoCollapseToggle();
      });

      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch).toBeCalledWith({
        payload: undefined,
        type: 'toDo/toggleCollapseToDo',
      });
    });

    it('toggle coolapse if to do collapsed and not active', () => {
      const initialState = {
        apps: {
          apps: [Apps.Terminal, Apps.ToDo],
        },
        toDo: {
          isToDoCollapsed: true,
          isToDoOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useToDo(), { wrapper });

      act(() => {
        result.current.handleToDoCollapseToggle();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: Apps.ToDo,
        type: 'apps/setWindowActive',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: undefined,
        type: 'toDo/toggleCollapseToDo',
      });
    });

    it('toggle coolapse if to do not collapsed and active', () => {
      const initialState = {
        apps: {
          apps: [Apps.ToDo, Apps.Terminal],
        },
        toDo: {
          isToDoCollapsed: false,
          isToDoOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useToDo(), { wrapper });

      act(() => {
        result.current.handleToDoCollapseToggle();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: Apps.Terminal,
        type: 'apps/setWindowActive',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: undefined,
        type: 'toDo/toggleCollapseToDo',
      });
    });
  });

  describe('handleOpenToDo function', () => {
    it('toggle coolapse if to do open and collapsed', () => {
      const initialState = {
        apps: {
          apps: [Apps.ToDo],
        },
        toDo: {
          isToDoCollapsed: true,
          isToDoOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useToDo(), { wrapper });

      act(() => {
        result.current.handleOpenToDo();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: undefined,
        type: 'toDo/toggleCollapseToDo',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: Apps.ToDo,
        type: 'apps/setWindowActive',
      });
    });

    it('does nothing if to do open and not collapsed', () => {
      const initialState = {
        apps: {
          apps: [Apps.ToDo],
        },
        toDo: {
          isToDoCollapsed: false,
          isToDoOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useToDo(), { wrapper });

      act(() => {
        result.current.handleOpenToDo();
      });

      expect(mockDispatch).toBeCalledTimes(0);
    });

    it('open to do if settings closed', () => {
      const initialState = {
        apps: {
          apps: [],
        },
        toDo: {
          isToDoCollapsed: false,
          isToDoOpen: false,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useToDo(), { wrapper });

      act(() => {
        result.current.handleOpenToDo();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: undefined,
        type: 'toDo/openToDo',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: Apps.ToDo,
        type: 'apps/addWindow',
      });
    });
  });

  describe('handleCloseToDo function', () => {
    it('close to do and delete window if to do open', () => {
      const initialState = {
        apps: {
          apps: [Apps.ToDo],
        },
        toDo: {
          isToDoCollapsed: true,
          isToDoOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useToDo(), { wrapper });

      act(() => {
        result.current.handleCloseToDo();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: undefined,
        type: 'toDo/closeToDo',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: Apps.ToDo,
        type: 'apps/deleteWindow',
      });
    });

    it('does nothing if to do closed', () => {
      const initialState = {
        apps: {
          apps: [],
        },
        toDo: {
          isToDoCollapsed: true,
          isToDoOpen: false,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useToDo(), { wrapper });

      act(() => {
        result.current.handleCloseToDo();
      });

      expect(mockDispatch).toBeCalledTimes(0);
    });
  });
});

export {};
