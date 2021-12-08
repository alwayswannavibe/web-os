// Libraries
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Types
import { ToDoItem } from '@ToDo/interfaces/toDo.interface';

interface InitialState {
  toDoList: ToDoItem[];
  activeToDoPage: string;
}

const initialState: InitialState = {
  toDoList: localStorage.getItem('toDoList') && JSON.parse(localStorage.getItem('toDoList')!) || [],
  activeToDoPage: '',
};

const toDoSlice = createSlice({
  name: 'toDo',
  initialState,
  reducers: {
    addToDoItem(state, { payload }: { payload: string }) {
      state.toDoList.push({
        id: uuidv4(),
        text: payload,
        completed: false,
        description: '',
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
    changeActiveToDoPage(state, { payload }: { payload: string }) {
      state.activeToDoPage = payload;
    },
    updateToDoItem(state, { payload }: { payload: ToDoItem }) {
      const index = state.toDoList.findIndex((el) => el.id === payload.id);
      state.toDoList[index].completed = payload.completed;
      state.toDoList[index].text = payload.text;
      state.toDoList[index].description = payload.description;
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
  changeActiveToDoPage,
  updateToDoItem,
} = toDoSlice.actions;
