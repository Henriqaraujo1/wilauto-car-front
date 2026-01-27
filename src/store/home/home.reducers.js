import { createSlice } from "@reduxjs/toolkit";
import { getMonthFinancial, homeInfo } from "./home.actions";

const initialState = {
  resumeHome: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(homeInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(homeInfo.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(homeInfo.fulfilled, (state, action) => {
        state.resumeHome = action.payload;
        state.status = "succeeded";
      })
      .addCase(getMonthFinancial.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMonthFinancial.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getMonthFinancial.fulfilled, (state, action) => {
        state.resumeHome = action.payload;
        state.status = "succeeded";
      });
  },
});

export default homeSlice.reducer;
