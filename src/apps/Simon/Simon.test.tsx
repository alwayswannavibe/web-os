// Libraries
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Enums
import { Difficulty } from '@Enums/difficulty.enum';

// Components
import * as Icon from '@Components/Icon/Icon';
import * as Window from '@Components/Window/Window';
import * as SimonMain from '@Simon/components/SimonMain/SimonMain';
import { Simon } from './Simon';

describe('Simon', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    jest.spyOn(Icon, 'Icon').mockReturnValue(<div data-testid="Icon" />);
    jest.spyOn(Window, 'Window').mockImplementation(({ children }) => <div data-testid="Window">{children}</div>);
    jest.spyOn(SimonMain, 'SimonMain').mockReturnValue(<div data-testid="SimonMain" />);
  });

  it('should render if difficulty equals None', () => {
    const initialState = {
      simon: {
        difficulty: Difficulty.None,
      },
    };
    const mockStoreWithState = mockStore(initialState);

    render(
      <Provider store={mockStoreWithState}>
        <Simon />
      </Provider>,
    );

    expect(document.getElementsByTagName('button')).toHaveLength(4);
  });

  it('should render if difficulty equals Easy', () => {
    const initialState = {
      simon: {
        difficulty: Difficulty.Easy,
      },
    };
    const mockStoreWithState = mockStore(initialState);

    render(
      <Provider store={mockStoreWithState}>
        <Simon />
      </Provider>,
    );

    expect(screen.queryByTestId('SimonMain')).toBeInTheDocument();
    expect(SimonMain.SimonMain).toHaveBeenCalledWith({ numberOfButtons: 4 }, {});
  });

  it('should render if difficulty equals Nomal', () => {
    const initialState = {
      simon: {
        difficulty: Difficulty.Normal,
      },
    };
    const mockStoreWithState = mockStore(initialState);

    render(
      <Provider store={mockStoreWithState}>
        <Simon />
      </Provider>,
    );

    expect(screen.queryByTestId('SimonMain')).toBeInTheDocument();
    expect(SimonMain.SimonMain).toHaveBeenCalledWith({ numberOfButtons: 4 }, {});
  });

  it('should render if difficulty equals Hard', () => {
    const initialState = {
      simon: {
        difficulty: Difficulty.Hard,
      },
    };
    const mockStoreWithState = mockStore(initialState);

    render(
      <Provider store={mockStoreWithState}>
        <Simon />
      </Provider>,
    );

    expect(screen.queryByTestId('SimonMain')).toBeInTheDocument();
    expect(SimonMain.SimonMain).toHaveBeenCalledWith({ numberOfButtons: 9 }, {});
  });

  it('should render if difficulty equals Extreme', () => {
    const initialState = {
      simon: {
        difficulty: Difficulty.Extreme,
      },
    };
    const mockStoreWithState = mockStore(initialState);

    render(
      <Provider store={mockStoreWithState}>
        <Simon />
      </Provider>,
    );

    expect(screen.queryByTestId('SimonMain')).toBeInTheDocument();
    expect(SimonMain.SimonMain).toHaveBeenCalledWith({ numberOfButtons: 9 }, {});
  });

  it('should dispatch changeDifficulty if click button Easy', () => {
    const initialState = {
      simon: {
        difficulty: Difficulty.None,
      },
    };
    const mockStoreWithState = mockStore(initialState);
    const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

    render(
      <Provider store={mockStoreWithState}>
        <Simon />
      </Provider>,
    );

    const buttonEasy = screen.queryByText(Difficulty.Easy);

    userEvent.click(buttonEasy!);

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({
      payload: { difficulty: Difficulty.Easy },
      type: 'simon/changeDifficulty',
    });
  });

  it('should dispatch changeDifficulty if click button Normal', () => {
    const initialState = {
      simon: {
        difficulty: Difficulty.None,
      },
    };
    const mockStoreWithState = mockStore(initialState);
    const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

    render(
      <Provider store={mockStoreWithState}>
        <Simon />
      </Provider>,
    );

    const buttonNormal = screen.queryByText(Difficulty.Normal);

    userEvent.click(buttonNormal!);

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({
      payload: { difficulty: Difficulty.Normal },
      type: 'simon/changeDifficulty',
    });
  });

  it('should dispatch changeDifficulty if click button Hard', () => {
    const initialState = {
      simon: {
        difficulty: Difficulty.None,
      },
    };
    const mockStoreWithState = mockStore(initialState);
    const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

    render(
      <Provider store={mockStoreWithState}>
        <Simon />
      </Provider>,
    );

    const buttonHard = screen.queryByText(Difficulty.Hard);

    userEvent.click(buttonHard!);

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({
      payload: { difficulty: Difficulty.Hard },
      type: 'simon/changeDifficulty',
    });
  });

  it('should dispatch changeDifficulty if click buttoExtreme', () => {
    const initialState = {
      simon: {
        difficulty: Difficulty.None,
      },
    };
    const mockStoreWithState = mockStore(initialState);
    const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

    render(
      <Provider store={mockStoreWithState}>
        <Simon />
      </Provider>,
    );

    const buttonExtreme = screen.queryByText(Difficulty.Extreme);

    userEvent.click(buttonExtreme!);

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({
      payload: { difficulty: Difficulty.Extreme },
      type: 'simon/changeDifficulty',
    });
  });
});
