import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utills/Api";


export const loginUser = createAsyncThunk(
    "user/login",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.loginUser(payload);
            return data

        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);


export const getUser = createAsyncThunk(
    "user/profile",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getUser(payload);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const forgotPasswordUser = createAsyncThunk(
    "user/forgot-password",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.forgotPasswordUser(payload);
            console.log(data,"forgot")
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);
export const changePasswordUser = createAsyncThunk(
    "user/change-password",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.changePasswordUser(payload);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const resendCode = createAsyncThunk(
    "user/resend-code",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.resendCode(payload);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);



export const setStatusForgot = createAction(
    "login/status-forgot",
)
export const setStatusCode = createAction(
    "login/status-code",
)
export const setStatus = createAction(
    "login/status",
)
export const setSuperAdmin = createAction(
    "is/super",
)
export const setStatusUser = createAction(
    "login/status-user",
)


