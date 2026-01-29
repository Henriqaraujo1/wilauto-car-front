import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userLogout, checkUserStatus } from "./auth.actions";

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  idUser: 0,
  user: "",
  path: "",
  permissions: [],
  welcomeMsg: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //check login status sucess
      .addCase(checkUserStatus.fulfilled, (state, action) => {
        const isAuthenticated = action.payload.isAuthenticated;
        const user = action.payload.user;
        const idUser = action.payload.idUser;
        const permissions = action.payload.permissions;
        const path = action.payload.path;
        const welcomeMsg = action.payload.welcomeMsg;

        state.isAuthenticated = isAuthenticated;
        state.user = user;
        state.idUser = idUser;
        state.permissions = permissions;
        state.path = path;
        state.welcomeMsg = welcomeMsg;
      })
      //Login Success
      .addCase(userLogin.fulfilled, (state, action) => {
        const permissions = action.payload.response.permissions;
        const user = action.payload.response.infoUser;
        const path = action.payload.response.path;
        const isAuthenticated = action.payload.isAuthenticated;
        const welcomeMsg = action.payload.response.welcomeMsg;

        state.user = user;
        state.permissions = permissions;
        state.isAuthenticated = isAuthenticated;
        state.path = path;
        state.welcomeMsg = welcomeMsg;
      })
      //Login Failure
      .addCase(userLogin.rejected, (state, action) => {
        const error = action.payload;
        state.isAuthenticated = false;
        state.error = error;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        const isAuthenticated = action.payload.isAuthenticated;
        state.isAuthenticated = isAuthenticated;
        state.error = false;
      })
      .addCase(userLogout.rejected, (state, action) => {
        const error = action.payload;
        state.isAuthenticated = false;
        state.error = error;
      });
  },
});

//Export reducer Function by default
export default authSlice.reducer;
