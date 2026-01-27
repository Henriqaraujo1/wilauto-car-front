import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBudgetNumber,
  createBudget,
  allBudgets,
  getItemsByIdBudget,
  updateBudget,
  updateBudgetItens,
  updateBudgetByClient
} from "../../api/routes/commercial/budget";

export const createBudgetOrder = createAsyncThunk(
  "comercial/new-budget",
  async (infoBudget, { rejectWithValue }) => {
    const response = await createBudget(infoBudget);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const upBudgetOrder = createAsyncThunk(
  "comercial/up-budget/",
  async (infoBudget, { rejectWithValue }) => {
    const response = await updateBudget(infoBudget);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const upBudgetItens = createAsyncThunk(
  "comercial/up-itens/",
  async (infoBudget, { rejectWithValue }) => {
    const response = await updateBudgetItens(infoBudget);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const upBudgetClient = createAsyncThunk(
  "api/budget/up-budget/new-client/",
  async (infoBudget, { rejectWithValue }) => {
    const response = await updateBudgetByClient(infoBudget);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const getNextNumberBudget = createAsyncThunk(
  "api/comercial/next-number",
  async (thunkAPI, { rejectWithValue }) => {
    const response = await getBudgetNumber();
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const getAllBudgets = createAsyncThunk(
  "api/comercial/all-budget",
  async (thunkAPI, { rejectWithValue }) => {
    const response = await allBudgets();
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const getItensByBudgets = createAsyncThunk(
  "api/comercial/info-budget",
  async (idBudget, { rejectWithValue }) => {
    const response = await getItemsByIdBudget(idBudget);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
