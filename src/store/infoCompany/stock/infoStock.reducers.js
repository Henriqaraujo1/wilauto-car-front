import { createSlice } from "@reduxjs/toolkit";
import { infoStock, infoStockMoviments, infoStockOut } from "./infoStock.actions";

const initialState = {
  stock: [],
  stockMoviments: [],
  stockOut: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

const infoStockSlice = createSlice({
  name: "infoStock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(infoStock.pending, (state) => {
        state.status = "loading";
      })
      .addCase(infoStock.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(infoStock.fulfilled, (state, action) => {
        state.stock = action.payload;
        state.status = "succeeded";
      })
      .addCase(infoStockMoviments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(infoStockMoviments.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(infoStockMoviments.fulfilled, (state, action) => {
        state.stockMoviments = action.payload;
        state.status = "succeeded";
      })
      .addCase(infoStockOut.pending, (state) => {
        state.status = "loading";
      })
      .addCase(infoStockOut.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(infoStockOut.fulfilled, (state, action) => {
        state.stockOrder = action.payload;
        state.status = "succeeded";
      })
  },
});

export default infoStockSlice.reducer;
