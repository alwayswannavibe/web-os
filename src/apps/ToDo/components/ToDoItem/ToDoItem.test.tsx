// Libraries
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';
import userEvent from '@testing-library/user-event';

// Components
import { ToDoItem } from '@ToDo/components/ToDoItem/ToDoItem';

// Styles
import styles from './toDoItem.module.css';

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
    it('should render uncompleted item', () => {
      render(
        <Provider store={mockStoreWithState}>
          <ToDoItem text={text2} id={id2} />
        </Provider>,
      );

      const completedItem = document.getElementsByClassName(styles.completed);
      expect(completedItem).toHaveLength(0);
    });

    it('should render completed item', () => {
      render(
        <Provider store={mockStoreWithState}>
          <ToDoItem text={text} id={id} />
        </Provider>,
      );

      const completedItem = document.getElementsByClassName(styles.completed);
      expect(completedItem).toHaveLength(1);
    });

    it('should render text', () => {
      render(
        <Provider store={mockStoreWithState}>
          <ToDoItem text={text} id={id} />
        </Provider>,
      );

      const textParagraph = document.getElementsByClassName(styles.text)[0];
      expect(textParagraph.textContent).toBe(text);
    });

    it('should render icons', () => {
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

  describe('should dispatch correct actions on clicks', () => {
    it('should dispatch correct action on click complete button', () => {
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

    it('should dispatch correct action on click delete button', () => {
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
