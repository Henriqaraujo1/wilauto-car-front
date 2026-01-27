import { createSlice } from "@reduxjs/toolkit";
import {
  allUsers,
  idUser,
  infoUsername,
  infoEmail,
  createUser,
  updtUsers,
  updtPassword,
  downUser,
} from "./user.actions";

const initialState = {
  user: [],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(idUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(idUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(idUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(infoUsername.pending, (state) => {
        state.status = "loading";
      })
      .addCase(infoUsername.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(infoUsername.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(infoEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(infoEmail.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(infoEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(createUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(updtUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updtUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(updtUsers.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(updtPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updtPassword.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(updtPassword.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(downUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(downUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(downUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      });
  },
});

export default userSlice.reducer;
