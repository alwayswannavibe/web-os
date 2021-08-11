// Redux
import store from 'src/redux/store';
import {
  addToCalculatorInput,
  clearCalculatorInput,
  deleteLastCalculatorInput,
  getCalculatorResult,
  setCalculatorInput,
} from '.';

describe('calculator slice', () => {
  it('add input value to calculator input', () => {
    store.dispatch(addToCalculatorInput('7'));
    expect(store.getState().calculator.inputValue).toEqual('7');
    store.dispatch(clearCalculatorInput());
  });

  it('add input value to calculator input then addToCalculatorInput calls 2+ times', () => {
    store.dispatch(addToCalculatorInput('7'));
    store.dispatch(addToCalculatorInput('+'));
    store.dispatch(addToCalculatorInput('3'));
    expect(store.getState().calculator.inputValue).toEqual('7+3');
    store.dispatch(clearCalculatorInput());
  });

  it('clear calculator input then calls clearCalculatorInput', () => {
    store.dispatch(setCalculatorInput('7+5-2'));
    store.dispatch(clearCalculatorInput());
    expect(store.getState().calculator.inputValue).toEqual('');
  });

  it('set calculator input then calls setCalculatorInput', () => {
    store.dispatch(setCalculatorInput('7+5-2'));
    expect(store.getState().calculator.inputValue).toEqual('7+5-2');
    store.dispatch(clearCalculatorInput());
  });

  it('delete last calculator input character then calls deleteLastCalculatorInput', () => {
    store.dispatch(setCalculatorInput('7+5-2'));
    store.dispatch(deleteLastCalculatorInput());
    expect(store.getState().calculator.inputValue).toEqual('7+5-');
    store.dispatch(clearCalculatorInput());
  });

  it('get calculator input result then calls getCalculatorResult', () => {
    store.dispatch(setCalculatorInput('2*5-2^2+6/2'));
    store.dispatch(getCalculatorResult());
    expect(store.getState().calculator.inputValue).toEqual('9');
    store.dispatch(clearCalculatorInput());
  });
});

export {};
