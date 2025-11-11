import { API_ENDPOINTS } from './endpoints';
import { axiosBaseInstance } from '../axios/instance';

export const addComment = (postId, payload) =>
  axiosBaseInstance.post(API_ENDPOINTS.ADD_COMMENT(postId), payload);
export const getCommentsByPostId = (postId) =>
  axiosBaseInstance.get(API_ENDPOINTS.GET_COMMENTS_BY_POST_ID(postId));
export const deleteComment = (commentId) =>
  axiosBaseInstance.delete(API_ENDPOINTS.DELETE_COMMENT(commentId));
