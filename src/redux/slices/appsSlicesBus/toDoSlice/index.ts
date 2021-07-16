/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { ToDoItem } from 'src/types/toDo';
import { CoordsType } from 'src/types/coord';

const toDoList: ToDoItem[] = [];

const toDoSlice = createSlice({
  name: 'toDo',
  initialState: {
    isToDoOpen: localStorage.getItem('isToDoOpen') === 'true' || false,
    isToDoCollapsed: localStorage.getItem('isToDoCollapsed') === 'true' || false,
    toDoIconTopCoord: localStorage.getItem('toDoIconTopCoord') || '18rem',
    toDoIconLeftCoord: localStorage.getItem('toDoIconLeftCoord') || '1rem',
    toDoTopCoord: localStorage.getItem('toDoTopCoord') || '10rem',
    toDoLeftCoord: localStorage.getItem('toDoLeftCoord') || '35rem',
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
    openToDo(state) {
      state.isToDoOpen = true;
      localStorage.setItem('isToDoOpen', 'true');
    },
    closeToDo(state) {
      state.isToDoOpen = false;
      localStorage.setItem('isToDoOpen', 'false');
    },
    toggleCollapseToDo(state) {
      state.isToDoCollapsed = !state.isToDoCollapsed;
      localStorage.setItem('isToDoCollapsed', state.isToDoCollapsed.toString());
    },
    changeToDoCoord(state, { payload }: { payload: CoordsType }) {
      state.toDoTopCoord = payload.top;
      state.toDoLeftCoord = payload.left;
      localStorage.setItem('toDoTopCoord', payload.top);
      localStorage.setItem('toDoLeftCoord', payload.left);
    },
    changeToDoIconCoord(state, { payload }: { payload: CoordsType }) {
      state.toDoIconTopCoord = payload.top;
      state.toDoIconLeftCoord = payload.left;
      localStorage.setItem('toDoIconTopCoord', payload.top);
      localStorage.setItem('toDoIconLeftCoord', payload.left);
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
  changeToDoCoord,
  changeToDoIconCoord,
  closeToDo,
  toggleCompleteToDoItem,
  toggleCollapseToDo,
  openToDo,
  clearToDo,
} = toDoSlice.actions;
