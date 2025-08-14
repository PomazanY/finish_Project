import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserApi, registerUserApi } from "../../shared/api/auth-api";


export const login = createAsyncThunk(
    "auth/login",
    async (payload, { rejectWithValue }) => {
        try {
            const data = await loginUserApi(payload);
            return data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const register = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await registerUserApi(userData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);