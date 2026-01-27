import { createSlice } from "@reduxjs/toolkit";
import { checkUserStatus } from "../auth/auth.actions";
import {
  checkoutOrder,
  getNextNumberOrder,
} from "./finishOrder.actions";

const initialState = {
  cart: [],
  orders: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUserStatus.fulfilled, (state, action) => {
        const { cart } = action.payload;
        Object.assign(state, cart);
      })
      .addCase(checkoutOrder.fulfilled, (state, action) => {
        const { checkCart } = action.payload;
        state.checkCart = checkCart;
      })
      .addCase(getNextNumberOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNextNumberOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "error";
      })
      .addCase(getNextNumberOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = "succeeded";
      });
  },
});

export default cartSlice.reducer;
