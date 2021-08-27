// Libraries
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';

// Types
import { Difficulties } from 'src/types/difficulties';
import { Apps } from 'src/types/apps';

// Components
import * as Icon from 'src/components/Icon';
import * as Window from 'src/components/Window';
import * as MinesweeperNode from './components/MinesweeperNode';
import * as Sidebar from './components/Sidebar';
import * as DifficultiesScreen from './components/DifficultiesScreen';
import { Minesweeper } from '.';

describe('Minesweeper', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    jest.spyOn(Icon, 'Icon').mockReturnValue(<div data-testid="Icon" />);
    jest.spyOn(Window, 'Window').mockImplementation(({ children }) => <div data-testid="Window">{children}</div>);
    jest.spyOn(Sidebar, 'Sidebar').mockReturnValue(<div data-testid="Sidebar" />);
    jest.spyOn(DifficultiesScreen, 'DifficultiesScreen').mockReturnValue(<div data-testid="DifficultiesScreen" />);
    jest.spyOn(MinesweeperNode, 'MinesweeperNode').mockReturnValue(<div className="MinesweeperNode" />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('should render correctly', () => {
    it('should render correctly if Difficulty is none', () => {
      const initialState = {
        minesweeper: {
          pattern: [[1, 2, 1, 2], [1, 2, 1, 1], [0, 0, 4, 5], [5, 6, 4, 2]],
          size: 4,
          difficulty: Difficulties.None,
        },
        apps: {
          appsState: {
            [Apps.Minesweeper]: {
              isOpen: true,
              isCollapsed: false,
            },
          },
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

      render(
        <Provider store={mockStoreWithState}>
          <Minesweeper />
        </Provider>,
      );

      const icon = screen.queryByTestId('Icon');
      const window = screen.queryByTestId('Window');
      const sidebar = screen.queryByTestId('Sidebar');
      const difficultiesScreen = screen.queryByTestId('DifficultiesScreen');
      const minesweeperNodes = document.querySelectorAll('.MinesweeperNode');

      expect(icon).toBeInTheDocument();
      expect(window).toBeInTheDocument();
      expect(sidebar).not.toBeInTheDocument();
      expect(difficultiesScreen).toBeInTheDocument();
      expect(minesweeperNodes).toHaveLength(0);
      expect(mockDispatch).toHaveBeenCalledTimes(0);
    });

    it('should render correctly if Difficulty is not none', () => {
      const initialState = {
        minesweeper: {
          pattern: [[1, 2, 1, 2], [1, 2, 1, 1], [0, 0, 4, 5], [5, 6, 4, 2]],
          size: 4,
          difficulty: Difficulties.Easy,
        },
        apps: {
          appsState: {
            [Apps.Minesweeper]: {
              isOpen: true,
              isCollapsed: false,
            },
          },
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

      render(
        <Provider store={mockStoreWithState}>
          <Minesweeper />
        </Provider>,
      );

      const icon = screen.queryByTestId('Icon');
      const window = screen.queryByTestId('Window');
      const sidebar = screen.queryByTestId('Sidebar');
      const difficultiesScreen = screen.queryByTestId('DifficultiesScreen');
      const minesweeperNodes = document.querySelectorAll('.MinesweeperNode');

      expect(icon).toBeInTheDocument();
      expect(window).toBeInTheDocument();
      expect(sidebar).toBeInTheDocument();
      expect(difficultiesScreen).not.toBeInTheDocument();
      expect(minesweeperNodes).toHaveLength(16);
      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        type: 'minesweeper/generateMinesweeperPattern',
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        type: 'minesweeper/calculateMinesweeper',
      });
    });
  });
});
