import { createSlice } from "@reduxjs/toolkit";
import { configureWpp, sendNoteWpp } from "./whatsapp.actions";

const initialState = {
    whatsappStatus: [],
    status: "idle" | "loading" | "succeeded" | "failed",
    error: null,
  };

  const whatsappSlice = createSlice({
    name: "whatsapp",
    initialState,
    reducers: {},
    extraReducers: (builders) => {
      builders
        .addCase(configureWpp.pending, (state) => {
          state.status = "loading"
        })
        .addCase(configureWpp.rejected, (state, action) => {
          state.error = action.payload
        })
        .addCase(configureWpp.fulfilled, (state, action) => {
          const wppInfo  = action.payload;
          state.whatsappStatus = wppInfo;
          state.status = "succeeded";
        })
        .addCase(sendNoteWpp.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(sendNoteWpp.fulfilled, (state, action) => {
          state.whatsappStatus = action.payload;
          state.status = "succeeded";
        })
        .addCase(sendNoteWpp.rejected, (state, action) => {
          state.error = action.payload;
          state.status = "failed";
        });
    },
  });
  
  export default whatsappSlice.reducer;