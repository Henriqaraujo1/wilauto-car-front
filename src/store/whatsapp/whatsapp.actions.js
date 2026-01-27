import { createAsyncThunk } from "@reduxjs/toolkit";
import { configWhatsapp, sendNote } from "../../api/routes/whatsapp/whatsapp";


export const configureWpp = createAsyncThunk(
  "/config-whatsapp",
  async (thunkAPI, { rejectWithValue }) => {
    const response = await configWhatsapp();
    if (response.erroStatus === true) {
      return rejectWithValue(response);
    }

    return response;
  }
);

export const sendNoteWpp = createAsyncThunk(
    "/send-note",
    async (dataNote, { rejectWithValue }) => {
      const response = await sendNote();
      if (response.erroStatus === true) {
        return rejectWithValue(response);
      }
  
      return response;
    }
  );