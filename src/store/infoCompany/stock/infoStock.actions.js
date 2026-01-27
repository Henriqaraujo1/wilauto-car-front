import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  resumeStock,
  resumeStockMoviments,
  resumeStockOut,
} from "../../../api/routes/info/stock/infoStock";

export const infoStock = createAsyncThunk(
  "api/resume-stock",
  async (thunkAPI, { rejectWithValue }) => {
    const response = await resumeStock();
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const infoStockMoviments = createAsyncThunk(
  "api/resume-stock-moviments",
  async (infoMonth, { rejectWithValue }) => {
    const response = await resumeStockMoviments(infoMonth);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const infoStockOut = createAsyncThunk(
  "api/resume-stock-out",
  async (infoOrder, { rejectWithValue }) => {
    const response = await resumeStockOut(infoOrder);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
