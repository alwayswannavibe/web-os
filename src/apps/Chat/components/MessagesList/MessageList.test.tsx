// Libraries
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// Components
import * as MessageItem from '@Chat/components/MessageItem/MessageItem';
import { MessagesList } from './MessagesList';

describe('MessagesList', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    jest.spyOn(MessageItem, 'MessageItem').mockReturnValue(<div className="MessageItem" />);
  });

  it('should render correctly', () => {
    const initialState = {
      chat: {
        messages: [
          {
            id: 1,
            text: '123',
            photo: '',
            username: 'John',
            date: '01.02.2014',
          },
          {
            id: 2,
            text: '123',
            photo: '',
            username: 'John',
            date: '01.02.2014',
          },
        ],
      },
    };
    const mockStoreWithState = mockStore(initialState);

    render(
      <Provider store={mockStoreWithState}>
        <MessagesList />
      </Provider>,
    );

    const messageItems = document.querySelectorAll('.MessageItem');

    expect(messageItems).toHaveLength(2);
  });
});
