import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProviders,
  getIdProvider,
  newProvider,
  updateProvider,
  deleteProvider,
} from "../../../api/routes/register/providerRegister";

export const allProviders = createAsyncThunk(
  "/provider/all-providers",
  async (thuinkAPI, { rejectWithValue }) => {
    const response = await getAllProviders();
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const getCnpjProvider = createAsyncThunk(
  "/provider/id-providers",
  async (cnpjProvider, { rejectWithValue }) => {
    const response = await getIdProvider(cnpjProvider);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const createProvider = createAsyncThunk(
  "/provider/new-provider",
  async (dataProvider, { rejectWithValue }) => {
    const response = await newProvider(dataProvider);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);
export const updtProvider = createAsyncThunk(
  "/provider/up-provider",
  async (dataProvider, { rejectWithValue }) => {
    const response = await updateProvider(dataProvider);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const downProvider = createAsyncThunk(
  "/provider/down-provider",
  async (idProvider, { rejectWithValue }) => {
    const response = await deleteProvider(idProvider);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
