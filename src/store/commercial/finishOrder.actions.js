import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOrderNumber,
  orderCheckout
} from "../../api/routes/commercial/finishOrder";


// ! Essa função não está sendo usada no momento - 17/07/2023
// export const addItemCart = createAsyncThunk(
//   "cart/items",
//   async ({ product, qtd }, thunkAPI) => {
//     try {
//       const response = await NewItemCart(product.id, qtd);
//       const item = {
//         ...product,
//         cartItemId: response.id,
//         qtd,
//       };
//       return { item };
//     } catch (err) {
//       throw err;
//     }
//   }
// );


export const checkoutOrder = createAsyncThunk(
  "cart/checkout",
  async (infoOrder, {rejectWithValue}) => {
    const response = await orderCheckout(infoOrder)
    if(response.errorStatus === true) {
      return rejectWithValue(response)
    }
    return response
  }
);

export const getNextNumberOrder = createAsyncThunk(
  "api/comercial/next-number",
  async (thunkAPI, { rejectWithValue }) => {
    const response = await getOrderNumber();
    if (response.errorStatus === true) {
      return rejectWithValue(response);
    }
    return response;
  }
);

// ! Essa função não está sendo usada no momento - 17/07/2023
// export const removeItem = createAsyncThunk(
//   "cart/removeItem",
//   async (cartItemId, thunkAPI) => {
//     try {
//       await removeFromCart(cartItemId);
//       return {
//         item: cartItemId,
//       };
//     } catch (err) {
//       throw err;
//     }
//   }
// );
