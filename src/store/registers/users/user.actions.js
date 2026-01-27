import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllUsers,
  getIdUser,
  newUser,
  updateUser,
  deleteUser,
  updatePassWord,
  getUsername,
  getEmailUser,
} from "../../../api/routes/register/userRegister";

export const allUsers = createAsyncThunk(
  "/user/all-users",
  async (thunkAPI, { rejectWithValue }) => {
    const response = await getAllUsers();
    if (response.erroStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const idUser = createAsyncThunk(
  "/user/id-user",
  async (idUser, {rejectWithValue}) => {
      const response = await getIdUser(idUser); 
      if(response.errorStatus === true) {
        return rejectWithValue(response)
      }
      return response
  }
);
export const infoUsername = createAsyncThunk(
  "/user/username",
  async (username, {rejectWithValue}) => {
      const response = await getUsername(username); 
      if(response.errorStatus === true) {
        return rejectWithValue(response)
      }
      return response
  }
);
export const infoEmail = createAsyncThunk(
  "/user/email",
  async (emailUser, {rejectWithValue}) => {
      const response = await getEmailUser(emailUser); 
      if(response.errorStatus === true) {
        return rejectWithValue(response)
      }
      return response
  }
);
export const createUser = createAsyncThunk(
  "/user/new-user",
  async (dataUser, {rejectWithValue}) => {
      const response = await newUser(dataUser);
      if(response.errorStatus === true) {
        return rejectWithValue(response)
      }
      return response
  }
);
export const updtUsers = createAsyncThunk(
  "/user/up-user",
  async (dataUser, { rejectWithValue }) => {
    const response = await updateUser(dataUser);
    if(response.errorStatus === true) {
      return rejectWithValue(response)
    }
    return response
  }
);
export const updtPassword = createAsyncThunk(
  "/user/change-password/",
  async (dataUser, { rejectWithValue }) => {
    const response = await updatePassWord(dataUser);
    if(response.errorStatus === true) {
      return rejectWithValue(response)
    }
    return response
  }
);
export const downUser = createAsyncThunk(
  "/user/down-user",
  async (idUser, { rejectWithValue }) => {
    const response = await deleteUser(idUser);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);
