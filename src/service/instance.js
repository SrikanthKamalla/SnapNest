import axios from 'axios';
const BASE_URL = 'https://social-media-server-v1-awpt.onrender.com/api';

export const axiosBaseInstance = axios.create({
  baseURL: BASE_URL,
});
