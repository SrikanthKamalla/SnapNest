import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postSlice';
import userReducer from './userSlice';
import commentReducer from './commentSlice';
export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
    comment: commentReducer,
  },
});
