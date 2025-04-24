import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utills/Api";

export const getStatisticsAll = createAsyncThunk(
    "get-all/statistics",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getStatisticsAll(payload);
            console.log(data,"ssss")
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);
export const getStatistics = createAsyncThunk(
    "get/statistics",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getStatistics(payload);
            console.log(data,"ssss")
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);
export const getBuyers = createAsyncThunk(
    "get/buyers",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getBuyers(payload);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);






export const setStatus = createAction(
    "statistics/status",
)
export const setStatistics = createAction(
    "buyers/status",
)
export const setStatusBuyers = createAction(
    "set/statistics",
)
export const setBuyers = createAction(
    "set/buyers",
)



