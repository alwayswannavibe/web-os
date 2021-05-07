import { createSlice } from '@reduxjs/toolkit';
import { ToDoItem } from 'types/toDo';
import { v4 as uuid } from 'uuid';
import { CoordsType } from 'types/coord';

const toDoList: ToDoItem[] = [];

const toDoSlice = createSlice({
  name: 'toDo',
  initialState: {
    isToDoOpen: localStorage.getItem('isToDoOpen') === 'true' || false,
    isToDoCollapsed: localStorage.getItem('isToDoCollapsed') === 'true' || false,
    toDoIconTopCoord: localStorage.getItem('toDoIconTopCoord') || '18rem',
    toDoIconLeftCoord: localStorage.getItem('toDoIconLeftCoord') || '3rem',
    toDoTopCoord: localStorage.getItem('toDoTopCoord') || '10rem',
    toDoLeftCoord: localStorage.getItem('toDoLeftCoord') || '35rem',
    toDoList,
  },
  reducers: {
    addToDoItem(state, { payload }: { payload: string }) {
      state.toDoList.push({
        id: uuid(),
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
      // eslint-disable-next-line no-param-reassign
      state.toDoList[state.toDoList.findIndex((el) => el.id === payload)].completed = !state.toDoList[
        state.toDoList.findIndex((el) => el.id === payload)
      ].completed;
    },
    openToDo(state) {
      // eslint-disable-next-line no-param-reassign
      state.isToDoOpen = true;
      localStorage.setItem('isToDoOpen', 'true');
    },
    closeToDo(state) {
      // eslint-disable-next-line no-param-reassign
      state.isToDoOpen = false;
      localStorage.setItem('isToDoOpen', 'false');
    },
    toggleCollapseToDo(state) {
      // eslint-disable-next-line no-param-reassign
      state.isToDoCollapsed = !state.isToDoCollapsed;
      localStorage.setItem('isToDoCollapsed', state.isToDoCollapsed.toString());
    },
    changeToDoCoord(state, { payload }: { payload: CoordsType }) {
      // eslint-disable-next-line no-param-reassign
      state.toDoTopCoord = payload.top;
      // eslint-disable-next-line no-param-reassign
      state.toDoLeftCoord = payload.left;
      localStorage.setItem('toDoTopCoord', payload.top);
      localStorage.setItem('toDoLeftCoord', payload.left);
    },
    changeToDoIconCoord(state, { payload }: { payload: CoordsType }) {
      // eslint-disable-next-line no-param-reassign
      state.toDoIconTopCoord = payload.top;
      // eslint-disable-next-line no-param-reassign
      state.toDoIconLeftCoord = payload.left;
      localStorage.setItem('toDoIconTopCoord', payload.top);
      localStorage.setItem('toDoIconLeftCoord', payload.left);
    },
    clearToDo(state) {
      // eslint-disable-next-line no-param-reassign
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
