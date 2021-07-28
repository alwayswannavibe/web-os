import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import * as Icon from 'src/components/Icon';
import * as Window from 'src/components/Window';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as ToDoItem from './components/ToDoItem';
import { ToDoList } from '.';

describe('ToDoList', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);
  const initialState = {
    toDo: {
      toDoList: [
        {
          id: 1,
          text: 'test1',
        },
        {
          id: 2,
          text: 'test2',
        },
      ],
    },
  };
  const mockStoreWithState = mockStore(initialState);
  const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

  beforeEach(() => {
    jest.spyOn(Icon, 'Icon').mockReturnValue(<div data-testid="Icon" />);
    jest.spyOn(Window, 'Window').mockImplementation(({ children }) => <div data-testid="Window">{children}</div>);
    jest.spyOn(ToDoItem, 'ToDoItem').mockReturnValue(<div className="ToDoItem" />);
  });

  it('should render', () => {
    render(
      <Provider store={mockStoreWithState}>
        <ToDoList />
      </Provider>,
    );

    expect(document.getElementsByClassName('ToDoItem')).toHaveLength(2);
    expect(document.getElementsByClassName('fa-plus')).toHaveLength(1);
    expect(document.getElementsByTagName('input')).toHaveLength(1);
  });

  it('should does nothing on click if input is empty', () => {
    render(
      <Provider store={mockStoreWithState}>
        <ToDoList />
      </Provider>,
    );

    const addButton = document.getElementsByClassName('fa-plus')[0];

    userEvent.click(addButton);

    expect(mockDispatch).toBeCalledTimes(0);
  });

  it('should does nothing on click if input is not empty', () => {
    render(
      <Provider store={mockStoreWithState}>
        <ToDoList />
      </Provider>,
    );

    const addButton = document.getElementsByClassName('fa-plus')[0];
    const input = document.getElementsByTagName('input')[0];

    userEvent.type(input, 'test');
    userEvent.click(addButton);

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({
      payload: 'test',
      type: 'toDo/addToDoItem',
    });
  });

  it('should does nothing on submit if input is not empty', () => {
    render(
      <Provider store={mockStoreWithState}>
        <ToDoList />
      </Provider>,
    );

    const input = document.getElementsByTagName('input')[0];

    userEvent.type(input, 'test{enter}');

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({
      payload: 'test',
      type: 'toDo/addToDoItem',
    });
  });

  it('should does nothing on submit if input is empty', () => {
    render(
      <Provider store={mockStoreWithState}>
        <ToDoList />
      </Provider>,
    );

    const input = document.getElementsByTagName('input')[0];

    userEvent.type(input, '{enter}');

    expect(mockDispatch).toBeCalledTimes(0);
  });
});
