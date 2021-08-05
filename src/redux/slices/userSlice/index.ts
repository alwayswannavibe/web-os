/* eslint-disable no-param-reassign */

// Libraries
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: localStorage.getItem('username') || `User-${uuidv4().slice(0, 8)}`,
    name: '',
    photo: '',
    loading: true,
  },
  reducers: {
    logout(state) {
      state.username = `User-${uuidv4().slice(0, 8)}`;
      state.photo = '';
      state.name = '';
      localStorage.setItem('username', state.username);
    },
    login(
      state,
      {
        payload,
      }: {
        payload: {
          username: string;
          photo: string;
          name: string;
        };
      },
    ) {
      state.username = payload.username;
      state.name = payload.name;
      state.photo = payload.photo;
      state.loading = false;
    },
  },
});

export default userSlice.reducer;
export const { logout, login } = userSlice.actions;
