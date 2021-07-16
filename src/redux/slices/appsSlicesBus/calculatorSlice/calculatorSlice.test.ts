import store from 'src/redux/store';
import {
  addToCalculatorInput,
  changeCalculatorCoord,
  changeCalculatorIconCoord,
  clearCalculatorInput,
  closeCalculator,
  deleteLastCalculatorInput,
  getCalculatorResult,
  openCalculator,
  setCalculatorInput,
  toggleCollapseCalculator,
} from '.';

describe('calculator slice', () => {
  it('opens then calls openCalculator', () => {
    store.dispatch(openCalculator());
    expect(store.getState().calculator.isCalculatorOpen).toEqual(true);
    store.dispatch(closeCalculator());
  });

  it('closes then calls closeCalculator', () => {
    store.dispatch(openCalculator());
    store.dispatch(closeCalculator());
    expect(store.getState().calculator.isCalculatorOpen).toEqual(false);
  });

  it('toggles collapse then calls toggleCollapseCalculator', () => {
    store.dispatch(openCalculator());
    store.dispatch(toggleCollapseCalculator());
    expect(store.getState().calculator.isCalculatorCollapsed).toEqual(true);
    store.dispatch(toggleCollapseCalculator());
    expect(store.getState().calculator.isCalculatorCollapsed).toEqual(false);
    store.dispatch(closeCalculator());
  });

  it('changes coordinates then calls changeCalculatorCoord', () => {
    store.dispatch(
      changeCalculatorCoord({
        top: '23px',
        left: '250px',
      }),
    );
    expect(store.getState().calculator.calculatorLeftCoord).toEqual('250px');
    expect(store.getState().calculator.calculatorTopCoord).toEqual('23px');
    store.dispatch(
      changeCalculatorCoord({
        top: '13rem',
        left: '1.5rem',
      }),
    );
  });

  it('changes icon coordinates then calls changeCalculatorIconCoord', () => {
    store.dispatch(
      changeCalculatorIconCoord({
        top: '210px',
        left: '750px',
      }),
    );
    expect(store.getState().calculator.calculatorIconLeftCoord).toEqual('750px');
    expect(store.getState().calculator.calculatorIconTopCoord).toEqual('210px');
    store.dispatch(
      changeCalculatorIconCoord({
        top: '15rem',
        left: '8rem',
      }),
    );
  });

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
