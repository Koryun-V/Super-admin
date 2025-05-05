import {createReducer} from "@reduxjs/toolkit";
import {
    createAdmin,
    getAdmin,
    removeAdmin,
    setAdmin,
    setCreateError,
    setStatusCreate,
    setStatusDelete
} from "../actions/admin";


const initialState = {
    status: "",
    statusCreate: "",
    createError:"",
    statusDelete: "",
    admins: [],
}
export const admin = createReducer(initialState, (builder) => {
    builder
        .addCase(getAdmin.pending, (state) => {
            state.status = "pending"
        })
        .addCase(getAdmin.fulfilled, (state, {payload}) => {
            state.status = "ok"
            state.admins = payload.store.map(admin => admin.user)
        })
        .addCase(getAdmin.rejected, (state) => {
            state.status = "error"
        })
        //-----------------------------------------------------------------------------------
        .addCase(createAdmin.pending, (state) => {
            state.statusCreate = "pending"
        })
        .addCase(createAdmin.fulfilled, (state, {payload}) => {
            state.statusCreate = "ok"
        })
        .addCase(createAdmin.rejected, (state, error) => {
            state.statusCreate = "error"
            state.createError = error.payload.response.data.message
        })
        //-----------------------------------------------------------------------------------
        .addCase(removeAdmin.pending, (state) => {
            state.statusDelete = "pending"
        })
        .addCase(removeAdmin.fulfilled, (state, {payload}) => {
            state.statusDelete = "ok"
        })
        .addCase(removeAdmin.rejected, (state) => {
            state.statusDelete = "error"
        })
        //-----------------------------------------------------------------------------------
        .addCase(setStatusCreate, (state, {payload}) => {
            state.statusCreate = payload
        })
        .addCase(setCreateError, (state, {payload}) => {
            state.createError = payload
        })
        .addCase(setStatusDelete, (state, {payload}) => {
            state.statusDelete = payload
        })
        .addCase(setAdmin, (state, {payload}) => {
            state.admins = payload
        })
});
