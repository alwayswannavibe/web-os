// Libraries
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// Types
import { Message } from 'src/types/message';

// Components
import { MessageItem } from '.';

describe('MessagesItem', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);
  const initialState = {
    user: {
      username: 'test',
    },
  };
  const mockStoreWithState = mockStore(initialState);
  const testMessage: Message = {
    id: 'dsad',
    photo: '',
    username: 'test',
    date: 'test date',
    text: 'test message',
  };

  it('should render my message', () => {
    render(
      <Provider store={mockStoreWithState}>
        <MessageItem message={testMessage} />
      </Provider>,
    );

    const avatar = document.getElementsByClassName('avatar')[0];
    const msgOwner = document.getElementsByClassName('msgOwner')[0];
    const msgDate = document.getElementsByClassName('msgDate')[0];
    const msgText = document.getElementsByClassName('msgText')[0];

    expect(document.getElementsByClassName('myMsg')).toHaveLength(1);
    expect(document.getElementsByClassName('avatar')).toHaveLength(1);
    expect(document.getElementsByClassName('msgOwner')).toHaveLength(1);
    expect(document.getElementsByClassName('msgDate')).toHaveLength(1);
    expect(document.getElementsByClassName('msgText')).toHaveLength(1);
    expect((avatar as HTMLImageElement).src).toEqual('https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg');
    expect((msgOwner as HTMLParagraphElement).textContent).toEqual(testMessage.username);
    expect((msgDate as HTMLParagraphElement).textContent).toEqual(testMessage.date);
    expect((msgText as HTMLParagraphElement).textContent).toEqual(testMessage.text);
  });

  it('should render other message', () => {
    testMessage.username = 'other';

    render(
      <Provider store={mockStoreWithState}>
        <MessageItem message={testMessage} />
      </Provider>,
    );

    const avatar = document.getElementsByClassName('avatar')[0];
    const msgOwner = document.getElementsByClassName('msgOwner')[0];
    const msgDate = document.getElementsByClassName('msgDate')[0];
    const msgText = document.getElementsByClassName('msgText')[0];

    expect(document.getElementsByClassName('myMsg')).toHaveLength(0);
    expect(document.getElementsByClassName('avatar')).toHaveLength(1);
    expect(document.getElementsByClassName('msgOwner')).toHaveLength(1);
    expect(document.getElementsByClassName('msgDate')).toHaveLength(1);
    expect(document.getElementsByClassName('msgText')).toHaveLength(1);
    expect((avatar as HTMLImageElement).src).toEqual('https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg');
    expect((msgOwner as HTMLParagraphElement).textContent).toEqual(testMessage.username);
    expect((msgDate as HTMLParagraphElement).textContent).toEqual(testMessage.date);
    expect((msgText as HTMLParagraphElement).textContent).toEqual(testMessage.text);
  });
});
