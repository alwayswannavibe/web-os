/* eslint-disable no-param-reassign */

// Libraries
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Types
import { ToDoItem } from '@ToDo/interfaces/toDo.interface';

const toDoList: ToDoItem[] = localStorage.getItem('toDoList') && JSON.parse(localStorage.getItem('toDoList')!) || [];

const toDoSlice = createSlice({
  name: 'toDo',
  initialState: {
    toDoList,
  },
  reducers: {
    addToDoItem(state, { payload }: { payload: string }) {
      state.toDoList.push({
        id: uuidv4(),
        text: payload,
        completed: false,
      });
      localStorage.setItem('toDoList', JSON.stringify(state.toDoList));
    },
    deleteToDoItem(state, { payload }: { payload: string }) {
      state.toDoList.splice(
        state.toDoList.findIndex((el) => el.id === payload),
        1,
      );
      localStorage.setItem('toDoList', JSON.stringify(state.toDoList));
    },
    toggleCompleteToDoItem(state, { payload }: { payload: string }) {
      state.toDoList[state.toDoList.findIndex((el) => el.id === payload)].completed = !state.toDoList[
        state.toDoList.findIndex((el) => el.id === payload)
      ].completed;
      localStorage.setItem('toDoList', JSON.stringify(state.toDoList));
    },
    clearToDo(state) {
      state.toDoList = [];
      localStorage.setItem('toDoList', JSON.stringify(state.toDoList));
    },
  },
});

export default toDoSlice.reducer;
export const {
  addToDoItem,
  deleteToDoItem,
  toggleCompleteToDoItem,
  clearToDo,
} = toDoSlice.actions;
