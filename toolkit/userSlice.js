import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { saveToLocalStorage } from '../src/helpers/localstorage';
const initialState = {
  loading: false,
  user: {
    name: '',
    email: '',
    userId: '',
  },
  message: '',
  success: false,
};

export const fetchUser = createAsyncThunk('user/fetchUser', async (func) => {
  const response = await func();
  return response.data.data;
});

export const fetchUserLogin = createAsyncThunk(
  'user/fetchUserLogin',
  async ({ email, password, userLogin }, thunkAPI) => {
    try {
      const response = await userLogin({ email, password });
      saveToLocalStorage(response?.data?.data?.token);
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      return thunkAPI.rejectWithValue({
        message: error?.response?.data?.message || 'Login failed',
      });
    }
  }
);

export const fetchUpdatedUser = createAsyncThunk(
  'user/fetchUpdatedUser',
  async ({ func, name }) => {
    const response = await func(name);
    return response.data.data.user;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetStatus: (state) => {
      state.success = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        const { name, email, _id } = action.payload.data;
        state.user = { name, email, userId: _id };
        state.loading = false;
      })
      .addCase(fetchUserLogin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const { name, email, _id } = action.payload;
        state.user = { name, email, userId: _id };
        state.loading = false;
      })
      .addCase(fetchUpdatedUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUpdatedUser.fulfilled, (state, action) => {
        const { message, success } = action.payload;
        state.success = success;
        state.message = message;
        state.loading = false;
        const { name, email, _id } = action.payload;
        state.user = { name, email, userId: _id };
        state.loading = false;
      })
      .addCase(fetchUpdatedUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setUser, resetStatus } = userSlice.actions;
export default userSlice.reducer;
