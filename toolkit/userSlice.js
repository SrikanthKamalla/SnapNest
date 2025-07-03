import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { saveToLocalStorage } from "../src/helpers/localstorage";
const initialState = {
  loading: false,
  user: {
    name: "",
    email: "",
    userId: "",
  },
  message: "",
  success: false,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async (func) => {
  const response = await func();
  return response.data.data.user;
});
export const fetchUserLogin = createAsyncThunk(
  "user/fetchUserLogin",
  async ({ userLogin, loginUser }) => {
    const response = await userLogin(loginUser);
    console.log(response?.data?.data?.token);
    saveToLocalStorage(response?.data?.data?.token);
    return response.data;
  }
);
export const fetchUpdatedUser = createAsyncThunk(
  "user/fetchUpdatedUser",
  async ({ func, name }) => {
    const response = await func(name);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetStatus: (state) => {
      state.success = false;
      state.message = "";
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
        console.log("fetchUpdatedUser action.payload", action.payload);
        const { message, success } = action.payload;
        state.success = success;
        state.message = message;
        state.loading = false;
        const { name, email, _id } = action.payload.data;
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
