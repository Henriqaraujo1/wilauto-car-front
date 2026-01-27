import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllClient,
  getIdClient,
  newClient,
  updateClient,
  deleteClient,
  getInfoCep,
} from "../../../api/routes/register/clientRegister";

export const allClients = createAsyncThunk(
  "client/all-clients",
  async (thunkAPI, { rejectWithValue }) => {
    const response = await getAllClient();
    if (response.erroStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);

export const getClient = createAsyncThunk(
  "client/id-client",
  async (idClient, { rejectWithValue }) => {
    const response = await getIdClient(idClient);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const getClientCEP = createAsyncThunk(
  "client/cep-client",
  async (idClient, { rejectWithValue }) => {
    const response = await getInfoCep(idClient);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const createClient = createAsyncThunk(
  "client/new-client",
  async (dataClient, { rejectWithValue }) => {
    const response = await newClient(dataClient);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);

export const updtClient = createAsyncThunk(
  "client/up-client",
  async (dataClient, { rejectWithValue }) => {
    const response = await updateClient(dataClient);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const downClient = createAsyncThunk(
  "client/down-client",
  async (idClient, { rejectWithValue }) => {
    const response = await deleteClient(idClient);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
