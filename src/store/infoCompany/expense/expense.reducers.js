import { createSlice } from "@reduxjs/toolkit";
import {
  infoExpensePayed,
  infoExpenseNoPayed
} from "./expense.actions"

const initialState = {
  expense: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

const infoExpenseSlice = createSlice({
  name: "infoExpense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(infoExpensePayed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(infoExpensePayed.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(infoExpensePayed.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.status = "succeeded";
      })
      .addCase(infoExpenseNoPayed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(infoExpenseNoPayed.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(infoExpenseNoPayed.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.status = "succeeded";
      })
  },
});

export default infoExpenseSlice.reducer;