import axios from "axios";

import env from "../config/env";
import store from "../redux/store";
import { setSessionExpired } from "../redux/slice/authSlice";

const api = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
});

console.log("API URL:", env.apiUrl);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(setSessionExpired(true));
    }

    return Promise.reject(error);
  },
);

export default api;
