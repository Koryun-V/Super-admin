import {createReducer} from "@reduxjs/toolkit";
import {getUsers, setIsCancel, setStatus, setTotal, setUsers} from "../actions/users";
import _ from "lodash";

const initialState = {
    status: "",
    total:1,
    maxPage:"",
    users:[],
    isCancelNetwork:false,
}
export const users = createReducer(initialState, (builder) => {
    builder

        .addCase(getUsers.pending, (state) => {
            state.status = "pending"
        })
        .addCase(getUsers.fulfilled, (state, {payload}) => {
            state.status = "ok"
            if(!state.isCancelNetwork){
                state.users = _.uniqBy([...state.users, ...payload.users], "id")
                state.total = payload.total
                state.maxPage = payload.maxPageCount
            }
            else{
                state.users = []
                state.total = 0
            }

        })
        .addCase(getUsers.rejected, (state) => {
            state.status = "error"
        })
        //-----------------------------------------------------------------------------------

        .addCase(setStatus, (state, {payload}) => {
            state.status = payload
        })
        .addCase(setUsers, (state, {payload}) => {
            state.users = payload
        })
        .addCase(setIsCancel, (state, {payload}) => {
            state.isCancelNetwork = payload
        })
        .addCase(setTotal, (state, {payload}) => {
            state.total = payload
        })






});
