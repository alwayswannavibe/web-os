// Libraries
import { configureStore } from '@reduxjs/toolkit';

// Logic
import * as logic from '@Calculator/logic/getCalculatorResult';

// Redux
import calculatorSlice, {
  addToCalculatorInput,
  clearCalculatorInput,
  deleteLastCalculatorInput,
  getCalculatorResult,
  setCalculatorInput,
} from './calculatorSlice';

describe('calculatorSlice', () => {
  it('addToCalculatorInput should add value to the inputValue', () => {
    const testStore = configureStore({
      reducer: {
        calculator: calculatorSlice,
      },
    });

    testStore.dispatch(addToCalculatorInput('1'));
    testStore.dispatch(addToCalculatorInput('+'));
    testStore.dispatch(addToCalculatorInput('2'));

    expect(testStore.getState().calculator.inputValue).toEqual('1+2');
  });

  it('setCalculatorInput should replace the inputValue', () => {
    const testStore = configureStore({
      reducer: {
        calculator: calculatorSlice,
      },
    });

    testStore.dispatch(setCalculatorInput('1+2'));

    expect(testStore.getState().calculator.inputValue).toEqual('1+2');
  });

  it('getCalculatorResult should calls the getCalcResult from logic', () => {
    const testStore = configureStore({
      reducer: {
        calculator: calculatorSlice,
      },
    });
    const getCalcResultMock = jest.spyOn(logic, 'getCalcResult');

    testStore.dispatch(setCalculatorInput('1+2'));
    testStore.dispatch(getCalculatorResult());

    expect(getCalcResultMock).toHaveBeenCalledTimes(1);
    expect(getCalcResultMock).toHaveBeenCalledWith('1+2');
  });

  it('deleteLastCalculatorInput should delete the last charachter of inputValue', () => {
    const testStore = configureStore({
      reducer: {
        calculator: calculatorSlice,
      },
    });

    testStore.dispatch(setCalculatorInput('1+2'));
    testStore.dispatch(deleteLastCalculatorInput());

    expect(testStore.getState().calculator.inputValue).toEqual('1+');
  });

  it('clearCalculatorInput should clear the inputValue', () => {
    const testStore = configureStore({
      reducer: {
        calculator: calculatorSlice,
      },
    });

    testStore.dispatch(addToCalculatorInput('1'));
    testStore.dispatch(addToCalculatorInput('+'));
    testStore.dispatch(addToCalculatorInput('2'));
    testStore.dispatch(clearCalculatorInput());

    expect(testStore.getState().calculator.inputValue).toEqual('');
  });
});
