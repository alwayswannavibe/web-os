/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { BOMB_NUMBER } from '../constants/bombNumber';

const pattern: number[][] = [];
const visibilityList: boolean[][] = [];

const minesweeperSlice = createSlice({
  name: 'minesweeper',
  initialState: {
    pattern,
    visibilityList,
    size: 10,
    bombCount: 30,
    isLose: false,
    isWin: false,
    numberOfFlags: 0,
    availableFlags: 15,
    isFlagAvailable: true,
    displayCount: 0,
  },
  reducers: {
    generateMinesweeperPattern(state) {
      state.isFlagAvailable = true;
      state.numberOfFlags = 0;
      state.availableFlags = state.bombCount;
      state.isLose = false;
      state.isWin = false;
      state.displayCount = 0;

      const newPattern = Array(state.size);

      for (let i = 0; i < state.size; i++) {
        newPattern[i] = Array(state.size).fill(0);
      }

      const newVisibilityList = Array(state.size);

      for (let i = 0; i < state.size; i++) {
        newVisibilityList[i] = Array(state.size).fill(false);
      }

      state.visibilityList = newVisibilityList;

      for (let i = 0; i < state.bombCount; i++) {
        let randomIndex = Math.round(Math.random() * (state.size * state.size - 1));
        while (newPattern[Math.floor(randomIndex / state.size)][randomIndex % state.size]) {
          randomIndex = Math.round(Math.random() * (state.size * state.size - 1));
        }
        newPattern[Math.floor(randomIndex / state.size)][randomIndex % state.size] = BOMB_NUMBER;
        state.pattern = newPattern;
      }
    },
    calculateMinesweeper(state) {
      state.pattern = state.pattern.map((arr, arrIndex) => (
        arr.map((el, i) => {
          if (el === BOMB_NUMBER) {
            return el;
          }

          let count = 0;

          for (let i1 = arrIndex - 1; i1 <= arrIndex + 1; i1++) {
            for (let j1 = i - 1; j1 <= i + 1; j1++) {
              if (state.pattern[i1] && state.pattern[i1][j1] && state.pattern[i1][j1] === BOMB_NUMBER) {
                count++;
              }
            }
          }

          return count;
        })
      ));
    },
    setVisible(state, { payload }: { payload: { arrIndex: number, index: number } }) {
      const { arrIndex, index } = payload;

      if (state.pattern[arrIndex][index] === BOMB_NUMBER) {
        state.isLose = true;
        for (let i = 0; i < state.size; i++) {
          for (let j = 0; j < state.size; j++) {
            state.visibilityList[i][j] = true;
          }
        }
        return;
      }

      state.visibilityList[arrIndex][index] = true;
      state.displayCount++;

      if (state.displayCount === state.size * state.size - state.bombCount) {
        state.isWin = true;
        return;
      }

      if (state.pattern[arrIndex][index] !== 0) {
        return;
      }

      for (let i = arrIndex - 1; i <= arrIndex + 1; i++) {
        for (let j = index - 1; j <= index + 1; j++) {
          if (i >= 0 && i < state.size && j >= 0 && j < state.size
            && !state.visibilityList[i][j] && state.pattern[i][j] === 0) {
            minesweeperSlice.caseReducers.setVisible(state, { payload: { arrIndex: i, index: j } });
          }
        }
      }

      for (let i1 = arrIndex - 1; i1 <= arrIndex + 1; i1++) {
        for (let j1 = index - 1; j1 <= index + 1; j1++) {
          if (i1 >= 0 && i1 < state.size && j1 >= 0 && j1 < state.size && state.pattern[i1][j1] !== BOMB_NUMBER) {
            if (state.visibilityList[i1][j1] === false) {
              state.displayCount++;
              if (state.displayCount === state.size * state.size - state.bombCount) {
                state.isWin = true;
                for (let i = 0; i < state.size; i++) {
                  for (let j = 0; j < state.size; j++) {
                    state.visibilityList[i][j] = true;
                  }
                }
                return;
              }
            }
            state.visibilityList[i1][j1] = true;
          }
        }
      }
    },
    setSettings(state, { payload } : { payload: { size: number, bombCount: number } }) {
      state.bombCount = payload.bombCount;
      state.availableFlags = payload.bombCount;
      state.size = payload.size;
    },
    addFlag(state) {
      state.numberOfFlags++;
      state.availableFlags--;

      if (state.availableFlags < 1) {
        state.isFlagAvailable = false;
      }
    },
    removeFlag(state) {
      state.numberOfFlags--;
      state.availableFlags++;
    },
  },
});

export default minesweeperSlice.reducer;

export const {
  generateMinesweeperPattern,
  calculateMinesweeper,
  setVisible,
  setSettings,
  addFlag,
  removeFlag,
} = minesweeperSlice.actions;
