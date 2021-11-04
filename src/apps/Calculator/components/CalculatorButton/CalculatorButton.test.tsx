// Libraries
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { AnyAction, Dispatch, Middleware, Store } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import * as FontAwesomeIcon from '@fortawesome/react-fontawesome';

// Components
import { CalculatorButton } from './CalculatorButton';

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

  beforeEach(() => {
    jest.spyOn(FontAwesomeIcon, 'FontAwesomeIcon').mockReturnValue(<div className="FontAwesomeIcon" />);
  });

  describe('should dispatch correct action on click', () => {
    it('should dispatch addToCalculatorInput on click', () => {
      render(
        <Provider store={mockStoreWithState}>
          <CalculatorButton value="1" />
        </Provider>,
      );
      const button = document.querySelector('button');
      userEvent.click(button as HTMLButtonElement);
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
      const button = document.querySelector('button');
      userEvent.click(button as HTMLButtonElement);
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
      const button = document.querySelector('button');
      userEvent.click(button as HTMLButtonElement);
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
      const button = document.querySelector('button');
      userEvent.click(button as HTMLButtonElement);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'calculator/deleteLastCalculatorInput',
      });
    });
  });

  describe('should has correct value', () => {
    it('should has correct value if value is number', () => {
      render(
        <Provider store={mockStoreWithState}>
          <CalculatorButton value="1" />
        </Provider>,
      );
      const button = document.querySelector('button');
      expect(button?.textContent).toBe('1');
    });

    it('should has correct value if value is operator', () => {
      render(
        <Provider store={mockStoreWithState}>
          <CalculatorButton value="+" />
        </Provider>,
      );
      const button = document.querySelector('button');
      expect(button?.textContent).toBe('+');
    });

    it('should has correct value if value is ←', () => {
      render(
        <Provider store={mockStoreWithState}>
          <CalculatorButton value="←" />
        </Provider>,
      );
      const button = document.querySelector('button');
      const icon = document.querySelector('.FontAwesomeIcon');
      expect(button).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });
  });
});

export {};
