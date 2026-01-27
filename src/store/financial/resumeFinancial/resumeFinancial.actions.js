import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllFinancial,
  getMonthFinancial,
  getMonthOrders,
} from "../../../api/routes/financial/resumeFinancial";

//Resumo dos clientes
export const resumeFinancial = createAsyncThunk(
  "/financial",
  async (thunkAPI, { rejectWithValue }) => {
    const response = await getAllFinancial();
    
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const resumeMonthFinancial = createAsyncThunk(
  "/financial/info-month",
  async (infoMonth, { rejectWithValue }) => {
    const response = await getMonthFinancial(infoMonth);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const resumeOrders = createAsyncThunk(
  "/financial/resume-sell",
  async (infoMonth, { rejectWithValue }) => {
    const response = await getMonthOrders(infoMonth);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
