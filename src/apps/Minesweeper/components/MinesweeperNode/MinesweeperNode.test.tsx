// Libraries
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import React from 'react';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';

// Constants
import { BOMB_NUMBER } from 'src/apps/Minesweeper/constants/bombNumber';

// Components
import { MinesweeperNode } from '.';

describe('MinesweeperNode', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('should render correctly', () => {
    it('should render correctly then not lose, not win, not visible and value equals 1', () => {
      const initialState = {
        minesweeper: {
          isLose: false,
          isWin: false,
          visibilityList: [[false]],
          isFlagAvailable: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);

      render(
        <Provider store={mockStoreWithState}>
          <MinesweeperNode value={1} arrIndex={0} index={0} />
        </Provider>,
      );

      const buttons = document.querySelectorAll('button');
      const button = buttons[0];

      expect(buttons).toHaveLength(1);
      expect(button.textContent).toEqual('');
      expect(button.classList).toHaveLength(1);
      expect(button.classList[0]).toEqual('node');
    });

    it('should render correctly then lose, not win, visible and value equals 1', () => {
      const initialState = {
        minesweeper: {
          isLose: true,
          isWin: false,
          visibilityList: [[true]],
          isFlagAvailable: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);

      render(
        <Provider store={mockStoreWithState}>
          <MinesweeperNode value={1} arrIndex={0} index={0} />
        </Provider>,
      );

      const buttons = document.querySelectorAll('button');
      const button = buttons[0];

      expect(buttons).toHaveLength(1);
      expect(button.textContent).toEqual('1');
      expect(button.classList).toHaveLength(2);
      expect(button.classList[0]).toEqual('node');
      expect(button.classList[1]).toEqual('bombAround1');
    });

    it('should render correctly then not lose, win, visible and value equals 1', () => {
      const initialState = {
        minesweeper: {
          isLose: false,
          isWin: true,
          visibilityList: [[true]],
          isFlagAvailable: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);

      render(
        <Provider store={mockStoreWithState}>
          <MinesweeperNode value={1} arrIndex={0} index={0} />
        </Provider>,
      );

      const buttons = document.querySelectorAll('button');
      const button = buttons[0];

      expect(buttons).toHaveLength(1);
      expect(button.textContent).toEqual('1');
      expect(button.classList).toHaveLength(2);
      expect(button.classList[0]).toEqual('node');
      expect(button.classList[1]).toEqual('bombAround1');
    });

    it('should render correctly then lose, not win, visible and value equals bomb', () => {
      const initialState = {
        minesweeper: {
          isLose: false,
          isWin: true,
          visibilityList: [[true]],
          isFlagAvailable: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);

      render(
        <Provider store={mockStoreWithState}>
          <MinesweeperNode value={BOMB_NUMBER} arrIndex={0} index={0} />
        </Provider>,
      );

      const buttons = document.querySelectorAll('button');
      const button = buttons[0];

      expect(buttons).toHaveLength(1);
      expect(button.textContent).toEqual('');
      expect(button.children).toHaveLength(1);
      expect(button.children[0].classList).toHaveLength(2);
      expect(button.children[0].classList[0]).toEqual('fa');
      expect(button.children[0].classList[1]).toEqual('fa-bomb');
      expect(button.classList).toHaveLength(3);
      expect(button.classList[0]).toEqual('node');
      expect(button.classList[1]).toEqual('win');
      expect(button.classList[2]).toEqual(`bombAround${BOMB_NUMBER}`);
    });

    it('should render correctly then not lose, win, visible and value equals bomb', () => {
      const initialState = {
        minesweeper: {
          isLose: true,
          isWin: false,
          visibilityList: [[true]],
          isFlagAvailable: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);

      render(
        <Provider store={mockStoreWithState}>
          <MinesweeperNode value={BOMB_NUMBER} arrIndex={0} index={0} />
        </Provider>,
      );

      const buttons = document.querySelectorAll('button');
      const button = buttons[0];

      expect(buttons).toHaveLength(1);
      expect(button.textContent).toEqual('');
      expect(button.children).toHaveLength(1);
      expect(button.children[0].classList).toHaveLength(2);
      expect(button.children[0].classList[0]).toEqual('fa');
      expect(button.children[0].classList[1]).toEqual('fa-bomb');
      expect(button.classList).toHaveLength(3);
      expect(button.classList[0]).toEqual('node');
      expect(button.classList[1]).toEqual('lose');
      expect(button.classList[2]).toEqual(`bombAround${BOMB_NUMBER}`);
    });
  });

  describe('should handle click correctly', () => {
    it('should handle click if button visible', () => {
      const initialState = {
        minesweeper: {
          isLose: false,
          isWin: false,
          visibilityList: [[true]],
          isFlagAvailable: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

      render(
        <Provider store={mockStoreWithState}>
          <MinesweeperNode value={1} arrIndex={0} index={0} />
        </Provider>,
      );

      const buttons = document.querySelectorAll('button');
      const button = buttons[0];

      userEvent.click(button);

      expect(mockDispatch).toBeCalledTimes(0);
    });

    it('should handle click if button contains flag', () => {
      const initialState = {
        minesweeper: {
          isLose: false,
          isWin: false,
          visibilityList: [[false]],
          isFlagAvailable: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

      render(
        <Provider store={mockStoreWithState}>
          <MinesweeperNode value={1} arrIndex={0} index={0} />
        </Provider>,
      );

      const buttons = document.querySelectorAll('button');
      const button = buttons[0];

      fireEvent.contextMenu(button);
      userEvent.click(button);

      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        type: 'minesweeper/addFlag',
      });
    });

    it('should handle click  if button value is not bomb number', () => {
      const initialState = {
        minesweeper: {
          isLose: false,
          isWin: false,
          visibilityList: [[false]],
          isFlagAvailable: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

      render(
        <Provider store={mockStoreWithState}>
          <MinesweeperNode value={1} arrIndex={0} index={0} />
        </Provider>,
      );

      const buttons = document.querySelectorAll('button');
      const button = buttons[0];

      userEvent.click(button);

      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        type: 'minesweeper/setVisible',
        payload: { arrIndex: 0, index: 0 },
      });
    });

    it('should handle click if button value is bomb number', () => {
      const initialState = {
        minesweeper: {
          isLose: false,
          isWin: false,
          visibilityList: [[false]],
          isFlagAvailable: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

      render(
        <Provider store={mockStoreWithState}>
          <MinesweeperNode value={BOMB_NUMBER} arrIndex={0} index={0} />
        </Provider>,
      );

      const buttons = document.querySelectorAll('button');
      const button = buttons[0];

      userEvent.click(button);

      const bomb = document.querySelector('.fa-bahai');

      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        type: 'minesweeper/setVisible',
        payload: { arrIndex: 0, index: 0 },
      });
      expect(bomb).toBeInTheDocument();
    });
  });

  describe('should handle right click correctly', () => {
    it('should handle right click if visible', () => {
      const initialState = {
        minesweeper: {
          isLose: true,
          isWin: false,
          visibilityList: [[true]],
          isFlagAvailable: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

      render(
        <Provider store={mockStoreWithState}>
          <MinesweeperNode value={1} arrIndex={0} index={0} />
        </Provider>,
      );

      const buttons = document.querySelectorAll('button');
      const button = buttons[0];

      fireEvent.contextMenu(button);

      expect(mockDispatch).toBeCalledTimes(0);
    });

    it('should handle right click if flag is not available', () => {
      const initialState = {
        minesweeper: {
          isLose: false,
          isWin: false,
          visibilityList: [[false]],
          isFlagAvailable: false,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

      render(
        <Provider store={mockStoreWithState}>
          <MinesweeperNode value={1} arrIndex={0} index={0} />
        </Provider>,
      );

      const buttons = document.querySelectorAll('button');
      const button = buttons[0];

      fireEvent.contextMenu(button);

      expect(mockDispatch).toBeCalledTimes(0);
    });

    it('should handle right click if flag is not setted', () => {
      const initialState = {
        minesweeper: {
          isLose: false,
          isWin: false,
          visibilityList: [[false]],
          isFlagAvailable: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

      render(
        <Provider store={mockStoreWithState}>
          <MinesweeperNode value={1} arrIndex={0} index={0} />
        </Provider>,
      );

      const buttons = document.querySelectorAll('button');
      const button = buttons[0];

      fireEvent.contextMenu(button);

      const flag = document.querySelector('.fa-flag');

      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        type: 'minesweeper/addFlag',
      });
      expect(flag).toBeInTheDocument();
    });

    it('should handle right click if flag is setted', () => {
      const initialState = {
        minesweeper: {
          isLose: false,
          isWin: false,
          visibilityList: [[false]],
          isFlagAvailable: true,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

      render(
        <Provider store={mockStoreWithState}>
          <MinesweeperNode value={1} arrIndex={0} index={0} />
        </Provider>,
      );

      const buttons = document.querySelectorAll('button');
      const button = buttons[0];

      fireEvent.contextMenu(button);
      fireEvent.contextMenu(button);

      const flag = document.querySelector('.fa-flag');

      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        type: 'minesweeper/addFlag',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        type: 'minesweeper/removeFlag',
      });
      expect(flag).not.toBeInTheDocument();
    });
  });
});
