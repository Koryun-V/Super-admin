import {createReducer} from "@reduxjs/toolkit";
import {
    createStore,
    deleteStores,
    getStores,
    setStatusCreate,
    setStatusDelete,
    setStoreId, setStores,
    updateStore
} from "../actions/store";

const initialState = {
    status: "",
    statusCreate: "",
    statusDelete: "",
    stores: [],
    storeId: ""
}
export const store = createReducer(initialState, (builder) => {
    builder
        .addCase(getStores.pending, (state) => {
            state.status = "pending"
        })
        .addCase(getStores.fulfilled, (state, {payload}) => {
            state.stores = payload.stores
            state.status = "ok"
        })
        .addCase(getStores.rejected, (state) => {
            state.status = "error"
        })
        .addCase(createStore.pending, (state) => {
            state.statusCreate = "pending";
        })
        .addCase(createStore.fulfilled, (state, {payload}) => {
            state.statusCreate = "ok";
        })
        .addCase(createStore.rejected, (state, {payload}) => {
            state.statusCreate = "error";
        })
        .addCase(updateStore.pending, (state) => {
            state.statusCreate = "pending";
        })
        .addCase(updateStore.fulfilled, (state, {payload}) => {
            state.statusCreate = "ok";
        })
        .addCase(updateStore.rejected, (state, {payload}) => {
            state.statusCreate = "error";
        })

        .addCase(deleteStores.pending, (state) => {
            state.statusDelete = "pending";
        })
        .addCase(deleteStores.fulfilled, (state, {payload}) => {
            state.statusDelete = "ok";
        })
        .addCase(deleteStores.rejected, (state, {payload}) => {
            state.statusDelete = "error";
        })
        .addCase(setStatusCreate, (state, {payload}) => {
            state.statusCreate = payload
        })
        .addCase(setStatusDelete, (state, {payload}) => {
            state.statusDelete = payload
        })
        .addCase(setStoreId, (state, {payload}) => {
            state.storeId = payload
        })
        .addCase(setStores, (state, {payload}) => {
            state.stores = payload
        })
});
