import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  success: true,
  message: '',
  posts: [],
  page: 1,
  hasMore: true,
};

// export const fetchPosts = createAsyncThunk(
//   'posts/getPosts',
//   async (func, page = 1) => {
//     const response = await func(page);
//     // console.log(response.data.data);
//     // return response.data.data;
//     return { posts: response.data.data.posts, page };
//   }
// );

export const fetchPosts = createAsyncThunk(
  'posts/getPosts',
  async ({ func, page = 1 }) => {
    const response = await func(page);

    return { posts: response.data.data.posts, page };
  }
);

export const updatePostById = createAsyncThunk(
  'posts/updatePostById',
  async ({ payload, id, func }) => {
    let response = await func(payload, id);
    console.log(response);
    return response.data;
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
        console.log(action.payload);
        const { posts, page } = action.payload;

        // if (page > 1) {
        state.posts = [...state.posts, ...posts];
        // } else {
        //   state.posts = posts;
        // }
        state.hasMore = posts.length > 0;
        state.loading = false;
        state.page = page;
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
