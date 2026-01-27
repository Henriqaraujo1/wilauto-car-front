import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  isLoggedIn,
  LogoutUser,
} from "../../api/routes/authenticate/auth";
import Cookies from "js-cookie";

export const userLogin = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    const response = await loginUser(credentials);
    
    if (response.errorStatus) {
      return rejectWithValue(response);
    } else {
      return {
        response,
        isAuthenticated: true,
      };
    }
  }
);

export const userLogout = createAsyncThunk(
  "auth/logout",
  async (thunkAPI, { rejectWithValue }) => {
    const response = await LogoutUser();
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    Cookies.remove("token");
    return {
      response,
      isLogout: true,
      isAuthenticated: false,
    };
  }
);

export const checkUserStatus = createAsyncThunk(
  "auth/check-user-status",
  async (thunkAPI, { rejectWithValue }) => {
    const response = await isLoggedIn();
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return {
      isAuthenticated: true,
      user: response.user,
      permissions: response.permissions,
      idUser: response.idUser,
      path: response.path,
      
    };
  }
);
