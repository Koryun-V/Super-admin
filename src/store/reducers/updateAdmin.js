import {createReducer} from "@reduxjs/toolkit";
import {deleteAdminAvatar, setStatus, setStatusDelete, updateAdminInfo} from "../actions/updateAdmin";

const initialState = {
    status: "",
    statusDelete: "",

}
export const updateAdmin = createReducer(initialState, (builder) => {
    builder
        .addCase(updateAdminInfo.pending, (state) => {
            state.status = "pending"
        })
        .addCase(updateAdminInfo.fulfilled, (state, {payload}) => {
            state.status = "ok"
        })
        .addCase(updateAdminInfo.rejected, (state) => {
            state.status = "error"
        })

        .addCase(deleteAdminAvatar.pending, (state) => {
            state.statusDelete = "pending"
        })
        .addCase(deleteAdminAvatar.fulfilled, (state, {payload}) => {
            state.statusDelete = "ok"
        })
        .addCase(deleteAdminAvatar.rejected, (state) => {
            state.statusDelete = "error"
        })

        //-----------------------------------------------------------------------------------

        .addCase(setStatus, (state, {payload}) => {
            state.status = payload
        })
        .addCase(setStatusDelete, (state, {payload}) => {
            state.statusDelete = payload
        })

});
