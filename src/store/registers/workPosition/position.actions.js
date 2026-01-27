import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllPosition,
  getNamePosition,
  newPosition,
  updatePosition,
  deletePosition,
  getIdPosition,
} from "../../../api/routes/register/workPositionRegister.js";

export const allPosition = createAsyncThunk(
  "work-position/all-function",
  async (thunkAPI, { rejectWithValue }) => {
    const response = await getAllPosition();
    if (response.erroStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);

export const getInfoPosition = createAsyncThunk(
  "work-position/id-function",
  async (namePosition, { rejectWithValue }) => {
    const response = await getNamePosition(namePosition);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const getPositionId = createAsyncThunk(
  "work-position/id-function",
  async (idPosition, { rejectWithValue }) => {
    const response = await getIdPosition(idPosition);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const createPosition = createAsyncThunk(
  "work-position/new-function",
  async (dataPosition, { rejectWithValue }) => {
    const response = await newPosition(dataPosition);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);

export const updtPosition = createAsyncThunk(
  "work-position/up-function",
  async (dataPosition, { rejectWithValue }) => {
    const response = await updatePosition(dataPosition);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const downPosition = createAsyncThunk(
  "work-position/down-function",
  async (idPosition, { rejectWithValue }) => {
    const response = await deletePosition(idPosition);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
