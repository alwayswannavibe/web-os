// eslint-disable-next-line import/no-extraneous-dependencies
import { AnyAction, Dispatch, Middleware } from 'redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { ToDoItem } from 'src/apps/ToDoList/components/ToDoItem';
import styles from 'src/apps/ToDoList/components/ToDoItem/toDoItem.module.css';

describe('to do item component', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);
  const initialState = {
    toDo: {
      toDoList: [
        {
          id: 'a1',
          completed: true,
        },
        {
          id: 'a2',
          completed: false,
        },
      ],
    },
  };
  const mockStoreWithState = mockStore(initialState);
  const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

  const id = 'a1';
  const id2 = 'a2';
  const text = 'a1 text';
  const text2 = 'a2 text';

  describe('correct render', () => {
    it('correct render uncompleted item', () => {
      render(
        <Provider store={mockStoreWithState}>
          <ToDoItem text={text2} id={id2} />
        </Provider>,
      );

      const completedItem = document.getElementsByClassName(styles.completed);
      expect(completedItem).toHaveLength(0);
    });

    it('correct render completed item', () => {
      render(
        <Provider store={mockStoreWithState}>
          <ToDoItem text={text} id={id} />
        </Provider>,
      );

      const completedItem = document.getElementsByClassName(styles.completed);
      expect(completedItem).toHaveLength(1);
    });

    it('correct render text', () => {
      render(
        <Provider store={mockStoreWithState}>
          <ToDoItem text={text} id={id} />
        </Provider>,
      );

      const textParagraph = document.getElementsByClassName(styles.text)[0];
      expect(textParagraph.textContent).toBe(text);
    });

    it('correct render icons', () => {
      render(
        <Provider store={mockStoreWithState}>
          <ToDoItem text={text} id={id} />
        </Provider>,
      );

      const checkIcon = document.getElementsByClassName('fa-check');
      const trashIcon = document.getElementsByClassName('fa-trash-alt');
      expect(checkIcon).toHaveLength(1);
      expect(trashIcon).toHaveLength(1);
    });
  });

  describe('dispatch correct actions on clicks', () => {
    it('dispatch correct action on click complete button', () => {
      render(
        <Provider store={mockStoreWithState}>
          <ToDoItem text={text} id={id} />
        </Provider>,
      );

      const checkIcon = document.getElementsByClassName('fa-check')[0];
      userEvent.click(checkIcon);
      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch).toBeCalledWith({
        payload: id,
        type: 'toDo/toggleCompleteToDoItem',
      });
    });

    it('dispatch correct action on click delete button', () => {
      render(
        <Provider store={mockStoreWithState}>
          <ToDoItem text={text} id={id} />
        </Provider>,
      );

      const trashIcon = document.getElementsByClassName('fa-trash-alt')[0];
      userEvent.click(trashIcon);
      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch).toBeCalledWith({
        payload: id,
        type: 'toDo/deleteToDoItem',
      });
    });
  });
});

export {};
