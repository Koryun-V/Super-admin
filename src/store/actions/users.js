import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utills/Api";


export const getUsers = createAsyncThunk(
    "get/users",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getUsers(payload);
            return data

        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);



export const setStatus = createAction(
    "get-users/status",
)
export const setUsers = createAction(
    "set/users",
)
export const setIsCancel = createAction(
    "isCancel/users",
)
export const setTotal = createAction(
    "total/users",
)




