import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Types
import { Difficulties } from 'src/types/difficulties';

// Components
import { SimonStatus } from 'src/types/simonStatus';
import { SimonBar } from '.';

describe('SimonBar', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  it('should render if status equals Waiting', () => {
    const initialState = {
      simon: {
        simonStatus: SimonStatus.Waiting,
        level: 1,
      },
    };
    const mockStoreWithState = mockStore(initialState);

    render(
      <Provider store={mockStoreWithState}>
        <SimonBar difficulty={Difficulties.Hard} />
      </Provider>,
    );

    expect(screen.queryByText('Start')).toBeInTheDocument();
    expect(screen.queryByText('Restart')).not.toBeInTheDocument();
  });

  it('should render if status equals Losed', () => {
    const initialState = {
      simon: {
        simonStatus: SimonStatus.Losed,
        level: 1,
      },
    };
    const mockStoreWithState = mockStore(initialState);

    render(
      <Provider store={mockStoreWithState}>
        <SimonBar difficulty={Difficulties.Hard} />
      </Provider>,
    );

    expect(screen.queryByText('Restart')).toBeInTheDocument();
    expect(screen.queryByText('Start')).not.toBeInTheDocument();
  });

  it('should render if status equals Showing', () => {
    const initialState = {
      simon: {
        simonStatus: SimonStatus.Showing,
        level: 1,
      },
    };
    const mockStoreWithState = mockStore(initialState);

    render(
      <Provider store={mockStoreWithState}>
        <SimonBar difficulty={Difficulties.Hard} />
      </Provider>,
    );

    expect(screen.queryByText('Restart')).not.toBeInTheDocument();
    expect(screen.queryByText('Start')).not.toBeInTheDocument();
  });

  it('should start game on click if status equals Waiting', () => {
    const initialState = {
      simon: {
        simonStatus: SimonStatus.Waiting,
        level: 1,
      },
    };
    const mockStoreWithState = mockStore(initialState);
    const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

    render(
      <Provider store={mockStoreWithState}>
        <SimonBar difficulty={Difficulties.Hard} />
      </Provider>,
    );

    const startButton = screen.queryByText('Start');

    userEvent.click(startButton!);

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({
      payload: { status: SimonStatus.Showing },
      type: 'simon/updateStatus',
    });
  });

  it('should restart game on click if status equals Losed', () => {
    const initialState = {
      simon: {
        simonStatus: SimonStatus.Losed,
        level: 1,
      },
    };
    const mockStoreWithState = mockStore(initialState);
    const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

    render(
      <Provider store={mockStoreWithState}>
        <SimonBar difficulty={Difficulties.Hard} />
      </Provider>,
    );

    const restartButton = screen.queryByText('Restart');

    userEvent.click(restartButton!);

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({
      payload: undefined,
      type: 'simon/restartGame',
    });
  });
});
