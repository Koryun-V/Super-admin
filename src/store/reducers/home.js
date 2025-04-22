// import {createReducer} from "@reduxjs/toolkit";
//
//
// const initialState = {
//   status: "",
//   product: {},
// }
// export const home = createReducer(initialState, (builder) => {
//   builder
//     .addCase(getAllProducts.pending, (state) => {
//       state.status = "pending"
//     })
//     .addCase(getAllProducts.fulfilled, (state, {payload}) => {
//       state.status = "ok"
//       // state.productsList = state.selectId ? payload.productsList.map(({product}) => product) : payload.productsList
//       state.productsList = payload.productsList
//       state.total = payload.total
//     })
//     .addCase(getAllProducts.rejected, (state) => {
//       state.status = "error"
//     })
//
//
// });
