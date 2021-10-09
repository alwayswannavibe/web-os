/* eslint-disable no-param-reassign */

// Libraries
import { createSlice } from '@reduxjs/toolkit';

// Logic
// eslint-disable-next-line import/no-cycle
import { fetchUser } from '@Features/user/fetchUser';

interface InitialState {
  username: string,
  name: string,
  photo: string,
  loading: boolean,
  currentPage: number,
  id: number,
}

const initialState: InitialState = {
  username: '',
  name: '',
  photo: '',
  loading: false,
  currentPage: 1,
  id: -1,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.username = '';
      state.photo = '';
      state.name = '';
      document.cookie = 'jwt= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
      localStorage.clear();
      window.location.reload();
    },
    login(state, { payload }: {
      payload: {
        username: string;
        photo?: string;
      };
    }) {
      state.username = payload.username;
      state.photo = payload.photo || '';
      state.loading = false;
      localStorage.clear();
    },
    setUser(state, { payload }: { payload: string }) {
      state.username = payload;
    },
  },
});

fetchUser();

export default userSlice.reducer;
export const { logout, login, setUser } = userSlice.actions;
