import { createSlice } from '@reduxjs/toolkit';
import { CoordsType } from 'types/coord';

const calculatorSlice = createSlice({
  name: 'locale',
  initialState: {
    isCalculatorOpen: localStorage.getItem('isCalculatorOpen') === 'true' || false,
    isCalculatorCollapsed: localStorage.getItem('isCalculatorCollapsed') === 'true' || false,
    calculatorIconTopCoord: localStorage.getItem('calculatorIconTopCoord') || '13rem',
    calculatorIconLeftCoord: localStorage.getItem('calculatorIconLeftCoord') || '1.5rem',
    calculatorTopCoord: localStorage.getItem('calculatorTopCoord') || '15rem',
    calculatorLeftCoord: localStorage.getItem('calculatorLeftCoord') || '8rem',
    inputValue: '',
  },
  reducers: {
    openCalculator(state) {
      // eslint-disable-next-line no-param-reassign
      state.isCalculatorOpen = true;
      localStorage.setItem('isCalculatorOpen', 'true');
    },
    closeCalculator(state) {
      // eslint-disable-next-line no-param-reassign
      state.isCalculatorOpen = false;
      localStorage.setItem('isCalculatorOpen', 'false');
    },
    toggleCollapseCalculator(state) {
      // eslint-disable-next-line no-param-reassign
      state.isCalculatorCollapsed = !state.isCalculatorCollapsed;
      localStorage.setItem('isCalculatorCollapsed', state.isCalculatorCollapsed.toString());
    },
    changeCalculatorCoord(state, { payload }: { payload: CoordsType }) {
      // eslint-disable-next-line no-param-reassign
      state.calculatorTopCoord = payload.top;
      // eslint-disable-next-line no-param-reassign
      state.calculatorLeftCoord = payload.left;
      localStorage.setItem('terminalTopCoord', payload.top);
      localStorage.setItem('terminalLeftCoord', payload.left);
    },
    changeCalculatorIconCoord(state, { payload }: { payload: CoordsType }) {
      // eslint-disable-next-line no-param-reassign
      state.calculatorIconTopCoord = payload.top;
      // eslint-disable-next-line no-param-reassign
      state.calculatorIconLeftCoord = payload.left;
      localStorage.setItem('terminalIconTopCoord', payload.top);
      localStorage.setItem('terminalIconLeftCoord', payload.left);
    },
    getCalculatorResult(state) {
      if (['*', '/', '+', '-', '^', '.'].includes(state.inputValue[0])) {
        // eslint-disable-next-line no-param-reassign
        state.inputValue = '';
        return;
      }

      let prevElIsOperator = false;
      let thisElISOperator = false;

      // eslint-disable-next-line no-restricted-syntax
      for (const el of state.inputValue.split('')) {
        thisElISOperator = ['*', '/', '+', '-', '^', '.'].includes(el);
        if (thisElISOperator && prevElIsOperator) {
          // eslint-disable-next-line no-param-reassign
          state.inputValue = '';
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        prevElIsOperator = thisElISOperator;
      }

      const numbers = state.inputValue.split(/[*+\-/^]/).map(Number);
      const operators = state.inputValue.split(/[0-9, .]+/);
      let index = operators.lastIndexOf('^');
      while (index !== -1) {
        numbers[index - 1] = numbers[index - 1] ** numbers[index];
        numbers.splice(index, 1);
        operators.splice(index, 1);
        index = operators.lastIndexOf('^');
      }

      const compare = (symbol1: string, symbol2: string) => {
        if (
          (operators.indexOf(symbol1) < operators.indexOf(symbol2) && operators.indexOf(symbol1) !== -1) ||
          operators.indexOf(symbol2) === -1
        ) {
          return operators.indexOf(symbol1);
        }
        return operators.indexOf(symbol2);
      };

      index = compare('/', '*');
      while (index !== -1) {
        if (operators.indexOf('/') === index) {
          numbers[index - 1] = numbers[index - 1] / numbers[index];
        } else {
          numbers[index - 1] = numbers[index - 1] * numbers[index];
        }
        numbers.splice(index, 1);
        operators.splice(index, 1);
        index = compare('/', '*');
      }

      index = compare('+', '-');
      let decimalLength = 0;
      while (index !== -1) {
        decimalLength = 0;
        if (numbers[index - 1] % 1 || numbers[index] % 1) {
          decimalLength = Math.max(
            numbers[index - 1].toString().split('.')[1].length,
            numbers[index].toString().split('.')[1].length,
          );
        }
        if (operators.indexOf('+') === index) {
          if (decimalLength) {
            numbers[index - 1] =
              (numbers[index - 1] * 10 ** decimalLength + numbers[index] * 10 ** decimalLength) / 10 ** decimalLength;
          } else {
            numbers[index - 1] = numbers[index - 1] + numbers[index];
          }
        } else if (decimalLength) {
          numbers[index - 1] =
            (numbers[index - 1] * 10 ** decimalLength - numbers[index] * 10 ** decimalLength) / 10 ** decimalLength;
        } else {
          numbers[index - 1] = numbers[index - 1] - numbers[index];
        }
        numbers.splice(index, 1);
        operators.splice(index, 1);
        index = compare('+', '-');
      }
      // eslint-disable-next-line no-param-reassign
      state.inputValue = numbers[0].toString();
    },
    addToCalculatorInput(state, { payload }: { payload: string }) {
      // eslint-disable-next-line no-param-reassign
      state.inputValue += payload;
    },
    deleteLastCalculatorInput(state) {
      // eslint-disable-next-line no-param-reassign
      state.inputValue = state.inputValue.slice(0, state.inputValue.length - 1);
    },
    setCalculatorInput(state, { payload }: { payload: string }) {
      // eslint-disable-next-line no-param-reassign
      state.inputValue = payload;
    },
    clearCalculatorInput(state) {
      // eslint-disable-next-line no-param-reassign
      state.inputValue = '';
    },
  },
});

export default calculatorSlice.reducer;
export const {
  openCalculator,
  closeCalculator,
  toggleCollapseCalculator,
  changeCalculatorCoord,
  changeCalculatorIconCoord,
  getCalculatorResult,
  addToCalculatorInput,
  deleteLastCalculatorInput,
  setCalculatorInput,
  clearCalculatorInput,
} = calculatorSlice.actions;
