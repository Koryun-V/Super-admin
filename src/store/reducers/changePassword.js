import {createReducer} from "@reduxjs/toolkit";
import {changePassword, setStatus} from "../actions/changePassword";

const initialState = {
    status: "",
}
export const changePasswordAdmin = createReducer(initialState, (builder) => {
    builder
        .addCase(changePassword.pending, (state) => {
            state.status = "pending"
        })
        .addCase(changePassword.fulfilled, (state, {payload}) => {
            state.status = "ok"
        })
        .addCase(changePassword.rejected, (state) => {
            state.status = "error"
        })
        //-----------------------------------------------------------------------------------
        .addCase(setStatus, (state, {payload}) => {
            state.status = payload
        })
});
