import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: false,
    user: {},
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
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
    },
  },
});

export const { login, updateUser, logout } = authSlice.actions;

export default authSlice.reducer;
