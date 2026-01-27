import { createAsyncThunk } from "@reduxjs/toolkit";
// import { resumeClient } from "../../../api/routes/financial/resumeClient";
import { resumeClient, resumeClientItensByOrder } from "../../../api/routes/financial/resumeClient";

export const getClient = createAsyncThunk(
  "financial/resume-clients",
  async (idClient, {rejectWithValue}) => {
    const response = await resumeClient(idClient);
      if(response.errorStatus === true) {
        return rejectWithValue(response)
      }
      return response
  }
);
export const getClientItensByOrder = createAsyncThunk(
  "financial/resume-clients/items-order",
  async (dataOrder, {rejectWithValue}) => {
    const response = await resumeClientItensByOrder(dataOrder);
      if(response.errorStatus === true) {
        return rejectWithValue(response)
      }
      return response
  }
);
