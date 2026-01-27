import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllStock,
  getIdProductStock,
  updateStatusProductStock,
} from "../../../api/routes/stock/stockNow";

export const allStock = createAsyncThunk(
  "/stock/all-stock",
  async (thunkAPI, { rejectWithValue }) => {
    const response = await getAllStock();
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const idProductStock = createAsyncThunk(
  "/stock/id-item-stock",
  async (idProduct, { rejectWithValue }) => {
    const response = await getIdProductStock(idProduct);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const updtStatusProductStock = createAsyncThunk(
  "/stock/up-item-stock",
  async (updtStatusStock, { rejectWithValue }) => {
    const response = await updateStatusProductStock(updtStatusStock);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
