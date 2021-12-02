// Libraries
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface InitialState {
  username: string,
  name: string,
  photo: string,
  loading: boolean,
  currentPage: number,
  id: number,
  isLoginLoading: boolean,
  loginError: string,
  isRegistrationLoading: boolean,
  registrationError: string,
}

const initialState: InitialState = {
  username: '',
  name: '',
  photo: '',
  loading: false,
  currentPage: 1,
  id: -1,
  isLoginLoading: false,
  isRegistrationLoading: false,
  loginError: '',
  registrationError: '',
};

const logout = createAsyncThunk('user/logout', async () => {
  await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`, {}, {
    timeout: 30000,
    withCredentials: true,
  });
});

const loginFetch = createAsyncThunk('user/login', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
      username: payload.username,
      password: payload.password,
    }, {
      timeout: 30000,
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

const registration = createAsyncThunk('user/registration', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
      username: payload.username,
      password: payload.password,
    }, {
      timeout: 30000,
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/me`, {
    timeout: 30000,
    withCredentials: true,
  });
  return res.data;
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
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.username = '';
      state.photo = '';
      state.name = '';
      localStorage.clear();
      document.location.reload();
    });
    builder.addCase(loginFetch.pending, (state) => {
      state.isLoginLoading = true;
      state.loginError = '';
    });
    builder.addCase(loginFetch.fulfilled, (state) => {
      state.isLoginLoading = false;
      window.history.pushState(null, '', '/');
      window.location.reload();
    });
    builder.addCase(loginFetch.rejected, (state, payload: any) => {
      state.isLoginLoading = false;
      state.loginError = payload.payload.error || payload.payload.message[0];
    });
    builder.addCase(registration.pending, (state) => {
      state.isRegistrationLoading = true;
      state.registrationError = '';
    });
    builder.addCase(registration.fulfilled, (state) => {
      state.isRegistrationLoading = false;
      window.history.pushState(null, '', '/');
      window.location.reload();
    });
    builder.addCase(registration.rejected, (state, payload: any) => {
      state.isRegistrationLoading = false;
      state.registrationError = payload.payload.error || payload.payload.message[0];
    });
    builder.addCase(fetchUser.fulfilled, (state, payload: any) => {
      state.username = payload.payload;
    });
  },
});

export default userSlice.reducer;
export const { login } = userSlice.actions;
export { logout, loginFetch, registration, fetchUser };