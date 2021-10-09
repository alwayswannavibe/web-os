// Libraries
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { AnyAction, Dispatch, Middleware, Store } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

// Components
import { CalculatorButton } from './CalculatorButton';

// Styles
import styles from './calculatorButton.module.css';

describe('calculator  components', () => {
  let mockDispatch: jest.SpyInstance<AnyAction, [action: AnyAction]>;
  let mockStoreWithState: Store<any, AnyAction>;

  beforeAll(() => {
    const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
    const mockStore = configureStore(middlewares);
    const initialState = {};
    mockStoreWithState = mockStore(initialState);
    mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
  });

  describe('should dispatch correct action on click', () => {
    it('should dispatch addToCalculatorInput on click', () => {
      render(
        <Provider store={mockStoreWithState}>
          <CalculatorButton value="1" />
        </Provider>,
      );
      const button = document.getElementsByClassName(styles.button)[0];
      userEvent.click(button);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: '1',
        type: 'calculator/addToCalculatorInput',
      });
    });

    it('should dispatch clearCalculatorInput on click', () => {
      render(
        <Provider store={mockStoreWithState}>
          <CalculatorButton value="C" />
        </Provider>,
      );
      const button = document.getElementsByClassName(styles.button)[0];
      userEvent.click(button);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'calculator/clearCalculatorInput',
      });
    });

    it('should dispatch getCalculatorResult on click', () => {
      render(
        <Provider store={mockStoreWithState}>
          <CalculatorButton value="Enter" />
        </Provider>,
      );
      const button = document.getElementsByClassName(styles.button)[0];
      userEvent.click(button);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'calculator/getCalculatorResult',
      });
    });

    it('should dispatch deleteLastCalculatorInput on click', () => {
      render(
        <Provider store={mockStoreWithState}>
          <CalculatorButton value="←" />
        </Provider>,
      );
      const button = document.getElementsByClassName(styles.button)[0];
      userEvent.click(button);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'calculator/deleteLastCalculatorInput',
      });
    });
  });

  it('should has correct value', () => {
    render(
      <Provider store={mockStoreWithState}>
        <CalculatorButton value="1" />
      </Provider>,
    );
    const button = document.getElementsByClassName(styles.button)[0];
    expect(button.textContent).toBe('1');
  });
});

export {};
