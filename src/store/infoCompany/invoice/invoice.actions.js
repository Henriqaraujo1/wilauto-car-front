import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  resumeInvoice,
  resumeCashier,
} from "../../../api/routes/info/invoice/infoInvoice";

export const infoInvoice = createAsyncThunk(
  "api/resume-invoice",
  async (infoDate, { rejectWithValue }) => {
    const response = await resumeInvoice(infoDate);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const infoCashier = createAsyncThunk(
  "api/resume-cashier",
  async (infoDate, { rejectWithValue }) => {
    const response = await resumeCashier(infoDate);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
