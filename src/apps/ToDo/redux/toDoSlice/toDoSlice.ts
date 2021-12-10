// Libraries
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

// Types
import { ToDoItem } from '@ToDo/interfaces/toDo.interface';

interface InitialState {
  toDoList: ToDoItem[];
  activeToDoPage: string;
  isToDoListLoading: boolean;
}

const initialState: InitialState = {
  toDoList: localStorage.getItem('toDoList') && JSON.parse(localStorage.getItem('toDoList')!) || [],
  activeToDoPage: '',
  isToDoListLoading: false,
};

const addToDoItem = createAsyncThunk('toDo/addToDoItem', async (payload: string, thunkApi) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/toDo/items`, {
      heading: payload,
    }, {
      withCredentials: true,
      timeout: 30000,
    });

    if (res.data.isSuccess) {
      return res.data;
    }

    return thunkApi.rejectWithValue({
      error: res.data.error,
      payload,
    });
  } catch (err: unknown) {
    return thunkApi.rejectWithValue({
      error: err,
      payload,
    });
  }
});

const deleteToDoItem = createAsyncThunk('toDo/deleteToDoItem', async (payload: string, thunkApi) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/toDo/items?id=${payload}`, {
      withCredentials: true,
      timeout: 30000,
    });

    if (res.data.isSuccess) {
      return res.data;
    }

    return thunkApi.rejectWithValue({
      error: res.data.error,
      payload,
    });
  } catch (err: unknown) {
    return thunkApi.rejectWithValue({
      error: err,
      payload,
    });
  }
});

const getToDoItems = createAsyncThunk('toDo/getToDoItems', async (payload, thunkApi) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/toDo/items`, {
      withCredentials: true,
      timeout: 30000,
    });
    return res.data;
  } catch (err: unknown) {
    return thunkApi.rejectWithValue({
      error: err,
    });
  }
});

const updateToDoItem = createAsyncThunk('toDo/updateToDoItem', async (payload: ToDoItem, thunkApi) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/toDo/items`, {
      ...payload,
      ...{ id: +payload.id },
    }, {
      withCredentials: true,
      timeout: 30000,
    });

    if (res.data.isSuccess) {
      return res.data;
    }

    return thunkApi.rejectWithValue({
      error: res.data.error,
      payload,
    });
  } catch (err: unknown) {
    return thunkApi.rejectWithValue({
      error: err,
    });
  }
});

const toDoSlice = createSlice({
  name: 'toDo',
  initialState,
  reducers: {
    changeActiveToDoPage(state, { payload }: { payload: string }) {
      state.activeToDoPage = payload;
    },
  },
  extraReducers: ((builder) => {
    builder.addCase(addToDoItem.rejected, (state, action) => {
      state.toDoList.push({
        id: uuidv4(),
        heading: (action.payload as { error: string, payload: string }).payload,
        isComplete: false,
        description: '',
      });
      localStorage.setItem('toDoList', JSON.stringify(state.toDoList));
    });
    builder.addCase(addToDoItem.fulfilled, (state, action) => {
      state.toDoList.push({ ...action.payload.toDoItem, ...{ id: action.payload.toDoItem.id.toString() } });
    });
    builder.addCase(deleteToDoItem.rejected, (state, action) => {
      state.toDoList.splice(
        state.toDoList.findIndex((el) => el.id === (action.payload as { error: string, payload: string }).payload),
        1,
      );
      localStorage.setItem('toDoList', JSON.stringify(state.toDoList));
    });
    builder.addCase(deleteToDoItem.fulfilled, (state, action) => {
      state.toDoList.splice(
        state.toDoList.findIndex((el) => el.id === action.payload.id.toString()),
        1,
      );
    });
    builder.addCase(getToDoItems.pending, (state) => {
      state.isToDoListLoading = true;
    });
    builder.addCase(getToDoItems.fulfilled, (state, action) => {
      state.isToDoListLoading = false;
      state.toDoList = action.payload.sort((prev: ToDoItem, current: ToDoItem) => +prev.id - +current.id);
    });
    builder.addCase(getToDoItems.rejected, (state) => {
      state.isToDoListLoading = false;
      state.toDoList = localStorage.getItem('toDoList') && JSON.parse(localStorage.getItem('toDoList')!) || [];
    });
    builder.addCase(updateToDoItem.fulfilled, (state, action) => {
      const index = state.toDoList.findIndex((el) => el.id === action.payload.toDoItem.id);
      state.toDoList[index] = action.payload.toDoItem;
    });
    builder.addCase(updateToDoItem.rejected, (state, action) => {
      const index = state.toDoList.findIndex((el) => el.id === (action.payload as { error: string, payload: ToDoItem }).payload.id);
      state.toDoList[index].isComplete = (action.payload as { error: string, payload: ToDoItem }).payload.isComplete;
      state.toDoList[index].heading = (action.payload as { error: string, payload: ToDoItem }).payload.heading;
      state.toDoList[index].description = (action.payload as { error: string, payload: ToDoItem }).payload.description;
      localStorage.setItem('toDoList', JSON.stringify(state.toDoList));
    });
  }),
});

export default toDoSlice.reducer;
export const {
  changeActiveToDoPage,
} = toDoSlice.actions;
export { addToDoItem, deleteToDoItem, getToDoItems, updateToDoItem };
