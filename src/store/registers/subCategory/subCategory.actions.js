import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getInfoSubCategory,
  newSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategorysById,
} from "../../../api/routes/register/subCategoryRegister";

export const getAllSubCategoryById = createAsyncThunk(
  "subcategory/all-subcategory",
  async (idCategory, { rejectWithValue }) => {
    const response = await getSubCategorysById(idCategory);
    if (response.erroStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const getNameSubCategory = createAsyncThunk(
  "subcategory/id-subcategory",
  async (idCategory, { rejectWithValue }) => {
    const response = await getInfoSubCategory(idCategory);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);

export const createSubCategory = createAsyncThunk(
  "subcategory/new-subcategory",
  async (dataSubCategory, { rejectWithValue }) => {
    const response = await newSubCategory(dataSubCategory);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);
export const updtSubCategory = createAsyncThunk(
  "subcategory/up-subcategory",
  async (dataCategory, { rejectWithValue }) => {
    const response = await updateSubCategory(dataCategory);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const downSubCategory = createAsyncThunk(
  "subcategory/down-subcategory",
  async (idCategory, { rejectWithValue }) => {
    const response = await deleteSubCategory(idCategory);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);
