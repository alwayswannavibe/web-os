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

  it('getCalculatorResult should update lastOperations', () => {
    const testStore = configureStore({
      reducer: {
        calculator: calculatorSlice,
      },
    });
    jest.spyOn(logic, 'getCalcResult').mockReturnValue('4');

    testStore.dispatch(setCalculatorInput('3+1'));
    testStore.dispatch(getCalculatorResult());
    testStore.dispatch(setCalculatorInput('2 + 2'));
    testStore.dispatch(getCalculatorResult());
    testStore.dispatch(setCalculatorInput('1+3'));
    testStore.dispatch(getCalculatorResult());

    expect(testStore.getState().calculator.lastOperations).toEqual(['1+3 = 4', '2+2 = 4', '3+1 = 4']);
  });

  it('deleteLastCalculatorInput should delete the last character of inputValue', () => {
    const testStore = configureStore({
      reducer: {
        calculator: calculatorSlice,
      },
    });

    testStore.dispatch(setCalculatorInput('1+2'));
    testStore.dispatch(deleteLastCalculatorInput());

    expect(testStore.getState().calculator.inputValue).toEqual('1+');
  });

  it('deleteLastCalculatorInput should not delete the last character of inputValue if value is Error', () => {
    const testStore = configureStore({
      reducer: {
        calculator: calculatorSlice,
      },
    });

    testStore.dispatch(setCalculatorInput('Error'));
    testStore.dispatch(deleteLastCalculatorInput());

    expect(testStore.getState().calculator.inputValue).toEqual('Error');
  });

  it('deleteLastCalculatorInput should not delete the last character of inputValue if value is Infinity', () => {
    const testStore = configureStore({
      reducer: {
        calculator: calculatorSlice,
      },
    });

    testStore.dispatch(setCalculatorInput('Infinity'));
    testStore.dispatch(deleteLastCalculatorInput());

    expect(testStore.getState().calculator.inputValue).toEqual('Infinity');
  });

  it('clearCalculatorInput should clear the inputValue', () => {
    const testStore = configureStore({
      reducer: {
        calculator: calculatorSlice,
      },
    });

    testStore.dispatch(setCalculatorInput('1+2'));
    testStore.dispatch(clearCalculatorInput());

    expect(testStore.getState().calculator.inputValue).toEqual('');
  });
});
