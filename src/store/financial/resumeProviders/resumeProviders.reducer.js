import { createSlice } from "@reduxjs/toolkit";
import {
  getProviderFinancial,
  itemsEntryOrder,
  paymentOrders,
} from "./resumeProviders.action";

const initialState = {
  providers: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

const resumeAllProviderSlice = createSlice({
  name: "resume-all-provider",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProviderFinancial.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProviderFinancial.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getProviderFinancial.fulfilled, (state, action) => {
        state.providers = action.payload;
        state.status = "succeeded";
      })
      .addCase(paymentOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(paymentOrders.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(paymentOrders.fulfilled, (state, action) => {
        state.providers = action.payload;
        state.status = "succeeded";
      })
      .addCase(itemsEntryOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(itemsEntryOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(itemsEntryOrder.fulfilled, (state, action) => {
        state.providers = action.payload;
        state.status = "succeeded";
      });
  },
});

export default resumeAllProviderSlice.reducer;
