import { act, renderHook } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { Apps } from 'types/apps';
import { addWindow, deleteWindow } from 'redux/slices/appsSlice';
import { closeCalculator, openCalculator, toggleCollapseCalculator } from 'redux/slices/calculatorSlice';
import { useCalculator } from './useCalculator';

describe('use apps hook', () => {
  const wrapper = ({ children }: { children: ReactNode }) => <Provider store={store}>{children}</Provider>;
  const { result, rerender } = renderHook(() => useCalculator(), { wrapper });

  describe('handleCalculatorCollapseToggle function', () => {
    it('toggle coolapse if calculator not collapsed and not active', () => {
      store.dispatch(addWindow(Apps.Calculator));
      store.dispatch(openCalculator());
      store.dispatch(addWindow(Apps.Terminal));
      rerender();
      act(() => {
        result.current.handleCalculatorCollapseToggle();
      });
      expect(store.getState().apps.apps[1]).toBe(Apps.Calculator);
      expect(store.getState().calculator.isCalculatorOpen).toBe(true);
      expect(store.getState().calculator.isCalculatorCollapsed).toBe(true);
      store.dispatch(deleteWindow(Apps.Calculator));
      store.dispatch(closeCalculator());
      store.dispatch(deleteWindow(Apps.Terminal));
      store.dispatch(toggleCollapseCalculator());
    });

    it('toggle coolapse if calculator not collapsed and active', () => {
      store.dispatch(addWindow(Apps.Terminal));
      store.dispatch(addWindow(Apps.Calculator));
      store.dispatch(openCalculator());
      rerender();
      result.current.handleCalculatorCollapseToggle();
      expect(store.getState().apps.apps[1]).toBe(Apps.Calculator);
      expect(store.getState().calculator.isCalculatorOpen).toBe(true);
      expect(store.getState().calculator.isCalculatorCollapsed).toBe(true);
      store.dispatch(deleteWindow(Apps.Calculator));
      store.dispatch(closeCalculator());
      store.dispatch(deleteWindow(Apps.Terminal));
      store.dispatch(toggleCollapseCalculator());
    });

    it('toggle coolapse if calculator collapsed', () => {
      store.dispatch(addWindow(Apps.Calculator));
      store.dispatch(addWindow(Apps.Terminal));
      store.dispatch(openCalculator());
      store.dispatch(toggleCollapseCalculator());
      rerender();
      result.current.handleCalculatorCollapseToggle();
      expect(store.getState().apps.apps[0]).toBe(Apps.Calculator);
      expect(store.getState().calculator.isCalculatorOpen).toBe(true);
      expect(store.getState().calculator.isCalculatorCollapsed).toBe(false);
      store.dispatch(deleteWindow(Apps.Calculator));
      store.dispatch(closeCalculator());
      store.dispatch(deleteWindow(Apps.Terminal));
    });
  });

  describe('handleOpenCalculator function', () => {
    it('toggle collapse if calculator collapsed', () => {
      store.dispatch(openCalculator());
      store.dispatch(addWindow(Apps.Calculator));
      store.dispatch(toggleCollapseCalculator());
      rerender();
      result.current.handleOpenCalculator();
      expect(store.getState().apps.apps[0]).toBe(Apps.Calculator);
      expect(store.getState().calculator.isCalculatorOpen).toBe(true);
      expect(store.getState().calculator.isCalculatorCollapsed).toBe(false);
      store.dispatch(deleteWindow(Apps.Calculator));
      store.dispatch(closeCalculator());
    });

    it('open calculator if it closed', () => {
      rerender();
      result.current.handleOpenCalculator();
      expect(store.getState().apps.apps[0]).toBe(Apps.Calculator);
      expect(store.getState().calculator.isCalculatorOpen).toBe(true);
      expect(store.getState().calculator.isCalculatorCollapsed).toBe(false);
      store.dispatch(deleteWindow(Apps.Calculator));
      store.dispatch(closeCalculator());
    });

    it('does nothing if calculator open and not collapsed', () => {
      store.dispatch(openCalculator());
      store.dispatch(addWindow(Apps.Calculator));
      result.current.handleOpenCalculator();
      expect(store.getState().apps.apps[0]).toBe(Apps.Calculator);
      expect(store.getState().calculator.isCalculatorOpen).toBe(true);
      expect(store.getState().calculator.isCalculatorCollapsed).toBe(false);
      store.dispatch(deleteWindow(Apps.Calculator));
      store.dispatch(closeCalculator());
    });
  });
});

export {};
