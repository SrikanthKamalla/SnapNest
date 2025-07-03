import { axiosBaseInstance } from "../axios/instance";
import { API_ENDPOINTS } from "./endpoints";

export const getuserInfo = () =>
  axiosBaseInstance.get(API_ENDPOINTS.GET_LOGGED_IN_USER_INFO);

export const updateUser = (payload) =>
  axiosBaseInstance.put(API_ENDPOINTS.UPDATE_USER_INFO, payload);
