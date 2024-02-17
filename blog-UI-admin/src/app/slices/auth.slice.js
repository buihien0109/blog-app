import { createSlice } from '@reduxjs/toolkit';
import { getDataFromLocalStorage, setDataToLocalStorage } from '../../utils/localStorageUtils';
import { authApi } from '../services/auth.service';

const defaultState = {
    auth: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false
}

const initialState = getDataFromLocalStorage("authenticatedUser")
    ? getDataFromLocalStorage("authenticatedUser")
    : defaultState

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state, action) => {
            setDataToLocalStorage("authenticatedUser", defaultState);
            return defaultState;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, action) => {
                const { user, accessToken, refreshToken, isAuthenticated } = action.payload;
                state.auth = user;
                state.accessToken = accessToken;
                state.refreshToken = refreshToken;
                state.isAuthenticated = isAuthenticated;
                setDataToLocalStorage("authenticatedUser", state);
            }
        );
    }
});

export const { logout } = authSlice.actions

export default authSlice.reducer