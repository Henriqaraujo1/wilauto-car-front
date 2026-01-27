import { createSlice } from "@reduxjs/toolkit";
import {
  getExpense,
  // idExpenseByReceiver,
  getExpenseByType,
  createExpense,
  updtExpense,
  downExpense,
  getExpenseByMonth,
  updtExpenseByProvider,
} from "./expense.actions";

const initialState = {
  expense: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExpense.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getExpense.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getExpense.fulfilled, (state, action) => {
        state.expense = action.payload;
        state.status = "succeeded";
      })
      .addCase(getExpenseByMonth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getExpenseByMonth.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getExpenseByMonth.fulfilled, (state, action) => {
        state.expense = action.payload;
        state.status = "succeeded";
      })
      // .addCase(idExpenseByReceiver.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(idExpenseByReceiver.rejected, (state, action) => {
      //   state.error = action.payload;
      //   state.status = "failed";
      // })
      // .addCase(idExpenseByReceiver.fulfilled, (state, action) => {
      //   state.expense = action.payload;
      //   state.status = "succeeded";
      // })
      .addCase(getExpenseByType.pending, (state, ) => {
        state.status = "loading";
      })
      .addCase(getExpenseByType.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getExpenseByType.fulfilled, (state, action) => {
        state.expense = action.payload;
        state.status = "succeeded";
      })
      .addCase(createExpense.pending, (state, ) => {
        state.status = "loading";
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.expense = action.payload;
        state.status = "succeeded";
      })
      .addCase(updtExpense.pending, (state, ) => {
        state.status = "loading";
      })
      .addCase(updtExpense.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(updtExpense.fulfilled, (state, action) => {
        state.expense = action.payload;
        state.status = "succeeded";
      })
      .addCase(updtExpenseByProvider.pending, (state, ) => {
        state.status = "loading";
      })
      .addCase(updtExpenseByProvider.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(updtExpenseByProvider.fulfilled, (state, action) => {
        state.expense = action.payload;
        state.status = "succeeded";
      })
      .addCase(downExpense.pending, (state) => {
        state.status = "loading";
      })
      .addCase(downExpense.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(downExpense.fulfilled, (state, action) => {
        state.expense = action.payload;
        state.status = "succeeded";
      });
  },
});

export default expenseSlice.reducer;
