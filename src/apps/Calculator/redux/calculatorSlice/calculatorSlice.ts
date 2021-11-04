/* eslint-disable no-param-reassign */

// Librarries
import { createSlice } from '@reduxjs/toolkit';

// Logic
import { getCalcResult } from '@Calculator/logic/getCalculatorResult';

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: {
    inputValue: '',
    lastOperations: ['', '', ''],
  },
  reducers: {
    getCalculatorResult(state) {
      const result = getCalcResult(state.inputValue);
      state.lastOperations = [`${state.inputValue.replace(/\s+/g, '')} = ${result}`, state.lastOperations[0], state.lastOperations[1]];
      state.inputValue = result;
    },
    addToCalculatorInput(state, { payload }: { payload: string }) {
      state.inputValue += payload;
    },
    deleteLastCalculatorInput(state) {
      if (state.inputValue === 'Error' || state.inputValue === 'Infinity') return;
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
