import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    userId: null,
    isLandlord: false,
    isAdmin: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state,action) => {
            state.isAuthenticated = true;
            state.userId = action.payload.id;
            state.isLandlord = action.payload.is_landlord;
            state.isAdmin = action.payload.is_admin;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userId = null;
            state.isLandlord = false;
            state.isAdmin = false;
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer