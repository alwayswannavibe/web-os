// Libraries
import { render, screen } from '@testing-library/react';
import React from 'react';
import { AnyAction, Dispatch, Middleware, Store } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

// Components
import { CalculatorButton } from './CalculatorButton';

describe('CalculatorButton a11y test', () => {
  let mockStoreWithState: Store<any, AnyAction>;

  beforeAll(() => {
    const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
    const mockStore = configureStore(middlewares);
    const initialState = {};
    mockStoreWithState = mockStore(initialState);
  });

  it('should has correct aria label if value is number', () => {
    render(
      <Provider store={mockStoreWithState}>
        <CalculatorButton value="1" />
      </Provider>,
    );
    const button = screen.queryByLabelText('1');
    expect(button).toBeInTheDocument();
  });

  it('should has correct aria label if value is C', () => {
    render(
      <Provider store={mockStoreWithState}>
        <CalculatorButton value="C" />
      </Provider>,
    );
    const button = screen.queryByLabelText('Delete all characters');
    expect(button).toBeInTheDocument();
  });

  it('should has correct aria label if value is ←', () => {
    render(
      <Provider store={mockStoreWithState}>
        <CalculatorButton value="←" />
      </Provider>,
    );
    const button = screen.queryByLabelText('Delete one character');
    expect(button).toBeInTheDocument();
  });

  it('should has correct aria label if value is Enter', () => {
    render(
      <Provider store={mockStoreWithState}>
        <CalculatorButton value="Enter" />
      </Provider>,
    );
    const button = screen.queryByLabelText('Enter');
    expect(button).toBeInTheDocument();
  });

  it('should has correct aria label if value is operator', () => {
    render(
      <Provider store={mockStoreWithState}>
        <CalculatorButton value="+" />
      </Provider>,
    );
    const button = screen.queryByLabelText('+');
    expect(button).toBeInTheDocument();
  });
});

export {};
