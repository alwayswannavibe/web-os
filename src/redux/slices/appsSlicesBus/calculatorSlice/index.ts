/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { CoordsType } from 'src/types/coord';
import { getCalcResult } from 'src/logic/calculator';

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: {
    isCalculatorOpen: localStorage.getItem('isCalculatorOpen') === 'true' || false,
    isCalculatorCollapsed: localStorage.getItem('isCalculatorCollapsed') === 'true' || false,
    calculatorIconTopCoord: localStorage.getItem('calculatorIconTopCoord') || '28rem',
    calculatorIconLeftCoord: localStorage.getItem('calculatorIconLeftCoord') || '1rem',
    calculatorTopCoord: localStorage.getItem('calculatorTopCoord') || '15rem',
    calculatorLeftCoord: localStorage.getItem('calculatorLeftCoord') || '8rem',
    inputValue: '',
  },
  reducers: {
    openCalculator(state) {
      state.isCalculatorOpen = true;
      state.isCalculatorCollapsed = false;
      localStorage.setItem('isCalculatorOpen', 'true');
    },
    closeCalculator(state) {
      state.isCalculatorOpen = false;
      localStorage.setItem('isCalculatorOpen', 'false');
    },
    toggleCollapseCalculator(state) {
      state.isCalculatorCollapsed = !state.isCalculatorCollapsed;
      localStorage.setItem('isCalculatorCollapsed', state.isCalculatorCollapsed.toString());
    },
    changeCalculatorCoord(state, { payload }: { payload: CoordsType }) {
      state.calculatorTopCoord = payload.top;
      state.calculatorLeftCoord = payload.left;
      localStorage.setItem('calculatorTopCoord', payload.top);
      localStorage.setItem('calculatorLeftCoord', payload.left);
    },
    changeCalculatorIconCoord(state, { payload }: { payload: CoordsType }) {
      state.calculatorIconTopCoord = payload.top;
      state.calculatorIconLeftCoord = payload.left;
      localStorage.setItem('calculatorIconTopCoord', payload.top);
      localStorage.setItem('calculatorIconLeftCoord', payload.left);
    },
    getCalculatorResult(state) {
      state.inputValue = getCalcResult(state.inputValue);
    },
    addToCalculatorInput(state, { payload }: { payload: string }) {
      state.inputValue += payload;
    },
    deleteLastCalculatorInput(state) {
      state.inputValue = state.inputValue.slice(0, state.inputValue.length - 1);
    },
    setCalculatorInput(state, { payload }: { payload: string }) {
      state.inputValue = payload;
    },
    clearCalculatorInput(state) {
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
