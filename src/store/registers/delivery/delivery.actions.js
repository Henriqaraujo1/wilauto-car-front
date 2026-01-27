import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllDeliverys,
  getInfoDelivery,
  newDelivery,
  updateDelivery,
  deleteDelivery,
} from "../../../api/routes/register/deliveryRegister";

export const getAllDelivery = createAsyncThunk(
  "delivery/all-Delivery",
  async (thunkAPI, { rejectWithValue }) => {
    const response = await getAllDeliverys();
    if (response.erroStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const getNameDelivery = createAsyncThunk(
  "delivery/id-Delivery",
  async (idDelivery, { rejectWithValue }) => {
    const response = await getInfoDelivery(idDelivery);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);
export const createDelivery = createAsyncThunk(
  "delivery/new-Delivery",
  async (dataDelivery, { rejectWithValue }) => {
    const response = await newDelivery(dataDelivery);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);
export const updtDelivery = createAsyncThunk(
  "delivery/up-Delivery",
  async (dataDelivery, { rejectWithValue }) => {
    const response = await updateDelivery(dataDelivery);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const downDelivery = createAsyncThunk(
  "delivery/down-Delivery",
  async (idDelivery, { rejectWithValue }) => {
    const response = await deleteDelivery(idDelivery);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);
