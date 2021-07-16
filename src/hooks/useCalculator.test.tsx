// React, redux
import { act, renderHook } from '@testing-library/react-hooks';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Middleware, Dispatch, AnyAction } from 'redux';

// Types
import { Apps } from 'src/types/apps';

// Hooks
import { useCalculator } from './useCalculator';

describe('use calculator hook', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  describe('handleCalculatorCollapseToggle function', () => {
    it('toggle coolapse if calculator not collapsed and not active', () => {
      const initialState = {
        apps: {
          apps: [Apps.Terminal, Apps.Calculator],
        },
        calculator: {
          isCalculatorCollapsed: false,
          isCalculatorOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useCalculator(), { wrapper });

      act(() => {
        result.current.handleCalculatorCollapseToggle();
      });

      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch).toBeCalledWith({
        payload: undefined,
        type: 'calculator/toggleCollapseCalculator',
      });
    });

    it('toggle coolapse if calculator collapsed and not active', () => {
      const initialState = {
        apps: {
          apps: [Apps.Terminal, Apps.Calculator],
        },
        calculator: {
          isCalculatorCollapsed: true,
          isCalculatorOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useCalculator(), { wrapper });

      act(() => {
        result.current.handleCalculatorCollapseToggle();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: Apps.Calculator,
        type: 'apps/setWindowActive',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: undefined,
        type: 'calculator/toggleCollapseCalculator',
      });
    });

    it('toggle coolapse if calculator not collapsed and active', () => {
      const initialState = {
        apps: {
          apps: [Apps.Calculator, Apps.Terminal],
        },
        calculator: {
          isCalculatorCollapsed: false,
          isCalculatorOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useCalculator(), { wrapper });

      act(() => {
        result.current.handleCalculatorCollapseToggle();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: Apps.Terminal,
        type: 'apps/setWindowActive',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: undefined,
        type: 'calculator/toggleCollapseCalculator',
      });
    });
  });

  describe('handleOpenCalculator function', () => {
    it('toggle coolapse if calculator open and collapsed', () => {
      const initialState = {
        apps: {
          apps: [Apps.Calculator],
        },
        calculator: {
          isCalculatorCollapsed: true,
          isCalculatorOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useCalculator(), { wrapper });

      act(() => {
        result.current.handleOpenCalculator();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: undefined,
        type: 'calculator/toggleCollapseCalculator',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: Apps.Calculator,
        type: 'apps/setWindowActive',
      });
    });

    it('does nothing if calculator open and not collapsed', () => {
      const initialState = {
        apps: {
          apps: [Apps.Calculator],
        },
        calculator: {
          isCalculatorCollapsed: false,
          isCalculatorOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useCalculator(), { wrapper });

      act(() => {
        result.current.handleOpenCalculator();
      });

      expect(mockDispatch).toBeCalledTimes(0);
    });

    it('open calculator if calculator closed', () => {
      const initialState = {
        apps: {
          apps: [],
        },
        calculator: {
          isCalculatorCollapsed: false,
          isCalculatorOpen: false,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useCalculator(), { wrapper });

      act(() => {
        result.current.handleOpenCalculator();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: undefined,
        type: 'calculator/openCalculator',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: Apps.Calculator,
        type: 'apps/addWindow',
      });
    });
  });

  describe('handleCloseCalculator function', () => {
    it('close calculator and delete window if calculator open', () => {
      const initialState = {
        apps: {
          apps: [Apps.Calculator],
        },
        calculator: {
          isCalculatorCollapsed: true,
          isCalculatorOpen: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useCalculator(), { wrapper });

      act(() => {
        result.current.handleCloseCalculator();
      });

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: undefined,
        type: 'calculator/closeCalculator',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: Apps.Calculator,
        type: 'apps/deleteWindow',
      });
    });

    it('does nothing if calculator closed', () => {
      const initialState = {
        apps: {
          apps: [],
        },
        calculator: {
          isCalculatorCollapsed: true,
          isCalculatorOpen: false,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
      const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStoreWithState}>{children}</Provider>
      );
      const { result } = renderHook(() => useCalculator(), { wrapper });

      act(() => {
        result.current.handleCloseCalculator();
      });

      expect(mockDispatch).toBeCalledTimes(0);
    });
  });
});

export {};
