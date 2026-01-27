import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCashiers,
  getCashier,
  createCashier,
  closeCashier,
  downCashier,
} from "./cashier.actions";

const initialState = {
  cashier: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: false,
};

const cashierSlice = createSlice({
  name: "cashier",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCashiers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCashiers.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getAllCashiers.fulfilled, (state, action) => {
        state.cashier = action.payload;
        state.error = "succeeded";
      })
      .addCase(getCashier.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCashier.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getCashier.fulfilled, (state, action) => {
        state.cashier = action.payload;
        state.error = "succeeded";
      })
      .addCase(createCashier.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCashier.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(createCashier.fulfilled, (state, action) => {
        const { newCashier } = action.payload;
        Object.assign(state, newCashier);
      })
      .addCase(closeCashier.pending, (state) => {
        state.status = "loading";
      })
      .addCase(closeCashier.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(closeCashier.fulfilled, (state, action) => {
        state.cashier = action.payload;
        state.error = "succeeded";
      })
      .addCase(downCashier.pending, (state) => {
        state.status = "loading";
      })
      .addCase(downCashier.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(downCashier.fulfilled, (state, action) => {
        state.cashier = action.payload;
        state.error = "succeeded";
      });
  },
});

export default cashierSlice.reducer;
