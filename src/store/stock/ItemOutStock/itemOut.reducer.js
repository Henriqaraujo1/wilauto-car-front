import { createSlice } from "@reduxjs/toolkit";
import {
  productsOutByMonth,
  idProductOut,
  newProductOut,
  updtProductOut,
  downProductOut,
} from "./itemOut.actions";

const initialState = {
  itemOut: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

const ItemOutSlice = createSlice({
  name: "item-Out",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsOutByMonth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productsOutByMonth.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(productsOutByMonth.fulfilled, (state, action) => {
        state.itemOut = action.payload;
        state.status = "succeeded";
      })
      .addCase(idProductOut.pending, (state) => {
        state.status = "loading";
      })
      .addCase(idProductOut.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(idProductOut.fulfilled, (state, action) => {
        state.itemOut = action.payload;
        state.status = "succeeded";
      })
      .addCase(newProductOut.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(newProductOut.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(newProductOut.fulfilled, (state, action) => {
        state.itemOut = action.payload;
        state.status = "succeeded";
      })
      .addCase(updtProductOut.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updtProductOut.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(updtProductOut.fulfilled, (state, action) => {
        state.itemOut = action.payload;
        state.status = "succeeded";
      })
      .addCase(downProductOut.pending, (state) => {
        state.status = "loading";
      })
      .addCase(downProductOut.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(downProductOut.fulfilled, (state, action) => {
        state.itemOut = action.payload;
        state.status = "succeeded";
      });
  },
});

export default ItemOutSlice.reducer;
