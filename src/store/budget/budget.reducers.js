import { createSlice } from "@reduxjs/toolkit";
import { checkUserStatus } from "../auth/auth.actions";
import {
  createBudgetOrder,
  getAllBudgets,
  getItensByBudgets,
  getNextNumberBudget,
  upBudgetOrder,
  upBudgetItens,
  upBudgetClient
} from "./budget.actions";

const initialState = {
  budget: [],
  ordersBudget: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: false,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUserStatus.fulfilled, (state, action) => {
        const { budget } = action.payload;
        Object.assign(state, budget);
      })
      .addCase(createBudgetOrder.fulfilled, (state, action) => {
        const { ordersBudget } = action.payload;
        state.ordersBudget = ordersBudget;
      })
      .addCase(getAllBudgets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllBudgets.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "error";
      })
      .addCase(getAllBudgets.fulfilled, (state, action) => {
        state.budget = action.payload;
        state.status = "succeeded";
      })
      .addCase(getItensByBudgets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getItensByBudgets.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "error";
      })
      .addCase(getItensByBudgets.fulfilled, (state, action) => {
        state.ordersBudget = action.payload;
        state.status = "succeeded";
      })
      .addCase(upBudgetItens.pending, (state) => {
        state.status = "loading";
      })
      .addCase(upBudgetItens.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "error";
      })
      .addCase(upBudgetItens.fulfilled, (state, action) => {
        state.ordersBudget = action.payload;
        state.status = "succeeded";
      })
      .addCase(upBudgetOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(upBudgetOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "error";
      })
      .addCase(upBudgetOrder.fulfilled, (state, action) => {
        state.ordersBudget = action.payload;
        state.status = "succeeded";
      })
      .addCase(upBudgetClient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(upBudgetClient.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "error";
      })
      .addCase(upBudgetClient.fulfilled, (state, action) => {
        state.ordersBudget = action.payload;
        state.status = "succeeded";
      })
      .addCase(getNextNumberBudget.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNextNumberBudget.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "error";
      })
      .addCase(getNextNumberBudget.fulfilled, (state, action) => {
        state.ordersBudget = action.payload;
        state.status = "succeeded";
      });
  },
});

export default budgetSlice.reducer;
