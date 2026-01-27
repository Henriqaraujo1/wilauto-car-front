import { createAsyncThunk } from "@reduxjs/toolkit";
import { resumeProfit, resumeProfitMonth } from "../../../api/routes/info/profit/infoProfit";

export const infoProfit = createAsyncThunk(
    "api/resume-profit",
    async (infoDate, {rejectWithValue}) => {
        const response = await resumeProfit(infoDate)
        if(response.errorStatus === true) {
            return rejectWithValue(response)
        }
        return response
    }
)
export const infoProfitMonth = createAsyncThunk(
    "api/resume-profit-month",
    async (infoMonth, {rejectWithValue}) => {
        const response = await resumeProfitMonth(infoMonth)
        if(response.errorStatus === true) {
            return rejectWithValue(response)
        }
        return response
    }
)