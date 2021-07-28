// Libraries
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Types
import { Difficulties } from 'src/types/difficulties';

// Components
import * as Icon from 'src/components/Icon';
import * as Window from 'src/components/Window';
import * as SimonMain from './components/SimonMain';
import { Simon } from '.';

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
        difficulty: Difficulties.None,
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
        difficulty: Difficulties.Easy,
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
        difficulty: Difficulties.Normal,
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
        difficulty: Difficulties.Hard,
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
        difficulty: Difficulties.Extreme,
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
        difficulty: Difficulties.None,
      },
    };
    const mockStoreWithState = mockStore(initialState);
    const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

    render(
      <Provider store={mockStoreWithState}>
        <Simon />
      </Provider>,
    );

    const buttonEasy = screen.queryByText(Difficulties.Easy);

    userEvent.click(buttonEasy!);

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({
      payload: { difficulty: Difficulties.Easy },
      type: 'simon/changeDifficulty',
    });
  });

  it('should dispatch changeDifficulty if click button Normal', () => {
    const initialState = {
      simon: {
        difficulty: Difficulties.None,
      },
    };
    const mockStoreWithState = mockStore(initialState);
    const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

    render(
      <Provider store={mockStoreWithState}>
        <Simon />
      </Provider>,
    );

    const buttonNormal = screen.queryByText(Difficulties.Normal);

    userEvent.click(buttonNormal!);

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({
      payload: { difficulty: Difficulties.Normal },
      type: 'simon/changeDifficulty',
    });
  });

  it('should dispatch changeDifficulty if click button Hard', () => {
    const initialState = {
      simon: {
        difficulty: Difficulties.None,
      },
    };
    const mockStoreWithState = mockStore(initialState);
    const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

    render(
      <Provider store={mockStoreWithState}>
        <Simon />
      </Provider>,
    );

    const buttonHard = screen.queryByText(Difficulties.Hard);

    userEvent.click(buttonHard!);

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({
      payload: { difficulty: Difficulties.Hard },
      type: 'simon/changeDifficulty',
    });
  });

  it('should dispatch changeDifficulty if click buttoExtreme', () => {
    const initialState = {
      simon: {
        difficulty: Difficulties.None,
      },
    };
    const mockStoreWithState = mockStore(initialState);
    const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

    render(
      <Provider store={mockStoreWithState}>
        <Simon />
      </Provider>,
    );

    const buttonExtreme = screen.queryByText(Difficulties.Extreme);

    userEvent.click(buttonExtreme!);

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({
      payload: { difficulty: Difficulties.Extreme },
      type: 'simon/changeDifficulty',
    });
  });
});
