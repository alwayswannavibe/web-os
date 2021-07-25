// React, redux
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

// Components
import * as MessageItem from '../MessageItem';
import { MessagesList } from '.';

describe('MessagesList', () => {
  const initialState = {
    chat: {
      messages: [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
        {
          id: 4,
        },
      ],
    },
  };
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);
  const mockStoreWithState = mockStore(initialState);

  it('should render MessageItem on each message of messages', () => {
    jest.spyOn(MessageItem, 'MessageItem').mockReturnValue(<div className="MessageItem" />);
    render(
      <Provider store={mockStoreWithState}>
        <MessagesList />
      </Provider>,
    );

    expect(document.getElementsByClassName('MessageItem')).toHaveLength(4);
  });
});
