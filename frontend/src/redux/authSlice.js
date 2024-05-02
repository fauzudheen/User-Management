import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserAuthenticated : null, 
    userToken : null, 
    isAdminAuthenticated : null, 
    adminToken : null, 
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserLogin: (state, action) => {
            state.isAuthenticated = true;
            state.userToken = action.payload;
        },
        setUserLogout: (state, action) => {
            state.isAuthenticated = false;
            state.userToken = null;
        },
        setAdminLogin: (state, action) => {
            state.isAuthenticated = true;
            state.userToken = action.payload;
        },
        setAdminLogout: (state, action) => {
            state.isAuthenticated = false;
            state.userToken = null;
        },
    }
})

export const {setUserLogin, setUserLogout, setAdminLogin, setAdminLogout} = authSlice.actions;
export default authSlice.reducer;