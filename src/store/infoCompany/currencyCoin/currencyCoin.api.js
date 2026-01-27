import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/configApi";

export const dolarApi = createApi({
  reducerPath: "DolarApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["DolarValue"],
  endpoints: (builder) => ({
    getDolarValue: builder.query({
      query: () => "dolar/",
      providesTags: ["DolarValue"],
    }),
    invalidatesTags: ["DolarValue"],
    createDolar: builder.mutation({
      query: (newDolar) => ({
        url: "dolar/new-dolar",
        method: "POST",
        body: newDolar,
      }),
      invalidatesTags: ["DolarValue"],
    }),
  }),
});

export const { useGetDolarValueQuery, useCreateDolarMutation } = dolarApi;
