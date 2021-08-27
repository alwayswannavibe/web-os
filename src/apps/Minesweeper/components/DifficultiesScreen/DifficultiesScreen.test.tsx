// Libraries
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';

// Types
import { Difficulties } from 'src/types/difficulties';

// Constants
import { EASY_MINES_COUNT, EASY_SIZE,
  EXTREME_MINES_COUNT,
  EXTREME_SIZE, HARD_MINES_COUNT, HARD_SIZE, NORMAL_MINES_COUNT, NORMAL_SIZE } from 'src/apps/Minesweeper/constants/sizesAndMines';

// Components
import { DifficultiesScreen } from '.';

describe('Minesweeper DifficultiesScreen', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);
  const initialState = {};
  const mockStoreWithState = mockStore(initialState);
  const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render 4 buttons', () => {
    render(
      <Provider store={mockStoreWithState}>
        <DifficultiesScreen />
      </Provider>,
    );

    const buttons = document.querySelectorAll('button');
    expect(buttons?.length).toBe(4);
    expect(buttons[0].children[0].textContent).toEqual(Difficulties.Easy);
    expect(buttons[0].children[1].textContent).toEqual(`${EASY_SIZE} X ${EASY_SIZE} (${EASY_MINES_COUNT} mines)`);
    expect(buttons[1].children[0].textContent).toEqual(Difficulties.Normal);
    expect(buttons[1].children[1].textContent).toEqual(`${NORMAL_SIZE} X ${NORMAL_SIZE} (${NORMAL_MINES_COUNT} mines)`);
    expect(buttons[2].children[0].textContent).toEqual(Difficulties.Hard);
    expect(buttons[2].children[1].textContent).toEqual(`${HARD_SIZE} X ${HARD_SIZE} (${HARD_MINES_COUNT} mines)`);
    expect(buttons[3].children[0].textContent).toEqual(Difficulties.Extreme);
    expect(buttons[3].children[1].textContent).toEqual(`${EXTREME_SIZE} X ${EXTREME_SIZE} (${EXTREME_MINES_COUNT} mines)`);
  });

  describe('should dispatch setMinesweeperDifficulty on buttons click', () => {
    it('should dispatch setMinesweeperDifficulty easy when click on easy button', () => {
      render(
        <Provider store={mockStoreWithState}>
          <DifficultiesScreen />
        </Provider>,
      );

      const easyButton = document.querySelectorAll('button')[0];

      userEvent.click(easyButton);

      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch).toBeCalledWith({
        type: 'minesweeper/setMinesweeperDifficulty',
        payload: { difficulty: Difficulties.Easy },
      });
    });

    it('should dispatch setMinesweeperDifficulty easy when click on normal button', () => {
      render(
        <Provider store={mockStoreWithState}>
          <DifficultiesScreen />
        </Provider>,
      );

      const normalButton = document.querySelectorAll('button')[1];

      userEvent.click(normalButton);

      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch).toBeCalledWith({
        type: 'minesweeper/setMinesweeperDifficulty',
        payload: { difficulty: Difficulties.Normal },
      });
    });

    it('should dispatch setMinesweeperDifficulty easy when click on hard button', () => {
      render(
        <Provider store={mockStoreWithState}>
          <DifficultiesScreen />
        </Provider>,
      );

      const hardButton = document.querySelectorAll('button')[2];

      userEvent.click(hardButton);

      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch).toBeCalledWith({
        type: 'minesweeper/setMinesweeperDifficulty',
        payload: { difficulty: Difficulties.Hard },
      });
    });

    it('should dispatch setMinesweeperDifficulty easy when click on extreme button', () => {
      render(
        <Provider store={mockStoreWithState}>
          <DifficultiesScreen />
        </Provider>,
      );

      const extremeButton = document.querySelectorAll('button')[3];

      userEvent.click(extremeButton);

      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch).toBeCalledWith({
        type: 'minesweeper/setMinesweeperDifficulty',
        payload: { difficulty: Difficulties.Extreme },
      });
    });
  });
});
