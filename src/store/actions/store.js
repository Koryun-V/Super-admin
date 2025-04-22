import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utills/Api";


export const getStores = createAsyncThunk(
    "get/stores",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getStores(payload);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const createStore = createAsyncThunk(
    "create/store", async (payload, thunkAPI) => {
        try {
            const {data} = await api.createStore(payload);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const updateStore = createAsyncThunk(
    "update/store", async (payload, thunkAPI) => {
        try {
            const {data} = await api.updateStore(payload);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const deleteStores = createAsyncThunk(
    "delete/store", async (payload, thunkAPI) => {
        try {
            const {data} = await api.deleteStores(payload);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)





export const setStoreId = createAction(
    "id/store",
)

export const setStatus = createAction(
    "login/status",
)
export const setStatusCreate = createAction(
    "create/store",
)
export const setStores = createAction(
    "set/store",
)
export const setStatusDelete = createAction(
    "delete/store",
)


