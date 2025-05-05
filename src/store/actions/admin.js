import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utills/Api";


export const getAdmin = createAsyncThunk(
    "get/admins",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getAdmin(payload);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const createAdmin = createAsyncThunk(
    "create/admins",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.createAdmin(payload);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)

        }
    }
);

export const removeAdmin = createAsyncThunk(
    "remove/admin",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.removeAdmin(payload);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);


export const setStatus = createAction(
    "admins/status",
)
export const setAdmin = createAction(
    "set/admins",
)
export const setStatusCreate = createAction(
    "create/status",
)
export const setCreateError = createAction(
    "create/error",
)
export const setStatusDelete = createAction(
    "delete/status",
)


