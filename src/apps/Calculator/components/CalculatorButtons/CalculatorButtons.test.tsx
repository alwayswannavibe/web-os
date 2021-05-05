import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AnyAction, Dispatch, Middleware } from 'redux';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import styles from './style.module.css';
import { CalculatorButtons } from './index';

describe('calculator buttons component', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);
  const initialState = {};
  const mockStoreWithState = mockStore(initialState);
  const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

  beforeEach(() => {
    render(
      <Provider store={mockStoreWithState}>
        <CalculatorButtons />
      </Provider>,
    );
  });

  describe('correct render buttons', () => {
    it('correct render number buttons', () => {
      const numberButtons = document.getElementsByClassName(styles.numberButton);
      expect(numberButtons).toHaveLength(9);
    });

    it('correct render zero button', () => {
      const zeroButton = document.getElementsByClassName(styles.zeroButton);
      expect(zeroButton).toHaveLength(1);
    });

    it('correct render operation buttons', () => {
      const operationButtons = document.getElementsByClassName(styles.operationButton);
      expect(operationButtons).toHaveLength(7);
    });

    it('correct render clear one button', () => {
      const clearOneButton = document.getElementsByClassName(styles.clearOneButton);
      expect(clearOneButton).toHaveLength(1);
    });

    it('correct render enter button', () => {
      const enterButton = document.getElementsByClassName(styles.enterButton);
      expect(enterButton).toHaveLength(1);
    });
  });

  describe('handleClick function', () => {
    it('dispatch getCalculatorResult if argument is Enter', () => {
      const enterButton = document.getElementsByClassName(styles.enterButton)[0].children[0];
      userEvent.click(enterButton);
      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ payload: undefined, type: 'calculator/getCalculatorResult' });
    });

    it('dispatch clearCalculatorInput if argument is C', () => {
      const clearOneButton = document.getElementsByClassName(styles.operationButton)[6].children[0];
      userEvent.click(clearOneButton);
      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ payload: undefined, type: 'calculator/clearCalculatorInput' });
    });

    it('dispatch deleteLastCalculatorInput if argument is ←', () => {
      const clearOneButton = document.getElementsByClassName(styles.clearOneButton)[0].children[0];
      userEvent.click(clearOneButton);
      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ payload: undefined, type: 'calculator/deleteLastCalculatorInput' });
    });

    it('dispatch addToCalculatorInput if argument is number', () => {
      const numberButton = document.getElementsByClassName(styles.numberButton)[0].children[0];
      userEvent.click(numberButton);
      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ payload: '1', type: 'calculator/addToCalculatorInput' });
    });

    it('dispatch addToCalculatorInput if argument is operation', () => {
      const operationButton = document.getElementsByClassName(styles.operationButton)[0].children[0];
      userEvent.click(operationButton);
      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ payload: '+', type: 'calculator/addToCalculatorInput' });
    });
  });
});

export {};
