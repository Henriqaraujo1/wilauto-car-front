import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getIdProduct,
  newProduct,
  updateProduct,
  deleteProduct,
  getNewCodProduct,
  getNameProductInfo,
} from "../../../api/routes/register/productRegister.js";

export const allProducts = createAsyncThunk(
  "product/all-products",
  async (thunkAPI, { rejectWithValue }) => {
    const response = await getAllProducts();
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const getProduct = createAsyncThunk(
  "product/id-product",
  async (idProduct, { rejectWithValue }) => {
    const response = await getIdProduct(idProduct);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const getNameProduct = createAsyncThunk(
  "product/info-product",
  async (infoProduct, { rejectWithValue }) => {
    const response = await getNameProductInfo(infoProduct);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const getCodProduct = createAsyncThunk(
  "product/cod-product",
  async (thunkAPI, { rejectWithValue }) => {
    const response = await getNewCodProduct();
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const createProduct = createAsyncThunk(
  "product/new-product",
  async (dataProduct, { rejectWithValue }) => {
    const response = await newProduct(dataProduct);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const updtProduct = createAsyncThunk(
  "product/up-product",
  async (dataProduct, { rejectWithValue }) => {
    const response = await updateProduct(dataProduct);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);
export const downProduct = createAsyncThunk(
  "product/down-product",
  async (idProduct, { rejectWithValue }) => {
    const response = await deleteProduct(idProduct);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
