import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: true,
  message: "",
  posts: [],
};

export const fetchPosts = createAsyncThunk("posts/getPosts", async (func) => {
  const response = await func();
  return response.data;
});

export const updatePostById = createAsyncThunk(
  "posts/updatePostById",
  async ({ payload, id, func }) => {
    await func(payload, id);
  }
);

export const deletePostById = createAsyncThunk(
  "posts/deletePost",
  async ({ func, postId, fetcherFunction }, thunkAPI) => {
    await func(postId);
    thunkAPI.dispatch(fetchPosts(fetcherFunction));
  }
);

export const likePosts = createAsyncThunk(
  "posts/likePosts",
  async ({ func, postId, fetcherFunction }, thunkAPI) => {
    await func(postId);
    thunkAPI.dispatch(fetchPosts(fetcherFunction));
  }
);
export const unLikePosts = createAsyncThunk(
  "posts/unLikePosts",
  async ({ func, postId, fetcherFunction }, thunkAPI) => {
    await func(postId);
    thunkAPI.dispatch(fetchPosts(fetcherFunction));
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deletePostById.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePostById.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePostById.rejected, (state, action) => {
        console.log("failed", action.payload);
        state.success = false;
      });
  },
});

export default postSlice.reducer;
