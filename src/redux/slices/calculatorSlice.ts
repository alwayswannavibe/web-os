import { createSlice } from '@reduxjs/toolkit';
import { CoordsType } from 'types/coord';
import { getCalcResult } from 'logic/calculator';

const calculatorSlice = createSlice({
  name: 'calculator',
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
      // eslint-disable-next-line no-param-reassign
      state.inputValue = getCalcResult(state.inputValue);
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
