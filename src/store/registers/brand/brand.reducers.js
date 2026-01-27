import { createSlice } from "@reduxjs/toolkit";
import {
  getAllBrand,
  getBrandInfo,
  createBrand,
  updtBrand,
  downBrand,
} from "./brand.actions";

const initialState = {
  brands: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrand.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllBrand.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getAllBrand.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.status = "succeeded";
      })
      .addCase(getBrandInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBrandInfo.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getBrandInfo.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.status = "succeeded";
      })
      .addCase(createBrand.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.status = "succeeded";
      })
      .addCase(updtBrand.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updtBrand.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(updtBrand.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.status = "succeeded";
      })
      .addCase(downBrand.pending, (state) => {
        state.status = "loading";
      })
      .addCase(downBrand.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(downBrand.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.status = "succeeded";
      });
  },
});

export default brandSlice.reducer;