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
    return Promise.reject(error);
  }
);

axiosBaseInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
