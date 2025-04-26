import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utills/Api";


export const updateAdminInfo = createAsyncThunk(
    "update/admin",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.updateAdminInfo(payload);
            return data

        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const deleteAdminAvatar = createAsyncThunk(
    "delete/avatar",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.deleteAdminAvatar(payload);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);


export const setStatus = createAction(
    "update/admin",
)
export const setStatusDelete = createAction(
    "delete/avatar",
)

