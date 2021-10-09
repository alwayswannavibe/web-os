// Libraries
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

// Components
import * as Avatar from '@Components/Avatar/Avatar';
import { MessageItem } from './MessageItem';

describe('Chat MessageItem', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    jest.spyOn(Avatar, 'Avatar').mockReturnValue(<div data-testid="Avatar" />);
  });

  describe('should render correctly', () => {
    it('should render correctly if user is message owner', () => {
      const initialState = {
        user: {
          username: 'John',
        },
      };
      const mockStoreWithState = mockStore(initialState);

      render(
        <Provider store={mockStoreWithState}>
          <MessageItem message={{
            username: 'John',
            text: 'test msg',
            photo: 'photoUrl',
            id: '1',
            date: '22.06.2036',
          }}
          />
        </Provider>,
      );

      const myMsgElements = document.querySelectorAll('.myMsg');
      const date = screen.queryByText('22.06.2036');
      const username = screen.queryByText('John');
      const avatar = screen.queryByTestId('Avatar');
      const images = document.querySelectorAll('img');
      const toYou = document.querySelector('.toYou');
      const text = screen.queryByText('test msg');

      expect(myMsgElements).toHaveLength(3);
      expect(text).toBeInTheDocument();
      expect(images).toHaveLength(0);
      expect(date).toBeInTheDocument();
      expect(toYou).not.toBeInTheDocument();
      expect(username).toBeInTheDocument();
      expect(avatar).toBeInTheDocument();
    });

    it('should render correctly if message direct to user', () => {
      const initialState = {
        user: {
          username: 'John2',
        },
      };
      const mockStoreWithState = mockStore(initialState);

      render(
        <Provider store={mockStoreWithState}>
          <MessageItem message={{
            username: 'John',
            text: '@John2 test msg',
            photo: 'photoUrl',
            id: '1',
            date: '22.06.2036',
          }}
          />
        </Provider>,
      );

      const myMsgElements = document.querySelectorAll('.myMsg');
      const date = screen.queryByText('22.06.2036');
      const username = screen.queryByText('John');
      const avatar = screen.queryByTestId('Avatar');
      const toYou = document.querySelector('.toYou');
      const images = document.querySelectorAll('img');
      const text = screen.queryByText('@John2 test msg');

      expect(text).toBeInTheDocument();
      expect(myMsgElements).toHaveLength(0);
      expect(images).toHaveLength(0);
      expect(date).toBeInTheDocument();
      expect(toYou).toBeInTheDocument();
      expect(username).toBeInTheDocument();
      expect(avatar).toBeInTheDocument();
    });

    it('should render correctly if message contains image', () => {
      const initialState = {
        user: {
          username: 'John',
        },
      };
      const mockStoreWithState = mockStore(initialState);

      render(
        <Provider store={mockStoreWithState}>
          <MessageItem message={{
            username: 'John',
            text: 'http://photo.test',
            photo: 'photoUrl',
            id: '1',
            date: '22.06.2036',
          }}
          />
        </Provider>,
      );

      const myMsgElements = document.querySelectorAll('.myMsg');
      const date = screen.queryByText('22.06.2036');
      const username = screen.queryByText('John');
      const avatar = screen.queryByTestId('Avatar');
      const images = document.querySelectorAll('img');
      const toYou = document.querySelector('.toYou');
      const text = screen.queryByText('http://photo.test');

      expect(myMsgElements).toHaveLength(3);
      expect(text).not.toBeInTheDocument();
      expect(images).toHaveLength(1);
      expect(date).toBeInTheDocument();
      expect(toYou).not.toBeInTheDocument();
      expect(username).toBeInTheDocument();
      expect(avatar).toBeInTheDocument();
    });

    it('should render correctly if message direct to all', () => {
      const initialState = {
        user: {
          username: 'John2',
        },
      };
      const mockStoreWithState = mockStore(initialState);

      render(
        <Provider store={mockStoreWithState}>
          <MessageItem message={{
            username: 'John',
            text: '@all test msg',
            photo: 'photoUrl',
            id: '1',
            date: '22.06.2036',
          }}
          />
        </Provider>,
      );

      const myMsgElements = document.querySelectorAll('.myMsg');
      const date = screen.queryByText('22.06.2036');
      const username = screen.queryByText('John');
      const avatar = screen.queryByTestId('Avatar');
      const toYou = document.querySelector('.toYou');
      const images = document.querySelectorAll('img');
      const text = screen.queryByText('@all test msg');

      expect(text).toBeInTheDocument();
      expect(myMsgElements).toHaveLength(0);
      expect(images).toHaveLength(0);
      expect(date).toBeInTheDocument();
      expect(toYou).toBeInTheDocument();
      expect(username).toBeInTheDocument();
      expect(avatar).toBeInTheDocument();
    });
  });

  it('should correct handle click on username', () => {
    const initialState = {
      user: {
        username: 'John',
      },
    };
    const mockStoreWithState = mockStore(initialState);
    const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

    render(
      <Provider store={mockStoreWithState}>
        <MessageItem message={{
          username: 'John',
          text: 'test msg',
          photo: 'photoUrl',
          id: '1',
          date: '22.06.2036',
        }}
        />
      </Provider>,
    );

    const btn = document.querySelector('button');

    userEvent.click(btn!);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'chat/addMessageInputValue',
      payload: '@John, ',
    });
  });
});
