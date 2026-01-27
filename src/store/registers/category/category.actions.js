import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCategorys,
  getInfoCategory,
  newCategory,
  updateCategory,
  deleteCategory,
} from "../../../api/routes/register/categoryRegister";

export const getAllCategory = createAsyncThunk(
  "category/all-category",
  async (thunkAPI, { rejectWithValue }) => {
    const response = await getAllCategorys();
    if (response.erroStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const getNameCategory = createAsyncThunk(
  "category/id-category",
  async (nameCategory, { rejectWithValue }) => {
    const response = await getInfoCategory(nameCategory);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);
export const createCategory = createAsyncThunk(
  "category/new-category",
  async (dataCategory, { rejectWithValue }) => {
    const response = await newCategory(dataCategory);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);
export const updtCategory = createAsyncThunk(
  "category/up-category",
  async (dataCategory, { rejectWithValue }) => {
    const response = await updateCategory(dataCategory);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const downCategory = createAsyncThunk(
  "category/down-category",
  async (idCategory, { rejectWithValue }) => {
    const response = await deleteCategory(idCategory);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);
