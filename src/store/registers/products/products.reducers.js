import { createSlice } from "@reduxjs/toolkit";
import {
  allProducts,
  getProduct,
  getCodProduct,
  createProduct,
  updtProduct,
  downProduct,
} from "./products.actions";

const initialState = {
  product: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(allProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(allProducts.fulfilled, (state, action) => {
        state.product = action.payload;
        state.status = "succeeded";
      })
      .addCase(getProduct.pending, (state, action) => {
        state.status = "loading";
        state.Loading = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.status = "succeeded";
      })
      .addCase(getCodProduct.pending, (state, action) => {
        state.status = "loading";
        state.Loading = action.payload;
      })
      .addCase(getCodProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getCodProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.status = "succeeded";
      })
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.status = "succeeded";
      })
      .addCase(updtProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updtProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(updtProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.status = "succeeded";
      })
      .addCase(downProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(downProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(downProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.status = "succeeded";
      });
  },
});

export default ProductSlice.reducer;
