// Libraries
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Firebase
import { firestore } from 'src/firebase-state/firebase';

// Components
import * as Icon from 'src/components/Icon';
import * as Window from 'src/components/Window';
import * as MessagesList from './components/MessagesList';
import { Chat } from '.';

describe('Chat', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);
  const initialState = {
    user: {
      username: 'test',
      photo: '123',
    },
  };
  const mockStoreWithState = mockStore(initialState);

  const mockAdd = jest.fn();

  beforeEach(() => {
    jest.spyOn(Icon, 'Icon').mockReturnValue(<div data-testid="Icon" />);
    jest.spyOn(MessagesList, 'MessagesList').mockReturnValue(<div data-testid="MessagesList" />);
    jest.spyOn(Window, 'Window').mockImplementation(({ children }) => <div data-testid="Window">{children}</div>);
    // @ts-ignore
    jest.spyOn(firestore, 'collection').mockReturnValue({
      add: mockAdd,
    });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should render', () => {
    const mockState = '';
    const mockSetState = jest.fn();
    jest.spyOn(React, 'useState').mockReturnValue([mockState, mockSetState]);

    render(
      <Provider store={mockStoreWithState}>
        <Chat />
      </Provider>,
    );

    expect(screen.queryByTestId('Icon')).toBeInTheDocument();
    expect(screen.queryByTestId('MessagesList')).toBeInTheDocument();
    expect(screen.queryByTestId('Window')).toBeInTheDocument();
    expect(document.getElementsByTagName('form')).toHaveLength(1);
    expect(document.getElementsByTagName('input')).toHaveLength(1);
    expect(document.getElementsByTagName('button')).toHaveLength(1);
  });

  it('should change text on change the input', () => {
    const mockState = '';
    const mockSetState = jest.fn();
    jest.spyOn(React, 'useState').mockReturnValue([mockState, mockSetState]);

    render(
      <Provider store={mockStoreWithState}>
        <Chat />
      </Provider>,
    );

    const input = document.getElementsByTagName('input')[0];

    userEvent.type(input, 't');

    expect(mockSetState).toBeCalledTimes(1);
    expect(mockSetState).toBeCalledWith('t');
  });

  it('should handle sumbit on click the button with not empty input', () => {
    const mockState = 'test';
    const mockSetState = jest.fn();
    jest.spyOn(React, 'useState').mockReturnValue([mockState, mockSetState]);

    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2021, 6, 6));

    render(
      <Provider store={mockStoreWithState}>
        <Chat />
      </Provider>,
    );

    const button = document.getElementsByTagName('button')[0];

    userEvent.click(button);

    expect(mockAdd).toBeCalledTimes(1);
    expect(mockAdd).toBeCalledWith({
      photoURL: '123',
      text: 'test',
      username: 'test',
      date: new Date(2021, 6, 6),
    });
    expect(mockSetState).toBeCalledTimes(2);
    expect(mockSetState).toHaveBeenNthCalledWith(1, 'test');
    expect(mockSetState).toHaveBeenNthCalledWith(2, '');
  });

  it('should handle sumbit on click the button with empty input', () => {
    const mockState = '';
    const mockSetState = jest.fn();
    jest.spyOn(React, 'useState').mockReturnValue([mockState, mockSetState]);

    render(
      <Provider store={mockStoreWithState}>
        <Chat />
      </Provider>,
    );

    const button = document.getElementsByTagName('button')[0];

    userEvent.click(button);

    expect(mockAdd).toBeCalledTimes(0);
    expect(mockSetState).toBeCalledTimes(0);
  });
});
