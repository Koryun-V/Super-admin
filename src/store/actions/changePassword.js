import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utills/Api";


export const changePassword = createAsyncThunk(
    "change/password",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.changePassword(payload);
            return data

        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);


export const setStatus = createAction(
    "change/password",
)

