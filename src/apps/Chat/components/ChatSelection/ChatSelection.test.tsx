// Libraries
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';

// Components
import * as SelectionCategory from '@Chat/components/ChatSelection/components/SelectionCategory/SelectionCategory';
import { ChatSelection } from './ChatSelection';

describe('ChatSelection', () => {
  beforeEach(() => {
    jest.spyOn(SelectionCategory, 'SelectionCategory').mockReturnValue(<div
      className="SelectionCategory"
    />);
  });

  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  it('should render correctly', () => {
    const initialState = {
      chatUsers: {
        users: [],
      },
      chatRooms: {
        rooms: [],
      },
    };
    const mockStoreWithState = mockStore(initialState);

    render(
      <Provider store={mockStoreWithState}>
        <ChatSelection />
      </Provider>,
    );

    const chatSelectionElement = document.getElementsByClassName('SelectionCategory');
    const btn = document.querySelector('.toggleVisibilityBtn');

    expect(chatSelectionElement).toHaveLength(2);
    expect(btn).toBeInTheDocument();
    expect(btn!.textContent).toEqual('←');
  });

  it('should close on toggle visibility button click', () => {
    const initialState = {
      chatUsers: {
        users: [],
      },
      chatRooms: {
        rooms: [],
      },
    };
    const mockStoreWithState = mockStore(initialState);

    render(
      <Provider store={mockStoreWithState}>
        <ChatSelection />
      </Provider>,
    );

    const btn = document.querySelector('.toggleVisibilityBtn');

    userEvent.click(btn!);

    expect(btn).toBeInTheDocument();
    expect(btn!.textContent).toEqual('→');
  });

  it('should open on toggle visibility button click twice', () => {
    const initialState = {
      chatUsers: {
        users: [],
      },
      chatRooms: {
        rooms: [],
      },
    };
    const mockStoreWithState = mockStore(initialState);

    render(
      <Provider store={mockStoreWithState}>
        <ChatSelection />
      </Provider>,
    );

    const btn = document.querySelector('.toggleVisibilityBtn');

    userEvent.click(btn!);
    userEvent.click(btn!);

    const chatSelectionElement = document.getElementsByClassName('ChatSelectionElement');

    expect(chatSelectionElement).toHaveLength(2);
    expect(btn).toBeInTheDocument();
    expect(btn!.textContent).toEqual('←');
  });
});
