/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { CoordsType } from 'src/types/coord';
import { Difficulties } from 'src/types/difficulties';
import { SimonStatus } from 'src/types/simonStatus';
import { generatePattern, regeneratePattern, updatePattern } from 'src/logic/simon';

// Assets
import simonSuccessSound from 'src/assets/sounds/simon/simonSuccess.wav';
import simonLoseSound from 'src/assets/sounds/simon/simonLoseSound.wav';

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
    startShowing(state) {
      if (state.level === 1) {
        if (state.difficulty === Difficulties.Easy || state.difficulty === Difficulties.Normal) {
          state.pattern = generatePattern(4);
        } else {
          state.pattern = generatePattern(9);
        }
      } else if (state.difficulty === Difficulties.Easy) {
        state.pattern = updatePattern(state.pattern, 4);
      } else if (state.difficulty === Difficulties.Normal) {
        state.pattern = regeneratePattern(3 + (state.level - 1), 4);
      } else if (state.difficulty === Difficulties.Hard) {
        state.pattern = updatePattern(state.pattern, 9);
      } else {
        state.pattern = regeneratePattern(3 + (state.level - 1), 9);
      }
    },
    simonClick(state, { payload }: { payload: { numberOfButton: number } }) {
      if (state.pattern[state.move - 1] !== payload.numberOfButton) {
        state.simonStatus = SimonStatus.Losed;
        new Audio(simonLoseSound).play();
      } else {
        state.move++;
        if (state.move === state.pattern.length + 1) {
          new Audio(simonSuccessSound).play();
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
