// Libraries
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Types
import { Terminal } from 'src/apps/Terminal';

// Logic
import * as processTerminalInput from 'src/logic/terminal';

// Components
import * as Icon from 'src/components/Icon';
import * as Window from 'src/components/Window';

describe('Terminal', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);
  const initialState = {
    terminal: {
      terminalHistory: [
        {
          id: 1,
          message: 'test',
        },
        {
          id: 2,
          message: 'test2',
        },
        {
          id: 3,
          message: 'test3',
        },
        {
          id: 4,
          message: 'test4',
        },
      ],
      terminalInputHistory: [
        'test1',
        'test2',
        'test3',
        'test4',
      ],
    },
  };
  const mockStoreWithState = mockStore(initialState);
  const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

  beforeEach(() => {
    jest.spyOn(Icon, 'Icon').mockReturnValue(<div data-testid="Icon" />);
    jest.spyOn(Window, 'Window').mockImplementation(({ children }) => <div data-testid="Window">{children}</div>);
    jest.spyOn(processTerminalInput, 'processTerminalInput').mockImplementation(jest.fn());
  });

  it('should render', () => {
    render(
      <Provider store={mockStoreWithState}>
        <Terminal />
      </Provider>,
    );

    expect(screen.queryByTestId('Icon')).toBeInTheDocument();
    expect(screen.queryByTestId('Window')).toBeInTheDocument();
  });

  it('should processed submit', () => {
    render(
      <Provider store={mockStoreWithState}>
        <Terminal />
      </Provider>,
    );

    const input = document.getElementsByTagName('input')[0];

    userEvent.type(input, 'open{enter}');

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: '< open',
      type: 'terminal/addTerminalHistory',
    });
    expect(processTerminalInput.processTerminalInput).toBeCalledTimes(1);
    expect(processTerminalInput.processTerminalInput).toHaveBeenCalledWith('open');
  });

  it('should processed submit if input empty', () => {
    render(
      <Provider store={mockStoreWithState}>
        <Terminal />
      </Provider>,
    );

    const input = document.getElementsByTagName('input')[0];

    userEvent.type(input, '{enter}');

    expect(mockDispatch).toBeCalledTimes(0);
    expect(processTerminalInput.processTerminalInput).toBeCalledTimes(0);
  });

  it('should processed arrowup', () => {
    render(
      <Provider store={mockStoreWithState}>
        <Terminal />
      </Provider>,
    );

    const input = document.getElementsByTagName('input')[0];

    userEvent.type(input, '{arrowup}{arrowup}');

    expect(input.value).toEqual('test4');
  });

  it('should processed arrowdown', () => {
    render(
      <Provider store={mockStoreWithState}>
        <Terminal />
      </Provider>,
    );

    const input = document.getElementsByTagName('input')[0];

    userEvent.type(input, '{arrowup}{arrowup}{arrowup}{arrowdown}{arrowdown}');

    expect(input.value).toEqual('test3');
  });

  it('should processed arrowup if length > max length', () => {
    render(
      <Provider store={mockStoreWithState}>
        <Terminal />
      </Provider>,
    );

    const input = document.getElementsByTagName('input')[0];

    userEvent.type(input, '{arrowdown}{arrowdown}');

    expect(input.value).toEqual('');
  });

  it('should processed arrowup if length < min length', () => {
    render(
      <Provider store={mockStoreWithState}>
        <Terminal />
      </Provider>,
    );

    const input = document.getElementsByTagName('input')[0];

    userEvent.type(input, '{arrowup}{arrowup}{arrowup}{arrowup}{arrowup}{arrowup}');

    expect(input.value).toEqual('test1');
  });
});
