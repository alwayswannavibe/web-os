/* eslint-disable no-param-reassign */

// Libraries
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Logic
// eslint-disable-next-line import/no-cycle
import { fetchUser } from '@Features/user/fetchUser';
import { fetchUsers } from '@Chat/redux/chatUsersSlice/chatUsersSlice';

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

const logout = createAsyncThunk('user/logout', async () => {
  await axios.get(`${process.env.REACT_APP_API_URL}/user/logout`, {
    timeout: 30000,
    withCredentials: true,
  });
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state) => {
      state.username = '';
      state.photo = '';
      state.name = '';
      localStorage.clear();
      window.location.reload();
    });
  },
});

fetchUser();

export default userSlice.reducer;
export const { login, setUser } = userSlice.actions;
export { logout };
