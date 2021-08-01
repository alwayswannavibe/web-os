// Types
import { Difficulties } from 'src/types/difficulties';
import { SimonStatus } from 'src/types/simonStatus';

// Logic
import * as simonLogic from 'src/logic/simon';

// Redux
import store from 'src/redux/store';
import { changeDifficulty, restartGame, startShowing, updateStatus } from '.';

describe('simon slice', () => {
  it('should change difficulty then calls changeDifficulty', () => {
    store.dispatch(changeDifficulty({ difficulty: Difficulties.Normal }));

    expect(store.getState().simon.difficulty).toEqual(Difficulties.Normal);
    expect(store.getState().simon.level).toEqual(1);
    expect(store.getState().simon.move).toEqual(1);
    expect(store.getState().simon.simonStatus).toEqual(SimonStatus.Waiting);
    expect(store.getState().simon.pattern).toEqual([]);
  });

  it('should update status then calls updateStatus', () => {
    store.dispatch(updateStatus({ status: SimonStatus.Showing }));

    expect(store.getState().simon.simonStatus).toEqual(SimonStatus.Showing);
  });

  describe('startShowing', () => {
    beforeEach(() => {
      jest.spyOn(simonLogic, 'generatePattern').mockReturnValue([1, 2, 3]);
      jest.spyOn(simonLogic, 'updatePattern').mockReturnValue([1, 2, 4]);
    });

    it('should generate pattern then calls with difficulty is easy', () => {
      store.dispatch(changeDifficulty({ difficulty: Difficulties.Easy }));
      store.dispatch(startShowing());

      expect(simonLogic.generatePattern).toBeCalledTimes(1);
      expect(simonLogic.generatePattern).toHaveBeenCalledWith(4);
      expect(store.getState().simon.pattern).toEqual([1, 2, 3]);
    });

    it('should generate pattern then calls with difficulty is normal', () => {
      store.dispatch(changeDifficulty({ difficulty: Difficulties.Normal }));
      store.dispatch(startShowing());

      expect(simonLogic.generatePattern).toBeCalledTimes(1);
      expect(simonLogic.generatePattern).toHaveBeenCalledWith(4);
      expect(store.getState().simon.pattern).toEqual([1, 2, 3]);
    });

    it('should generate pattern then calls with difficulty is hard', () => {
      store.dispatch(changeDifficulty({ difficulty: Difficulties.Hard }));
      store.dispatch(startShowing());

      expect(simonLogic.generatePattern).toBeCalledTimes(1);
      expect(simonLogic.generatePattern).toHaveBeenCalledWith(9);
      expect(store.getState().simon.pattern).toEqual([1, 2, 3]);
    });

    it('should generate pattern then calls with difficulty is extreme', () => {
      store.dispatch(changeDifficulty({ difficulty: Difficulties.Extreme }));
      store.dispatch(startShowing());

      expect(simonLogic.generatePattern).toBeCalledTimes(1);
      expect(simonLogic.generatePattern).toHaveBeenCalledWith(9);
      expect(store.getState().simon.pattern).toEqual([1, 2, 3]);
    });
  });

  describe('restartGame', () => {
    it('should restart game then calls restartGame', () => {
      store.dispatch(changeDifficulty({ difficulty: Difficulties.Easy }));
      store.dispatch(startShowing());
      store.dispatch(restartGame());

      expect(store.getState().simon.pattern).toEqual([]);
      expect(store.getState().simon.level).toEqual(1);
      expect(store.getState().simon.move).toEqual(1);
      expect(store.getState().simon.simonStatus).toEqual(SimonStatus.Showing);
    });
  });
});

export {};
