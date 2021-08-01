/* eslint-disable no-param-reassign */

// Libraries
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Types
import { ToDoItem } from 'src/types/toDo';

const toDoList: ToDoItem[] = [];

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
    },
    deleteToDoItem(state, { payload }: { payload: string }) {
      state.toDoList.splice(
        state.toDoList.findIndex((el) => el.id === payload),
        1,
      );
    },
    toggleCompleteToDoItem(state, { payload }: { payload: string }) {
      state.toDoList[state.toDoList.findIndex((el) => el.id === payload)].completed = !state.toDoList[
        state.toDoList.findIndex((el) => el.id === payload)
      ].completed;
    },
    clearToDo(state) {
      state.toDoList = [];
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
