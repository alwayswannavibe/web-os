/* eslint-disable no-param-reassign */

// Libraries
import { createSlice } from '@reduxjs/toolkit';

// Types
import { Difficulties } from 'src/types/difficulties';
import { SimonStatus } from 'src/types/simonStatus';

// Logic
import { generatePattern, regeneratePattern, updatePattern } from 'src/apps/Simon/logic';

// Assets
import simonSuccessSound from 'src/assets/sounds/simon/simonSuccess.wav';
import simonLoseSound from 'src/assets/sounds/simon/simonLoseSound.wav';

const pattern: number[] = [];

const simonSlice = createSlice({
  name: 'simon',
  initialState: {
    difficulty: Difficulties.None,
    simonStatus: SimonStatus.Waiting,
    level: 1,
    move: 1,
    pattern,
  },
  reducers: {
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
          const audio = new Audio(simonSuccessSound);
          audio.volume = 0.4;
          audio.play();
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
  changeDifficulty,
  updateStatus,
  startShowing,
  simonClick,
  restartGame,
} = simonSlice.actions;
