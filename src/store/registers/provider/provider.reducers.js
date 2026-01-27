import { createSlice } from "@reduxjs/toolkit";
import {
  allProviders,
  getCnpjProvider,
  createProvider,
  updtProvider,
  downProvider,
} from "./provider.actions";

const initialState = {
  provider: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allProviders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(allProviders.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(allProviders.fulfilled, (state, action) => {
        state.provider = action.payload;
        state.status = "succeeded";
      })
      .addCase(getCnpjProvider.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCnpjProvider.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getCnpjProvider.fulfilled, (state, action) => {
        state.provider = action.payload;
        state.status = "succeeded";
      })
      .addCase(createProvider.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProvider.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(createProvider.fulfilled, (state, action) => {
        state.provider = action.payload;
        state.status = "succeeded";
      })
      .addCase(updtProvider.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updtProvider.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(updtProvider.fulfilled, (state, action) => {
        state.provider = action.payload;
        state.status = "succeeded";
      })
      .addCase(downProvider.pending, (state) => {
        state.status = "loading";
      })
      .addCase(downProvider.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(downProvider.fulfilled, (state, action) => {
        state.provider = action.payload;
        state.status = "succeeded";
      });
  },
});

export default providerSlice.reducer;
