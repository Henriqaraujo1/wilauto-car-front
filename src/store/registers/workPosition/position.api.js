import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/configApi";

export const positionApi = createApi({
  reducerPath: "positionApi",
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
  tagTypes: ["Position"],
  endpoints: (builder) => ({
    getAllPosition: builder.query({
      query: () => "work-position/",
      providesTags: ["Position"],
    }),
    getIdPosition: builder.query({
      query: (idPosition) => `work-position/${idPosition}`,
    }),
    getInfoPosition: builder.query({
      query: (infoPosition) => ({
        url: `work-position/info-position/`,
        method: "GET",
        params: { infoPosition },
      }),
    }),
    createPosition: builder.mutation({
      query: (newPosition) => ({
        url: "work-position/new-position",
        method: "POST",
        body: newPosition,
      }),
      invalidatesTags: ["Position"],
    }),
    upPosition: builder.mutation({
      query: ({ idPosition, dataPosition }) => ({
        url: `work-position/${idPosition}`,
        method: "PUT",
        body: dataPosition,
      }),
      invalidatesTags: ["Position"],
    }),
    deletePosition: builder.mutation({
      query: (idPosition) => ({
        url: `work-position/${idPosition}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllPositionQuery,
  useLazyGetIdPositionQuery,
  useLazyGetInfoPositionQuery,
  useCreatePositionMutation,
  useUpPositionMutation,
  useDeletePositionMutation,
} = positionApi;
