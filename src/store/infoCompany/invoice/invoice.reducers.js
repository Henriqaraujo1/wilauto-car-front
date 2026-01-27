import { createSlice } from "@reduxjs/toolkit";
import { infoCashier, infoInvoice } from "./invoice.actions";

const initialState = {
  resumeInvoice: [],
  resumeCashier: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

const infoInvoiceSlice = createSlice({
  name: "resumeInvoice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(infoInvoice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(infoInvoice.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(infoInvoice.fulfilled, (state, action) => {
        state.resumeInvoice = action.payload;
        state.status = "succeeded";
      })
      .addCase(infoCashier.pending, (state) => {
        state.status = "loading";
      })
      .addCase(infoCashier.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(infoCashier.fulfilled, (state, action) => {
        state.resumeCashier = action.payload;
        state.status = "succeeded";
      });
  },
});

export default infoInvoiceSlice.reducer;
