// Libraries
import { render, screen } from '@testing-library/react';
import React from 'react';
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

// Components
import { CalculatorInput } from './CalculatorInput';

describe('CalculatorInput a11y test', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    jest.mock('react-i18next', () => ({
      useTranslation: () => ({ t: (key: any) => key }),
    }));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should has correct aria label', () => {
    const initialState = {
      calculator: {
        inputValue: '',
      },
    };
    const mockStoreWithState = mockStore(initialState);

    render(
      <Provider store={mockStoreWithState}>
        <CalculatorInput />
      </Provider>,
    );

    const input = screen.queryByLabelText('calculator.inputAriaLabel');
    expect(input).toBeInTheDocument();
  });
});

export {};
