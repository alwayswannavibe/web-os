// Libraries
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

// Components
import { ChatInput } from './ChatInput';

describe('ChatInput', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  const mockSocket = {
    emit: jest.fn(),
  };

  describe('should correctly handle send button', () => {
    it('should send socket message on click on send button', () => {
      const initialState = {
        chat: {
          text: '123',
        },
        user: {
          username: 'anonymous',
          photo: 'photoURL',
        },
        websocket: {
          socket: mockSocket,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

      render(
        <Provider store={mockStoreWithState}>
          <ChatInput />
        </Provider>,
      );

      const btn = document.querySelector('.fa-paper-plane');

      userEvent.click(btn!);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });

    it('should not send socket message on click on send button if input empty or uncorrect', () => {
      const initialState = {
        chat: {
          text: ' ',
        },
        user: {
          username: 'anonymous',
          photo: 'photoURL',
        },
        websocket: {
          socket: mockSocket,
        },
      };
      const mockStoreWithState = mockStore(initialState);
      const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

      render(
        <Provider store={mockStoreWithState}>
          <ChatInput />
        </Provider>,
      );

      const btn = document.querySelector('.fa-paper-plane');

      userEvent.click(btn!);

      expect(mockSocket.emit).toHaveBeenCalledTimes(0);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'chat/clearMessageInputValue',
      });
    });
  });

  it('should correctly handle change input value', () => {
    const initialState = {
      chat: {
        text: '',
      },
      user: {
        username: 'anonymous',
        photo: 'photoURL',
      },
      websocket: {
        socket: mockSocket,
      },
    };
    const mockStoreWithState = mockStore(initialState);
    const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

    render(
      <Provider store={mockStoreWithState}>
        <ChatInput />
      </Provider>,
    );

    const textarea = document.querySelector('textarea');

    userEvent.type(textarea!, '1');

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'chat/changeMessageInputValue',
      payload: '1',
    });
  });

  it('should open emoji on emoji open button click', () => {
    const initialState = {
      chat: {
        text: '',
      },
      user: {
        username: 'anonymous',
        photo: 'photoURL',
      },
      websocket: {
        socket: mockSocket,
      },
    };
    const mockStoreWithState = mockStore(initialState);

    render(
      <Provider store={mockStoreWithState}>
        <ChatInput />
      </Provider>,
    );

    const button = document.querySelector('.fa-face-smile');

    userEvent.click(button!);

    const smilePicker = document.querySelector('.smilePicker');

    expect(smilePicker).toBeInTheDocument();
  });

  it('should add emoji on emoji click', () => {
    const initialState = {
      chat: {
        text: '',
      },
      user: {
        username: 'anonymous',
        photo: 'photoURL',
      },
      websocket: {
        socket: mockSocket,
      },
    };
    const mockStoreWithState = mockStore(initialState);
    const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

    render(
      <Provider store={mockStoreWithState}>
        <ChatInput />
      </Provider>,
    );

    const button = document.querySelector('.fa-face-smile');

    userEvent.click(button!);

    const emoji = document.querySelectorAll('.emoji-img')[0];

    userEvent.click(emoji!);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'chat/addMessageInputValue',
      payload: '😀',
    });
  });
});
