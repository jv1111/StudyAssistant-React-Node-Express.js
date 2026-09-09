import axios from "axios";

import env from "../config/env";
import store from "../redux/store";
import { setSessionExpired } from "../redux/slice/authSlice";

const api = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("[API] Request failed:", error.config?.url);
    console.log("[API] Status:", error.response?.status);

    if (error.response?.status === 401) {
      console.log("[API] 401 detected - setting sessionExpired");

      store.dispatch(setSessionExpired(true));

      console.log("[API] Redux state after dispatch:", store.getState().auth);
    }

    return Promise.reject(error);
  },
);

export default api;
