import {createReducer} from "@reduxjs/toolkit";
import {
    createCategory, deleteCategory,
    getCategories, setCategories, setCategoryId, setStatus, setStatusDelete
} from "../actions/categories";
import {setStatusCreate} from "../actions/admin";

const initialState = {
    status: "",
    statusCreate: "",
    statusDelete: "",
    categories: [],
    categoryId: ""

}
export const categories = createReducer(initialState, (builder) => {
    builder
        .addCase(getCategories.pending, (state) => {
            state.status = "pending"
        })
        .addCase(getCategories.fulfilled, (state, {payload}) => {
            state.categories = payload.categories
            state.status = "ok"
        })
        .addCase(getCategories.rejected, (state) => {
            state.status = "error"
        })
        //-----------------------------------------------------------------------------------
        .addCase(createCategory.pending, (state) => {
            state.statusCreate = "pending";
        })
        .addCase(createCategory.fulfilled, (state, {payload}) => {
            state.statusCreate = "ok";
        })
        .addCase(createCategory.rejected, (state, {payload}) => {
            state.statusCreate = "error";
        })
        //-----------------------------------------------------------------------------------
        .addCase(deleteCategory.pending, (state) => {
            state.statusDelete = "pending";
        })
        .addCase(deleteCategory.fulfilled, (state, {payload}) => {
            state.statusDelete = "ok";
        })
        .addCase(deleteCategory.rejected, (state, {payload}) => {
            state.statusDelete = "error";
        })
        //-----------------------------------------------------------------------------------

        .addCase(setCategoryId, (state, {payload}) => {
            state.categoryId = payload
        })
        .addCase(setStatusCreate, (state, {payload}) => {
            state.statusCreate = payload
        })
        .addCase(setStatusDelete, (state, {payload}) => {
            state.statusDelete = payload
        })
        .addCase(setStatus, (state, {payload}) => {
            state.statusCreate = payload
        })
        .addCase(setCategories, (state, {payload}) => {
            state.categories = payload
        })

});
