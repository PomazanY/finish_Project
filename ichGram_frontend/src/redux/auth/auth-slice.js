import { createSlice } from "@reduxjs/toolkit"

import { login, register } from "./auth-thunks";

const initialState = {
    token: "",
    username: "",
    email: "",
    fullName: "",
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError(store) {
            store.error = null;
        },
    },
    extraReducers: builder => {
        builder.addCase(login.pending, (store) => {
            store.loading = true;
            store.error = null;
        })
            .addCase(login.fulfilled, (store, { payload }) => {
                store.loading = false;
                store.token = payload.token;
                store.username = payload.username;
                store.email = payload.email;
            })
            
            .addCase(login.rejected, (store, { payload }) => {
                store.loading = false;
                store.error = payload;
            })

            .addCase(register.pending, (store) => {
                store.loading = true;
                store.error = null;
            })
            .addCase(register.fulfilled, (store) => {
                store.loading = false;
                store.error = null;
            })
            .addCase(register.rejected, (store, { payload }) => {
                store.loading = false;
                store.error = payload;
            })

    }
});
export const { clearError } = authSlice.actions;
export default authSlice.reducer;