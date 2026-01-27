import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllEmployee,
  newEmployee,
  updateEmployee,
  deleteEmployee,
  getCodEmployee,
  getDocEmployee,
} from "../../../api/routes/register/employeeRegister";

export const allEmployees = createAsyncThunk(
  "employee/all-employee",
  async (thunkAPI, { rejectWithValue }) => {
    const response = await getAllEmployee();
    if (response.erroStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);

export const getEmployee = createAsyncThunk(
  "employee/id-employee",
  async (docEmployee, { rejectWithValue }) => {
    const response = await getDocEmployee(docEmployee);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const getNextCodEmployee = createAsyncThunk(
  "employee/cod-employee",
  async (thunkAPI, { rejectWithValue }) => {
    const response = await getCodEmployee();
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const createEmployee = createAsyncThunk(
  "employee/new-employee",
  async (dataEmployee, { rejectWithValue }) => {
    const response = await newEmployee(dataEmployee);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);

export const updtEmployee = createAsyncThunk(
  "employee/up-employee",
  async (dataEmployee, { rejectWithValue }) => {
    const response = await updateEmployee(dataEmployee);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const downEmployee = createAsyncThunk(
  "employee/down-employee",
  async (idEmployee, { rejectWithValue }) => {
    const response = await deleteEmployee(idEmployee);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
