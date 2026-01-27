import { createSlice } from "@reduxjs/toolkit";
import {
  allEmployees,
  getEmployee,
  getInfoEmployee,
  createEmployee,
  updtEmployee,
  downEmployee,
} from "./employee.actions";

const initialState = {
  employee: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(allEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(allEmployees.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(allEmployees.fulfilled, (state, action) => {
        const allEmployeesInfo = action.payload;
        state.employee = allEmployeesInfo;
        state.status = "succeeded";
      })
      .addCase(getEmployee.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.employee = action.payload;
        state.status = "succeeded";
      })
      .addCase(getEmployee.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getInfoEmployee.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getInfoEmployee.fulfilled, (state, action) => {
        state.employee = action.payload;
        state.status = "succeeded";
      })
      .addCase(getInfoEmployee.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(createEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employee = action.payload;
        state.status = "succeeded";
      })
      .addCase(updtEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updtEmployee.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(updtEmployee.fulfilled, (state, action) => {
        state.employee = action.payload;
        state.status = "succeeded";
      })
      .addCase(downEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(downEmployee.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(downEmployee.fulfilled, (state, action) => {
        state.employee = action.payload;
        state.status = "succeeded";
      });
  },
});

export default employeeSlice.reducer;
