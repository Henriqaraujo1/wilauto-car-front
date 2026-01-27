import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getIdProductOut,
  createProductOut,
  updateProductOut,
  deleteProductOut,
  productOutMonth,
} from "../../../api/routes/stock/itemOutStock";

export const productsOutByMonth = createAsyncThunk(
  "/stock-out/all-products",
  async (infoDate, { rejectWithValue }) => {
    const response = await productOutMonth(infoDate);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
// export const allProductsOut = createAsyncThunk(
//   "/stock-out/all-products",
//   async (thunkAPI, { rejectWithValue }) => {
//     const response = await getAllProductOut();
//     if (response.errorStatus === true) {
//       return rejectWithValue(response);
//     }
//     return response;
//   }
// );
export const idProductOut = createAsyncThunk(
  "/stock-out",
  async (idItemOut, { rejectWithValue }) => {
    const response = await getIdProductOut(idItemOut);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const newProductOut = createAsyncThunk(
  "/stock-out/new-stock-out",
  async (dataItemOut, { rejectWithValue }) => {
    const response = await createProductOut(dataItemOut);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);
export const updtProductOut = createAsyncThunk(
  "/stock-out/updt-product",
  async (dataItemOut, { rejectWithValue }) => {
    const response = await updateProductOut(dataItemOut);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);
export const downProductOut = createAsyncThunk(
  "/stockout/delete-product",
  async (idProductOut, { rejectWithValue }) => {
    const response = await deleteProductOut(idProductOut);
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);
