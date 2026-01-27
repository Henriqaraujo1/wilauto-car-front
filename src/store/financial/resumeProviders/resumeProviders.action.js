import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFinancialProviders,
  getItemsEntryOrder,
  getPaymentsByProvider
} from "../../../api/routes/financial/resumeProviders";

export const getProviderFinancial = createAsyncThunk(
  "financial/financial-entry-order",
  async (idProvider, { rejectWithValue }) => {
    const response = await getFinancialProviders(idProvider);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const itemsEntryOrder = createAsyncThunk(
  "financial/financial-entry-order/items-order",
  async (idStockEntry, { rejectWithValue }) => {
    const response = await getItemsEntryOrder(idStockEntry);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const paymentOrders = createAsyncThunk(
  "financial/financial-entry-order/payments",
  async (idStockEntry, { rejectWithValue }) => {
    const response = await getPaymentsByProvider(idStockEntry);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
