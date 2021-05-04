// eslint-disable-next-line import/no-extraneous-dependencies
import { AnyAction, Dispatch, Middleware } from 'redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';
import { Calculator } from './index';
import { Apps } from '../../types/apps';

describe('calculator component', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  let initialState = {
    apps: {
      apps: [Apps.Calculator],
    },
    calculator: {
      isCalculatorOpen: false,
      isCalculatorCollapsed: false,
      calculatorTopCoord: '1px',
      calculatorLeftCoord: '1px',
      calculatorIconTopCoord: '1px',
      calculatorIconLeftCoord: '1px',
    },
  };

  beforeEach(() => {
    initialState = {
      apps: {
        apps: [],
      },
      calculator: {
        isCalculatorOpen: false,
        isCalculatorCollapsed: false,
        calculatorTopCoord: '1px',
        calculatorLeftCoord: '1px',
        calculatorIconTopCoord: '1px',
        calculatorIconLeftCoord: '1px',
      },
    };
  });

  it('correct render if calculator closed', () => {
    const mockStoreWithState = mockStore(initialState);
    initialState.apps.apps = [];

    render(
      <Provider store={mockStoreWithState}>
        <Calculator />
      </Provider>,
    );

    const content = document.getElementById('calculator-content');
    const icon = document.getElementById('calculator-icon');
    const window = document.getElementById('calculator-window');
    expect(content).toBeNull();
    expect(icon).not.toBeNull();
    expect(window).toBeNull();
  });

  it('correct render if calculator collapsed', () => {
    initialState.calculator.isCalculatorOpen = true;
    initialState.calculator.isCalculatorCollapsed = true;
    const mockStoreWithState = mockStore(initialState);

    render(
      <Provider store={mockStoreWithState}>
        <Calculator />
      </Provider>,
    );

    const content = document.getElementById('calculator-content');
    const icon = document.getElementById('calculator-icon');
    const window = document.getElementById('calculator-window');
    expect(content).toBeNull();
    expect(icon).not.toBeNull();
    expect(window).toBeNull();
  });

  it('correct render if calculator opened', () => {
    initialState.calculator.isCalculatorOpen = true;
    const mockStoreWithState = mockStore(initialState);

    render(
      <Provider store={mockStoreWithState}>
        <Calculator />
      </Provider>,
    );

    const content = document.getElementById('calculator-content');
    const icon = document.getElementById('calculator-icon');
    const window = document.getElementById('calculator-window');
    expect(content).not.toBeNull();
    expect(icon).not.toBeNull();
    expect(window).not.toBeNull();
  });
});

export {};
