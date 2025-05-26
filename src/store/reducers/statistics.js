import {createReducer} from "@reduxjs/toolkit";
import {
    getBuyers,
    getStatistics,
    getStatisticsAll,
    setBuyers,
    setStatistics,
    setStatusBuyers
} from "../actions/statistics";
import {setStatus} from "../actions/admin";

const initialState = {
    status: "",
    statistics: [],
    statisticsTotal: {},
    statisticsAll: {},
    statusBuyers: "",
    buyers: []
}
export const statistics = createReducer(initialState, (builder) => {
    builder
        .addCase(getStatisticsAll.pending, (state) => {
            state.status = "pending"
        })
        .addCase(getStatisticsAll.fulfilled, (state, {payload}) => {
            state.status = "ok"
            state.statisticsAll = payload.data
        })
        .addCase(getStatisticsAll.rejected, (state) => {
            state.status = "error"
        })
        //-----------------------------------------------------------------------------------
        .addCase(getStatistics.pending, (state) => {
            state.status = "pending"
        })
        .addCase(getStatistics.fulfilled, (state, {payload}) => {
            state.status = "ok"
            state.statistics = payload.statistics
            state.statisticsTotal = payload
        })
        .addCase(getStatistics.rejected, (state) => {
            state.status = "error"
        })
        //-----------------------------------------------------------------------------------
        .addCase(getBuyers.pending, (state) => {
            state.statusBuyers = "pending"
        })
        .addCase(getBuyers.fulfilled, (state, {payload}) => {
            state.statusBuyers = "ok"
            state.buyers = payload.buyers
        })
        .addCase(getBuyers.rejected, (state) => {
            state.statusBuyers = "error"
        })
        //-----------------------------------------------------------------------------------
        .addCase(setStatusBuyers, (state, {payload}) => {
            state.statusBuyers = payload
        })
        .addCase(setStatus, (state, {payload}) => {
            state.status = payload
        })
        .addCase(setStatistics, (state, {payload}) => {
            state.statistics = payload
        })
        .addCase(setBuyers, (state, {payload}) => {
            state.buyers = payload
        })
});
