import { API_ENDPOINTS } from './endpoints';
import { axiosBaseInstance } from '../axios/instance';

export const fileUpload = (data) =>
  axiosBaseInstance.post(API_ENDPOINTS.FILE_UPLOAD, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: false,
  });

export const createPost = (payload) =>
  axiosBaseInstance.post(API_ENDPOINTS.CREATE_POST, payload);

export const updatePost = (payload, postId) =>
  axiosBaseInstance.put(API_ENDPOINTS.UPDATE_POST(postId), payload);

export const getPost = () => axiosBaseInstance.get(API_ENDPOINTS.GET_POSTS);

export const deletePost = (postId) =>
  axiosBaseInstance.delete(API_ENDPOINTS.DELETE_POST(postId));

export const getMyPosts = () =>
  axiosBaseInstance.get(API_ENDPOINTS.GET_MY_POSTS);

export const getPostById = (postId) =>
  axiosBaseInstance.get(API_ENDPOINTS.GET_BY_POST_ID(postId));

export const likePost = (postId) =>
  axiosBaseInstance.put(API_ENDPOINTS.LIKE_POST(postId), null);

export const unLikePost = (postId) =>
  axiosBaseInstance.put(API_ENDPOINTS.UNLIKE_POST(postId), null);

export const viewPost = (postId) =>
  axiosBaseInstance.get(API_ENDPOINTS.VIEW_POST(postId));
