import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: false,
    user: {},
    sessionExpired: false,
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
      state.sessionExpired = false;
    },

    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },

    logout: (state) => {
      state.loggedIn = false;
      state.user = {};
      state.sessionExpired = false;
    },

    setSessionExpired: (state, action) => {
      state.sessionExpired = action.payload;
    },
  },
});

export const { login, updateUser, logout, setSessionExpired } =
  authSlice.actions;

export default authSlice.reducer;
