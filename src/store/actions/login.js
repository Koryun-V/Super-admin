import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utills/Api";


export const loginUser = createAsyncThunk(
    "user/login",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.loginUser(payload);
            console.log(data,'a')
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


export const setStatus = createAction(
    "login/status",
)
export const setSuperAdmin = createAction(
    "is/super",
)
export const setStatusUser = createAction(
    "login/status-user",
)


