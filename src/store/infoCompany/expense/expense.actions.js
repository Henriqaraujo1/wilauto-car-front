import { createAsyncThunk } from "@reduxjs/toolkit";
import { resumeExpensePayed, resumeExpenseNoPayed } from "../../../api/routes/info/expense/infoExpense";

export const infoExpensePayed = createAsyncThunk(
    "api/resume-expense-payed",
    async (infoMonth, {rejectWithValue}) => {
        const response = await resumeExpensePayed(infoMonth)
        if(response.errorStatus === true) {
            return rejectWithValue(response)
        }
        return response
    }
)
export const infoExpenseNoPayed = createAsyncThunk(
    "api/resume-expense-nopay",
    async (infoMonth, {rejectWithValue}) => {
        const response = await resumeExpenseNoPayed(infoMonth)
        console.log(response)
        if(response.errorStatus === true) {
            return rejectWithValue(response)
        }
        return response
    }
)