import axios from 'axios';
import { getAuthToken } from '../helpers/localstorage';
// const BASE_URL = "https://social-media-server-v1-awpt.onrender.com/api";
const BASE_URL = 'https://snapnest-server-fb3f.onrender.com/api';

export const axiosBaseInstance = axios.create({
  baseURL: BASE_URL,
});

axiosBaseInstance.interceptors.request.use(
  function (config) {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosBaseInstance.interceptors.response.use(
  function (response) {
    if (!response.data.success) {
      //   toast(response.data.message);
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
