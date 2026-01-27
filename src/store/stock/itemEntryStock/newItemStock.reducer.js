import { createSlice } from "@reduxjs/toolkit";
import {
  allItemsEntryStock,
  idProductEntry,
  getInfoIdStockEntry,
  createProductEntryStock,
  updateItemEntryStock,
  downItemEntryStock,
} from "./newItemStock.action";

const initialState = {
  newProduct: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

const newItemStockSlice = createSlice({
  name: "item-Entry-Stock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allItemsEntryStock.pending, (state) => {
        state.status = "loading";
      })
      .addCase(allItemsEntryStock.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(allItemsEntryStock.fulfilled, (state, action) => {
        state.newProduct = action.payload;
        state.status = "succeeded";
      })
      .addCase(idProductEntry.pending, (state) => {
        state.status = "loading";
      })
      .addCase(idProductEntry.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(idProductEntry.fulfilled, (state, action) => {
        state.newProduct = action.payload;
        state.status = "succeeded";
      })
      .addCase(getInfoIdStockEntry.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getInfoIdStockEntry.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getInfoIdStockEntry.fulfilled, (state, action) => {
        state.newProduct = action.payload;
        state.status = "succeeded";
      })
      .addCase(createProductEntryStock.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductEntryStock.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(createProductEntryStock.fulfilled, (state, action) => {
        state.newProduct = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateItemEntryStock.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateItemEntryStock.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(updateItemEntryStock.fulfilled, (state, action) => {
        state.newProduct = action.payload;
        state.status = "succeeded";
      })
      .addCase(downItemEntryStock.pending, (state) => {
        state.status = "loading";
      })
      .addCase(downItemEntryStock.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(downItemEntryStock.fulfilled, (state, action) => {
        state.newProduct = action.payload;
        state.status = "succeeded";
      });
  },
});

export default newItemStockSlice.reducer;
