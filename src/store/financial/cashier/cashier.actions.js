import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCashier,
  getDayCashier,
  newCashier,
  closedCashier,
  deleteCashier,
} from "../../../api/routes/financial/cashier";

export const getAllCashiers = createAsyncThunk(
  "cashier/all-cashier",
  async ({ rejectWithValue }) => {
    const response = await getAllCashier();
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const getCashier = createAsyncThunk(
  "cashier/cashier-day",
  async (infoDate, { rejectWithValue }) => {
    const response = await getDayCashier(infoDate);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const createCashier = createAsyncThunk(
  "cashier/new-cashier",
  async (dataCashier, { rejectWithValue }) => {
    const response = await newCashier(dataCashier);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const closeCashier = createAsyncThunk(
  "cashier/up-cashier",
  async (dataCashier, { rejectWithValue }) => {
    const response = await closedCashier(dataCashier);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const downCashier = createAsyncThunk(
  "cashier/down-cashier",
  async (dataCashier, { rejectWithValue }) => {
    const response = await deleteCashier(dataCashier);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
