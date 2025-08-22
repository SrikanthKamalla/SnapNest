import { API_ENDPOINTS } from './endpoints';
import { axiosBaseInstance } from '../axios/instance';

export const userSignUp = (data) =>
  axiosBaseInstance.post(API_ENDPOINTS.SIGN_UP, data);
export const userLogin = (data) =>
  axiosBaseInstance.post(API_ENDPOINTS.LOG_IN, data);
export const userLogout = () => {
  return axiosBaseInstance.delete(API_ENDPOINTS.LOG_OUT);
};
