import { createAsyncThunk } from "@reduxjs/toolkit";
import { getComissionByMonth, getOrderByEmployee, updateComission } from "../../../api/routes/financial/comission";

export const getComissionMonth = createAsyncThunk(
  "comission/info-month",
  async (infoMonth, { rejectWithValue }) => {
    const response = await getComissionByMonth(infoMonth);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const getComissionsByEmployee = createAsyncThunk(
  "comission/comission-employee",
  async (infoOrders, { rejectWithValue }) => {
    const response = await getOrderByEmployee(infoOrders);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);



export const upComission = createAsyncThunk(
  "comission/up-comission",
  async (infoDate, { rejectWithValue }) => {
    const response = await updateComission(infoDate);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);

// export const closeCashier = createAsyncThunk(
//   "cashier/up-cashier",
//   async (dataCashier, { rejectWithValue }) => {
//     const response = await closedCashier(dataCashier);
//     if (response.errorStatus === true) {
//       return rejectWithValue(response);
//     }
//     return response;
//   }
// );

// export const downCashier = createAsyncThunk(
//   "cashier/down-cashier",
//   async (dataCashier, { rejectWithValue }) => {
//     const response = await deleteCashier(dataCashier);
//     if (response.errorStatus === true) {
//       return rejectWithValue(response);
//     }
//     return response;
//   }
// );
