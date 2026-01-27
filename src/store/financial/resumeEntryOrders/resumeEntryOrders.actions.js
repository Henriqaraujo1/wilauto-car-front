import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getResumeEntryOrders,
  getResumeMonthEntryOrders,
} from "../../../api/routes/financial/resumeEntryOrders";

export const resumeEntryOrders = createAsyncThunk(
  "financial/resume-entry-orders",
  async (thunkAPI, { rejectWithValue }) => {
    const response = await getResumeEntryOrders();

    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const resumeMonthEntryOrders = createAsyncThunk(
  "financial/resume-entry-orders/info-month",
  async (infoMonth, { rejectWithValue }) => {
    const response = await getResumeMonthEntryOrders(infoMonth);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
