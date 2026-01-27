import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBrands,
  getBrand,
  newBrand,
  updateBrand,
  deleteBrand,
} from "../../../api/routes/register/brandRegister";

export const getAllBrand = createAsyncThunk(
  "brand/all-brand",
  async (thunkAPI, { rejectWithValue }) => {
    const response = await getBrands();
    if (response.erroStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const getBrandInfo = createAsyncThunk(
  "brand/info-brand",
  async (infoBrand, { rejectWithValue }) => {
    const response = await getBrand(infoBrand);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);
export const createBrand = createAsyncThunk(
  "brand/new-brand",
  async (dataBrand, { rejectWithValue }) => {
    const response = await newBrand(dataBrand);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);
export const updtBrand = createAsyncThunk(
  "brand/up-brand",
  async (dataBrand, { rejectWithValue }) => {
    const response = await updateBrand(dataBrand);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const downBrand = createAsyncThunk(
  "brand/down-brand",
  async (idBrand, { rejectWithValue }) => {
    const response = await deleteBrand(idBrand);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);
