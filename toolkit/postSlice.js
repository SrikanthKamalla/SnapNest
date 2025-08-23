import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  success: true,
  message: '',
  posts: [],
};

export const fetchPosts = createAsyncThunk('posts/getPosts', async (func) => {
  const response = await func();
  return response.data.data;
});

export const updatePostById = createAsyncThunk(
  'posts/updatePostById',
  async ({ payload, id, func }) => {
    await func(payload, id);
  }
);

export const deletePostById = createAsyncThunk(
  'posts/deletePost',
  async ({ func, postId, fetcherFunction }, thunkAPI) => {
    await func(postId);
    thunkAPI.dispatch(fetchPosts(fetcherFunction));
  }
);

export const likePosts = createAsyncThunk(
  'posts/likePosts',
  async ({ func, postId, fetcherFunction }, thunkAPI) => {
    await func(postId);
    thunkAPI.dispatch(fetchPosts(fetcherFunction));
  }
);
export const unLikePosts = createAsyncThunk(
  'posts/unLikePosts',
  async ({ func, postId, fetcherFunction }, thunkAPI) => {
    await func(postId);
    thunkAPI.dispatch(fetchPosts(fetcherFunction));
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
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
      .addCase(updatePostById.rejected, (state) => {
        state.success = false;
      });
  },
});
export const { setPosts } = postSlice.actions;

export default postSlice.reducer;
