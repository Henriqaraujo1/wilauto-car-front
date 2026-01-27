import { createSlice } from "@reduxjs/toolkit";
import {
  allStock,
  idProductStock,
  updtStatusProductStock,
} from "./stockNow.actions";

const initialState = {
  stockNow: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

const stockNowSlice = createSlice({
  name: "stock-now",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allStock.pending, (state) => {
        state.status = "loading";
      })
      .addCase(allStock.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(allStock.fulfilled, (state, action) => {
        state.stockNow = action.payload;
        state.status = "succeeded";
      })
      .addCase(idProductStock.pending, (state) => {
        state.status = "loading";
      })
      .addCase(idProductStock.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(idProductStock.fulfilled, (state, action) => {
        state.stockNow = action.payload;
        state.status = "succeeded";
      })
      .addCase(updtStatusProductStock.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updtStatusProductStock.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(updtStatusProductStock.fulfilled, (state, action) => {
        state.stockNow = action.payload;
        state.status = "succeeded";
      });
  },
});

export default stockNowSlice.reducer;
