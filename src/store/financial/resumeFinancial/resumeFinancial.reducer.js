import { createSlice } from "@reduxjs/toolkit";
import {
  resumeFinancial,
  resumeMonthFinancial,
  resumeOrders,
} from "./resumeFinancial.actions";

const initialState = {
  financial: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

const resumeFinancialSlice = createSlice({
  name: "resume-financial",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resumeFinancial.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resumeFinancial.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(resumeFinancial.fulfilled, (state, action) => {
        state.financial = action.payload;
        state.status = "succeeded";
      })
      .addCase(resumeMonthFinancial.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resumeMonthFinancial.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(resumeMonthFinancial.fulfilled, (state, action) => {
        state.financial = action.payload;
        state.status = "succeeded";
      })
      .addCase(resumeOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resumeOrders.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(resumeOrders.fulfilled, (state, action) => {
        state.financial = action.payload;
        state.status = "succeeded";
      });
  },
});

export default resumeFinancialSlice.reducer;
