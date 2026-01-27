import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllExpense,
  getExpenseMonth,
  // getIdExpenseByReceiver,
  getIdExpenseByType,
  newExpense,
  updateExpense,
  deleteExpense,
  updateExpenseByProvider
} from "../../../api/routes/financial/expense";

export const getExpense = createAsyncThunk(
  "financials/expense",
  async (thunkAPI, { rejectWithValue }) => {
    const response = await getAllExpense();
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const getExpenseByMonth = createAsyncThunk(
  "financials/expense/info-month",
  async (infoDate, { rejectWithValue }) => {
    const response = await getExpenseMonth(infoDate);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
// export const idExpenseByReceiver = createAsyncThunk(
//   // Fazer uma query
//   "/expense/receiver",
//   async (idReceiver, thunkAPI) => {
//     try {
//       const response = await getIdExpenseByReceiver(idReceiver);

//       return {
//         idExpense: response.id_receiver,
//         isLoading: true,
//       };
//     } catch (err) {
//       throw err;
//     }
//   }
// );
export const getExpenseByType = createAsyncThunk(
  // Fazer uma query
  "expense/typedebit",
  async (dataExpense, {rejectWithValue}) => {
      const response = await getIdExpenseByType(dataExpense);
      if(response.errorStatus === true) {
        return rejectWithValue(response)
      }

      return response

  }
);
export const createExpense = createAsyncThunk(
  "expense/new-debit",
  async (dataExpense, {rejectWithValue}) => {
      const response = await newExpense(dataExpense);
      if(response.errorStatus === true) {
        return rejectWithValue(response)
      }
      return response
  }
);
export const updtExpense = createAsyncThunk(
  "expense/up-debit",
  async (dataExpense, {rejectWithValue}) => {
    const response = await updateExpense(dataExpense);
    if(response.errorStatus === true) {
      return rejectWithValue(response)
    }

    return response
  }
);
export const updtExpenseByProvider = createAsyncThunk(
  "expense/up-payment-provider",
  async (dataExpense, {rejectWithValue}) => {
    const response = await updateExpenseByProvider(dataExpense);
    if(response.errorStatus === true) {
      return rejectWithValue(response)
    }

    return response
  }
);
export const downExpense = createAsyncThunk(
  "expense/idExpense",
  async (idExpense, { rejectWithValue }) => {
    const response = await deleteExpense(idExpense);

    console.log(response)
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);
