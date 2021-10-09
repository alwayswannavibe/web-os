/* eslint-disable no-param-reassign */

// Librarries
import { createSlice } from '@reduxjs/toolkit';

// Logic
import { getCalcResult } from '@Calculator/logic/getCalculatorResult';

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: {
    inputValue: '',
  },
  reducers: {
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
  getCalculatorResult,
  addToCalculatorInput,
  deleteLastCalculatorInput,
  setCalculatorInput,
  clearCalculatorInput,
} = calculatorSlice.actions;
