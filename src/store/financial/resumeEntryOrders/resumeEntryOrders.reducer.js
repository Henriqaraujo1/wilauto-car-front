import { createSlice } from "@reduxjs/toolkit";
import {
  resumeEntryOrders,
  resumeMonthEntryOrders,
} from "./resumeEntryOrders.actions";

const initialState = {
  provider: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

const resumeEntryOrdersSlice = createSlice({
  name: "resume-provider",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resumeEntryOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resumeEntryOrders.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(resumeEntryOrders.fulfilled, (state, action) => {
        state.provider = action.payload;
        state.status = "succeeded";
      })
      .addCase(resumeMonthEntryOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resumeMonthEntryOrders.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(resumeMonthEntryOrders.fulfilled, (state, action) => {
        state.provider = action.payload;
        state.status = "succeeded";
      });
  },
});

export default resumeEntryOrdersSlice.reducer;
