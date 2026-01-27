import { createSlice } from "@reduxjs/toolkit";
import { infoProfit, infoProfitMonth } from "./profit.actions";

const initialState = {
  profit: [],
  profitMonth: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

const infoProfitSlice = createSlice({
  name: "infoProfit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(infoProfit.pending, (state) => {
        state.status = "loading";
      })
      .addCase(infoProfit.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(infoProfit.fulfilled, (state, action) => {
        state.profitDay = action.payload;
        state.status = "succeeded";
      })
      .addCase(infoProfitMonth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(infoProfitMonth.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(infoProfitMonth.fulfilled, (state, action) => {
        state.profitMonth = action.payload;
        state.status = "succeeded";
      });
  },
});

export default infoProfitSlice.reducer;
