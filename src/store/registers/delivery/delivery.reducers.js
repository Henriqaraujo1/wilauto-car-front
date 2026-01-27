import { createSlice } from "@reduxjs/toolkit";
import {
  getAllDelivery,
  getIdDelivery,
  createDelivery,
  updtDelivery,
  downDelivery,
} from "./delivery.actions";

const initialState = {
  Deliverys: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

const DeliverySlice = createSlice({
  name: "Delivery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDelivery.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllDelivery.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getAllDelivery.fulfilled, (state, action) => {
        state.Deliverys = action.payload;
        state.status = "succeeded";
      })
      .addCase(getIdDelivery.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getIdDelivery.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getIdDelivery.fulfilled, (state, action) => {
        state.Deliverys = action.payload;
        state.status = "succeeded";
      })
      .addCase(createDelivery.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDelivery.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(createDelivery.fulfilled, (state, action) => {
        state.Deliverys = action.payload;
        state.status = "succeeded";
      })
      .addCase(updtDelivery.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updtDelivery.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(updtDelivery.fulfilled, (state, action) => {
        state.Deliverys = action.payload;
        state.status = "succeeded";
      })
      .addCase(downDelivery.pending, (state) => {
        state.status = "loading";
      })
      .addCase(downDelivery.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(downDelivery.fulfilled, (state, action) => {
        state.Deliverys = action.payload;
        state.status = "succeeded";
      });
  },
});

export default DeliverySlice.reducer;
