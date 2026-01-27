import { createSlice } from "@reduxjs/toolkit";
import {
  getAllSubCategory,
  getNameSubCategory,
  createSubCategory,
  updtSubCategory,
  downSubCategory,
} from "./subCategory.actions";

const initialState = {
  Categorys: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

const CategorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllSubCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getAllSubCategory.fulfilled, (state, action) => {
        state.Categorys = action.payload;
        state.status = "succeeded";
      })
      .addCase(getNameSubCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNameSubCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getNameSubCategory.fulfilled, (state, action) => {
        state.Categorys = action.payload;
        state.status = "succeeded";
      })
      .addCase(createSubCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createSubCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(createSubCategory.fulfilled, (state, action) => {
        state.Categorys = action.payload;
        state.status = "succeeded";
      })
      .addCase(updtSubCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updtSubCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(updtSubCategory.fulfilled, (state, action) => {
        state.Categorys = action.payload;
        state.status = "succeeded";
      })
      .addCase(downSubCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(downSubCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(downSubCategory.fulfilled, (state, action) => {
        state.Categorys = action.payload;
        state.status = "succeeded";
      });
  },
});

export default CategorySlice.reducer;
