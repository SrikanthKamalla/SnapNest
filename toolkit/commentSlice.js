import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};
export const fetchDeleteComment = createAsyncThunk(
  'comment/fetchDeleteComment',
  async ({ deleteComment, commentId }) => {
    const resoponse = await deleteComment(commentId);
    return resoponse.data;
  }
);
const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDeleteComment.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export default commentSlice.reducer;
