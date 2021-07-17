/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { CoordsType } from 'src/types/coord';
import { Difficulties } from 'src/types/difficulties';
import { SimonStatus } from 'src/types/simonStatus';
import { generatePattern, updatePattern } from 'src/logic/simon';
import { RefObject } from 'react';

const pattern: number[] = [];

const simonSlice = createSlice({
  name: 'simon',
  initialState: {
    isSimonOpen: localStorage.getItem('isSimonOpen') === 'true' || false,
    isSimonCollapsed: localStorage.getItem('isSimonCollapsed') === 'true' || false,
    simonIconTopCoord: localStorage.getItem('simonIconTopCoord') || '13rem',
    simonIconLeftCoord: localStorage.getItem('simonIconLeftCoord') || '1rem',
    simonTopCoord: localStorage.getItem('simonTopCoord') || '7rem',
    simonLeftCoord: localStorage.getItem('simonLeftCoord') || '20rem',
    difficulty: Difficulties.None,
    simonStatus: SimonStatus.Waiting,
    level: 1,
    move: 1,
    pattern,
  },
  reducers: {
    openSimon(state) {
      state.isSimonOpen = true;
      state.isSimonCollapsed = false;
      localStorage.setItem('isSimonOpen', 'true');
    },
    closeSimon(state) {
      state.isSimonOpen = false;
      state.difficulty = Difficulties.None;
      localStorage.setItem('isSimonOpen', 'false');
    },
    toggleCollapseSimon(state) {
      state.isSimonCollapsed = !state.isSimonCollapsed;
      localStorage.setItem('isSimonCollapsed', state.isSimonCollapsed.toString());
    },
    changeSimonCoord(state, { payload }: { payload: CoordsType }) {
      state.simonTopCoord = payload.top;
      state.simonLeftCoord = payload.left;
      localStorage.setItem('simonTopCoord', payload.top);
      localStorage.setItem('simonLeftCoord', payload.left);
    },
    changeSimonIconCoord(state, { payload }: { payload: CoordsType }) {
      state.simonIconTopCoord = payload.top;
      state.simonIconLeftCoord = payload.left;
      localStorage.setItem('simonIconTopCoord', payload.top);
      localStorage.setItem('simonIconLeftCoord', payload.left);
    },
    changeDifficulty(state, { payload }: { payload: { difficulty: Difficulties } }) {
      state.difficulty = payload.difficulty;
      state.level = 1;
      state.move = 1;
      state.pattern = [];
      state.simonStatus = SimonStatus.Waiting;
    },
    updateStatus(state, { payload }: { payload: { status: SimonStatus } }) {
      state.simonStatus = payload.status;
    },
    startShowing(state, { payload }: { payload: { buttons: RefObject<HTMLButtonElement>[], activeClass: string } }) {
      if (state.level === 1) {
        if (state.difficulty === Difficulties.Easy || state.difficulty === Difficulties.Normal) {
          state.pattern = generatePattern(4);
        } else {
          state.pattern = generatePattern(9);
        }
      } else if (state.difficulty === Difficulties.Easy || state.difficulty === Difficulties.Normal) {
        state.pattern = updatePattern(state.pattern, 4);
      } else {
        state.pattern = updatePattern(state.pattern, 9);
      }
      state.pattern.forEach((el, index) => {
        setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          payload.buttons[el].current!.classList!.add(payload.activeClass);
        }, 200 * (index + 1) + 700 * index);
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        setTimeout(() => payload.buttons[el].current!.classList!.remove(payload.activeClass), 700 * (index + 1) + 200 * index);
      });
    },
    simonClick(state, { payload }: { payload: { numberOfButton: number } }) {
      if (state.pattern[state.move - 1] !== payload.numberOfButton) {
        state.simonStatus = SimonStatus.Losed;
      } else {
        state.move++;
        if (state.move === state.pattern.length + 1) {
          state.move = 1;
          state.level++;
          state.simonStatus = SimonStatus.Showing;
        }
      }
    },
    restartGame(state) {
      state.level = 1;
      state.move = 1;
      state.pattern = [];
      state.simonStatus = SimonStatus.Showing;
    },
  },
});

export default simonSlice.reducer;
export const {
  openSimon,
  closeSimon,
  toggleCollapseSimon,
  changeSimonCoord,
  changeSimonIconCoord,
  changeDifficulty,
  updateStatus,
  startShowing,
  simonClick,
  restartGame,
} = simonSlice.actions;
