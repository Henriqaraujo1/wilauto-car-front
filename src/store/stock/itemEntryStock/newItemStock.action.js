import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllEntryStock,
  getIdProductEntry,
  getIdStockEntry,
  newProductEntry,
  updateEntryProduct,
  deleteEntryProductStock,

} from "../../../api/routes/stock/newItemStock";

export const allItemsEntryStock = createAsyncThunk(
  "/stock-entry/all-item-entry",
  async (thunkAPI, { rejectWithValue }) => {
    const response = await getAllEntryStock();
    if (response.erroStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const idProductEntry = createAsyncThunk(
  "/stock-entry/item-entry",
  async (idItemEntryStock, { rejectWithValue }) => {
    const response = await getIdProductEntry(idItemEntryStock);
    if (response.erroStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const getInfoIdStockEntry = createAsyncThunk(
  "stock-entry/stockOrder",
  async(idStockEntry, {rejectWithValue}) => {
    const response = await getIdStockEntry(idStockEntry);
    if(response.errorStatus === true) {
      return rejectWithValue(response)
    }
    return response
  }
)

export const createProductEntryStock = createAsyncThunk(
  "/stock-entry/new-item-entry",
  async (dataItemEntry, { rejectWithValue }) => {
    const response = await newProductEntry(dataItemEntry);
    if (response.erroStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);
export const updateItemEntryStock = createAsyncThunk(
  "/stock-entry/up-item-entry",
  async (dataItemEntry, { rejectWithValue }) => {
    const response = await updateEntryProduct(dataItemEntry);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);
export const downItemEntryStock = createAsyncThunk(
  "/stock-entry/down-item-entry",
  async (idItemStock, { rejectWithValue }) => {
    const response = await deleteEntryProductStock(idItemStock);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
  }
);
