// Libraries
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { SimonStatus } from '@Simon/enums/simonStatus.enum';
import { App } from '@Enums/app.enum';
import { Difficulty } from '@Enums/difficulty.enum';
import * as SimonBar from '../SimonBar/SimonBar';
import * as SimonButton from '../SimonButton/SimonButton';
import { SimonMain } from './SimonMain';

describe('SimonMain', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    jest.spyOn(SimonBar, 'SimonBar').mockReturnValue(<div data-testid="SimonBar" />);
    jest.spyOn(SimonButton, 'SimonButton').mockReturnValue(<div className="SimonButton" />);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render', () => {
    const initialState = {
      simon: {
        simonStatus: SimonStatus.Waiting,
        pattern: [1, 2, 3],
        level: 1,
        difficulty: Difficulty.Easy,
      },
      apps: {
        appsState: {
          [App.Simon]: {
            isOpened: true,
          },
        },
      },
    };
    const mockStoreWithState = mockStore(initialState);

    render(
      <Provider store={mockStoreWithState}>
        <SimonMain numberOfButtons={4} />
      </Provider>,
    );

    expect(screen.queryByTestId('SimonBar')).toBeInTheDocument();
    expect(document.getElementsByClassName('SimonButton')).toHaveLength(4);
  });

  it('should show if status showing', () => {
    const initialState = {
      simon: {
        simonStatus: SimonStatus.Showing,
        pattern: [1, 2, 3],
        level: 2,
        difficulty: Difficulty.Easy,
      },
      apps: {
        appsState: {
          [App.Simon]: {
            isOpened: true,
          },
        },
      },
    };
    const mockStoreWithState = mockStore(initialState);
    const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

    render(
      <Provider store={mockStoreWithState}>
        <SimonMain numberOfButtons={4} />
      </Provider>,
    );

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({
      payload: undefined,
      type: 'simon/startShowing',
    });
  });

  it('should add active class and play sound if status showing', () => {
    const initialState = {
      simon: {
        simonStatus: SimonStatus.Showing,
        pattern: [1, 2, 3],
        level: 1,
        difficulty: Difficulty.Easy,
      },
      apps: {
        appsState: {
          [App.Simon]: {
            isOpened: true,
          },
        },
      },
    };
    const mockStoreWithState = mockStore(initialState);
    const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');
    jest.useFakeTimers();

    render(
      <Provider store={mockStoreWithState}>
        <SimonMain numberOfButtons={4} />
      </Provider>,
    );

    jest.runAllTimers();

    expect(setTimeout).toBeCalledTimes(10);
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({
      payload: {
        status: SimonStatus.Playing,
      },
      type: 'simon/updateStatus',
    });
  });
});
