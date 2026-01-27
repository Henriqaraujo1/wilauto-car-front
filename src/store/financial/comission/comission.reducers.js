import { createSlice } from "@reduxjs/toolkit";
import {
  getComissionMonth,
  getComissionsByEmployee,
  upComission,
} from "./comission.actions";

const initialState = {
  comission: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: false,
};

const comissionSlice = createSlice({
  name: "comission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComissionMonth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getComissionMonth.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getComissionMonth.fulfilled, (state, action) => {
        state.comission = action.payload;
        state.error = "succeeded";
      })
      .addCase(getComissionsByEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getComissionsByEmployee.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getComissionsByEmployee.fulfilled, (state, action) => {
        state.comission = action.payload;
        state.error = "succeeded";
      })
      .addCase(upComission.pending, (state) => {
        state.status = "loading";
      })
      .addCase(upComission.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(upComission.fulfilled, (state, action) => {
        state.comission = action.payload;
        state.error = "succeeded";
      });
  },
});

export default comissionSlice.reducer;
