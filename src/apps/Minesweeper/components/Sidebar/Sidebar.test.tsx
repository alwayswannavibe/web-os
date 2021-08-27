// Libraries
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

// Types
import { Difficulties } from 'src/types/difficulties';

// Components
import { Sidebar } from '.';

describe('Minesweeper Sidebar', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('should render correctly', () => {
    it('should render correctly if game is win', () => {
      const initialState = {
        minesweeper: {
          isLose: false,
          isWin: true,
          availableFlags: 0,
        },
      };
      const mockStoreWithState = mockStore(initialState);

      render(
        <Provider store={mockStoreWithState}>
          <Sidebar />
        </Provider>,
      );

      const paragraphs = document.querySelectorAll('p');
      const buttons = document.querySelectorAll('button');

      expect(paragraphs).toHaveLength(2);
      expect(paragraphs[0].children[0].classList[1]).toEqual('fa-flag');
      expect(paragraphs[0].textContent).toEqual('Available : 0');
      expect(paragraphs[1].textContent).toEqual('You win!');
      expect(buttons).toHaveLength(2);
      expect(buttons[0].textContent).toEqual('Change difficulty');
      expect(buttons[1].textContent).toEqual('Restart');
    });

    it('should render correctly if game is lose', () => {
      const initialState = {
        minesweeper: {
          isLose: true,
          isWin: false,
          availableFlags: 0,
        },
      };
      const mockStoreWithState = mockStore(initialState);

      render(
        <Provider store={mockStoreWithState}>
          <Sidebar />
        </Provider>,
      );

      const paragraphs = document.querySelectorAll('p');
      const buttons = document.querySelectorAll('button');

      expect(paragraphs).toHaveLength(2);
      expect(paragraphs[0].children[0].classList[1]).toEqual('fa-flag');
      expect(paragraphs[0].textContent).toEqual('Available : 0');
      expect(paragraphs[1].textContent).toEqual('You lose!');
      expect(buttons).toHaveLength(2);
      expect(buttons[0].textContent).toEqual('Change difficulty');
      expect(buttons[1].textContent).toEqual('Restart');
    });

    it('should render correctly if game is not lose or win', () => {
      const initialState = {
        minesweeper: {
          isLose: false,
          isWin: false,
          availableFlags: 3,
        },
      };
      const mockStoreWithState = mockStore(initialState);

      render(
        <Provider store={mockStoreWithState}>
          <Sidebar />
        </Provider>,
      );

      const paragraphs = document.querySelectorAll('p');
      const buttons = document.querySelectorAll('button');

      expect(paragraphs).toHaveLength(1);
      expect(paragraphs[0].children[0].classList[1]).toEqual('fa-flag');
      expect(paragraphs[0].textContent).toEqual('Available : 3');
      expect(buttons).toHaveLength(0);
    });
  });

  it('should handle click on restart button correctly', () => {
    const initialState = {
      minesweeper: {
        isLose: true,
        isWin: false,
        availableFlags: 3,
      },
    };
    const mockStoreWithState = mockStore(initialState);
    const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

    render(
      <Provider store={mockStoreWithState}>
        <Sidebar />
      </Provider>,
    );

    const buttons = document.querySelectorAll('button');

    userEvent.click(buttons[1]);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      type: 'minesweeper/generateMinesweeperPattern',
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      type: 'minesweeper/calculateMinesweeper',
    });
  });

  it('should handle clicl on change difficulty button correctly', () => {
    const initialState = {
      minesweeper: {
        isLose: true,
        isWin: false,
        availableFlags: 3,
      },
    };
    const mockStoreWithState = mockStore(initialState);
    const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

    render(
      <Provider store={mockStoreWithState}>
        <Sidebar />
      </Provider>,
    );

    const buttons = document.querySelectorAll('button');

    userEvent.click(buttons[0]);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      type: 'minesweeper/setMinesweeperDifficulty',
      payload: { difficulty: Difficulties.None },
    });
  });
});
