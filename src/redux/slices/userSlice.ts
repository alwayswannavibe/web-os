import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: localStorage.getItem('username') || `User-${uuid().slice(0, 8)}`,
    name: '',
    photo: '',
    loading: true,
  },
  reducers: {
    logout(state) {
      // eslint-disable-next-line no-param-reassign
      state.username = localStorage.getItem('username') || `User-${uuid().slice(0, 8)}`;
      localStorage.setItem('username', state.username);
      // eslint-disable-next-line no-param-reassign
      state.photo = '';
      // eslint-disable-next-line no-param-reassign
      state.name = '';
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
      // eslint-disable-next-line no-param-reassign
      state.username = payload.username;
      // eslint-disable-next-line no-param-reassign
      state.name = payload.name;
      // eslint-disable-next-line no-param-reassign
      state.photo = payload.photo;
      // eslint-disable-next-line no-param-reassign
      state.loading = false;
    },
  },
});

export default userSlice.reducer;
export const { logout, login } = userSlice.actions;
