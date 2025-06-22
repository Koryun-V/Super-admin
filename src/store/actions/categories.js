import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utills/Api";


export const getCategories = createAsyncThunk(
    "get/categories",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getCategories(payload);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);


export const createCategory = createAsyncThunk(
    "create/category", async (payload, thunkAPI) => {
        try {
            const {data} = await api.createCategory(payload);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteCategory = createAsyncThunk(
    "delete/category", async (payload, thunkAPI) => {
        try {
            const {data} = await api.deleteCategory(payload);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const setCategoryId = createAction(
    "id/category",
)
export const setStatus = createAction(
    "login/status",
)
export const setStatusCreate = createAction(
    "create/category",
)
export const setCategories = createAction(
    "set/category",
)
export const setStatusDelete = createAction(
    "delete/category",
)
