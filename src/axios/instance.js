import axios from 'axios';
import { getAuthToken } from '../helpers/localstorage';
const beUrl = import.meta.env.VITE_SERVER_URL;

const BASE_URL = `${beUrl}/api`;

export const axiosBaseInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
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
