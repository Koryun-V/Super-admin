import {createReducer} from "@reduxjs/toolkit";
import {
    getUser,
    loginUser, setSuperAdmin, setStatus, setStatusUser,
} from "../actions/login";

const initialState = {
    status: "",
    statusUser: "",
    superAdmin: {},
    token: "",
    user: {},
}
export const login = createReducer(initialState, (builder) => {
    builder
        .addCase(loginUser.pending, (state) => {
            state.status = "pending"
        })
        .addCase(loginUser.fulfilled, (state, {payload}) => {
            if(payload.superAdmin === false){
                state.status = "error"
            }
            else{
                state.status = "ok"
                state.token = payload.token
            }
        })
        .addCase(loginUser.rejected, (state) => {
            state.status = "error"
        })

        //-----------------------------------------------------------------------------------
        .addCase(getUser.pending, (state) => {
            state.statusUser = "pending"
        })
        .addCase(getUser.fulfilled, (state, {payload}) => {
            state.statusUser = "ok"
            state.user = payload.user
        })
        .addCase(getUser.rejected, (state) => {
            state.statusUser = "error"
        })
        .addCase(setStatus, (state, {payload}) => {
            state.status = payload
        })
        .addCase(setStatusUser, (state, {payload}) => {
            state.status = payload
        })
        .addCase(setSuperAdmin, (state, {payload}) => {
            state.superAdmin = payload
        })


});
