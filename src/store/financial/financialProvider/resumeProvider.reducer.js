// import { createSlice } from "@reduxjs/toolkit";
// import { resumeProvider } from "./resumeProviders.action";

// const initialState = {
//   providers: [],
//   status: "idle" | "loading" | "succeeded" | "failed",
//   error: null,
// };

// const resumeProviderSlice = createSlice({
//   name: "resume-provider",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(resumeProvider.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(resumeProvider.rejected, (state, action) => {
//         state.error = action.payload;
//         state.status = "failed";
//       })
//       .addCase(resumeProvider.fulfilled, (state, action) => {
//         state.providers = action.payload
//         state.status = "succeeded";
//       });
//   },
// });

// export default resumeProviderSlice.reducer;
