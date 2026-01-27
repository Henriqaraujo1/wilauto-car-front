import { createAsyncThunk } from "@reduxjs/toolkit";
import { infoHome, monthResume } from "../../api/routes/home/home";

export const homeInfo = createAsyncThunk(
  "api/home/",
  async (infoMonth, { rejectWithValue }) => {
    const response = await infoHome(infoMonth);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    } else {
      return response;
    }
  }
);
export const getMonthFinancial = createAsyncThunk(
    "api/home/info-month",
    async (infoMonth, {rejectWithValue}) => {
        const response = await monthResume(infoMonth)
        if(response.errorStatus === true) {
            return rejectWithValue(response)
        }
        return response
    }
)
