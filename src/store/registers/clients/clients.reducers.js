import { createSlice } from "@reduxjs/toolkit";
import {
  allClients,
  getClient,
  createClient,
  updtClient,
  downClient,
  getClientCEP,
} from "./clients.actions";

const initialState = {
  client: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(allClients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(allClients.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(allClients.fulfilled, (state, action) => {
        const allClients = action.payload;
        state.allClients = allClients;
        state.status = "succeeded";
      })
      .addCase(getClient.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getClient.fulfilled, (state, action) => {
        state.client = action.payload;
        state.status = "succeeded";
      })
      .addCase(getClient.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getClientCEP.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getClientCEP.fulfilled, (state, action) => {
        state.client = action.payload;
        state.status = "succeeded";
      })
      .addCase(getClientCEP.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(createClient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createClient.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.client = action.payload;
        state.status = "succeeded";
      })
      .addCase(updtClient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updtClient.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(updtClient.fulfilled, (state, action) => {
        state.client = action.payload;
        state.status = "succeeded";
      })
      .addCase(downClient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(downClient.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(downClient.fulfilled, (state, action) => {
        state.client = action.payload;
        state.status = "succeeded";
      });
  },
});

export default clientSlice.reducer;
