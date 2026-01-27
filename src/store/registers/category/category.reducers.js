import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCategory,
  getIdCategory,
  createCategory,
  updtCategory,
  downCategory,
} from "./category.actions";

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
      .addCase(getAllCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.Categorys = action.payload;
        state.status = "succeeded";
      })
      .addCase(getIdCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getIdCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getIdCategory.fulfilled, (state, action) => {
        state.Categorys = action.payload;
        state.status = "succeeded";
      })
      .addCase(createCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.Categorys = action.payload;
        state.status = "succeeded";
      })
      .addCase(updtCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updtCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(updtCategory.fulfilled, (state, action) => {
        state.Categorys = action.payload;
        state.status = "succeeded";
      })
      .addCase(downCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(downCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(downCategory.fulfilled, (state, action) => {
        state.Categorys = action.payload;
        state.status = "succeeded";
      });
  },
});

export default CategorySlice.reducer;
