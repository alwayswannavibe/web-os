import { act, renderHook } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Middleware, Dispatch, AnyAction } from 'redux';
import { Apps } from 'types/apps';
import { useTerminal } from './useTerminal';

describe('use terminal hook', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  describe('handleTerminalCollapseToggle function', () => {
    it('toggle coolapse if terminal not collapsed and not active', () => {
      const initialState = {
        apps: {
          apps: [Apps.Settings, Apps.Terminal],
        },
        terminal: {
          isTerminalCollapsed: false,
          isTerminalOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useTerminal(), { wrapper });

      act(() => {
        result.current.handleTerminalCollapseToggle();
      });

      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch).toBeCalledWith({
        payload: undefined,
        type: 'terminal/toggleCollapseTerminal',
      });
    });

    it('toggle coolapse if terminal collapsed and not active', () => {
      const initialState = {
        apps: {
          apps: [Apps.Settings, Apps.Terminal],
        },
        terminal: {
          isTerminalCollapsed: true,
          isTerminalOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useTerminal(), { wrapper });

      act(() => {
        result.current.handleTerminalCollapseToggle();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: Apps.Terminal,
        type: 'apps/setWindowActive',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: undefined,
        type: 'terminal/toggleCollapseTerminal',
      });
    });

    it('toggle coolapse if terminal not collapsed and active', () => {
      const initialState = {
        apps: {
          apps: [Apps.Terminal, Apps.Settings],
        },
        terminal: {
          isTerminalCollapsed: false,
          isTerminalOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useTerminal(), { wrapper });

      act(() => {
        result.current.handleTerminalCollapseToggle();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: Apps.Settings,
        type: 'apps/setWindowActive',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: undefined,
        type: 'terminal/toggleCollapseTerminal',
      });
    });
  });

  describe('handleOpenTerminal function', () => {
    it('toggle coolapse if terminal open and collapsed', () => {
      const initialState = {
        apps: {
          apps: [Apps.Terminal],
        },
        terminal: {
          isTerminalCollapsed: true,
          isTerminalOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useTerminal(), { wrapper });

      act(() => {
        result.current.handleOpenTerminal();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: undefined,
        type: 'terminal/toggleCollapseTerminal',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: Apps.Terminal,
        type: 'apps/setWindowActive',
      });
    });

    it('does nothing if terminal open and not collapsed', () => {
      const initialState = {
        apps: {
          apps: [Apps.Terminal],
        },
        terminal: {
          isTerminalCollapsed: false,
          isTerminalOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useTerminal(), { wrapper });

      act(() => {
        result.current.handleOpenTerminal();
      });

      expect(mockDispatch).toBeCalledTimes(0);
    });

    it('open terminal if terminal closed', () => {
      const initialState = {
        apps: {
          apps: [],
        },
        terminal: {
          isTerminalCollapsed: false,
          isTerminalOpen: false,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useTerminal(), { wrapper });

      act(() => {
        result.current.handleOpenTerminal();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: undefined,
        type: 'terminal/openTerminal',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: Apps.Terminal,
        type: 'apps/addWindow',
      });
    });
  });

  describe('handleCloseTerminal function', () => {
    it('close terminal and delete window if terminal open', () => {
      const initialState = {
        apps: {
          apps: [Apps.Terminal],
        },
        terminal: {
          isTerminalCollapsed: true,
          isTerminalOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useTerminal(), { wrapper });

      act(() => {
        result.current.handleCloseTerminal();
      });

      expect(mockDispatch).toBeCalledTimes(3);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: undefined,
        type: 'terminal/closeTerminal',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: Apps.Terminal,
        type: 'apps/deleteWindow',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(3, {
        payload: undefined,
        type: 'terminal/clearTerminalHistory',
      });
    });

    it('does nothing if terminal closed', () => {
      const initialState = {
        apps: {
          apps: [],
        },
        terminal: {
          isTerminalCollapsed: true,
          isTerminalOpen: false,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useTerminal(), { wrapper });

      act(() => {
        result.current.handleCloseTerminal();
      });

      expect(mockDispatch).toBeCalledTimes(0);
    });
  });
});

export {};
