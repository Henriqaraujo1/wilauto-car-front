import { createSlice } from "@reduxjs/toolkit";
import { getClient, getClientItensByOrder } from "./resumeClient.actions";

const initialState = {
  client: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

const resumeClientsSlice = createSlice({
  name: "resume-client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getClient.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getClient.fulfilled, (state, action) => {
        state.client = action.payload;
        state.status = "succeeded";
      })
      .addCase(getClientItensByOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getClientItensByOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getClientItensByOrder.fulfilled, (state, action) => {
        state.client = action.payload;
        state.status = "succeeded";
      });
  },
});

export default resumeClientsSlice.reducer;
