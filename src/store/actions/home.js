// import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
// import api from "../../utills/Api";
//
//
// export const getPopularProducts = createAsyncThunk(
//     "products/get-popular-products",
//     async (payload, thunkAPI) => {
//         try {
//             const {data} = await api.getPopularProducts(payload)
//             // console.log(data, "data")
//             return data.data
//         } catch (err) {
//             return thunkAPI.rejectWithValue(err)
//         }
//     })
//
// export const setUserId = createAction(
//     "user/id",
// )
//
//
//
