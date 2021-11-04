// Libraries
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';

// Components
import { CalculatorLastOperationsList } from '@Calculator/components/CalculatorLastOperationsList/CalculatorLastOperationsList';

describe('CalculatorLastOperationList test', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const initialState = {
      calculator: {
        lastOperations: ['1+1 = 2', '2+2 = 4', '3+3 = 6'],
      },
    };
    const mockStoreWithState = mockStore(initialState);

    render(
      <Provider store={mockStoreWithState}>
        <CalculatorLastOperationsList />
      </Provider>,
    );

    const elements = document.getElementsByTagName('li');
    expect(elements).toHaveLength(3);
    expect(elements[0].textContent).toBe('1+1 = 2');
    expect(elements[1].textContent).toBe('2+2 = 4');
    expect(elements[2].textContent).toBe('3+3 = 6');
  });
});
