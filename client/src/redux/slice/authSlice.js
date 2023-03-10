import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: false,
        user: {}
    },
    reducers: {
        login: (state, action) => {
            console.log('login slice');
            state.loggedIn = true;//set logged in to true
            state.user = action.payload;//set user to passed user object
        },
        logout: (state) => {
            console.log('logout slice');
            state.loggedIn = false;
            state.user = {}
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;