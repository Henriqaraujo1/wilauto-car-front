import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/configApi";

export const receiveApi = createApi({
  reducerPath: "receiveApi",
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
  tagTypes: ["Receive"],
  endpoints: (builder) => ({
    getAllReceives: builder.query({
      query: () => "financial/receive/",
      providesTags: ["Receive"],
    }),
    getReceiveByOrder: builder.query({
      query: (idOrder) => `financial/receive/${idOrder}`,
    }),
    createReceive: builder.mutation({
      query: (newReceive) => ({
        url: "financial/receive/new-receive",
        method: "POST",
        body: newReceive,
      }),
      invalidatesTags: ["Receive"],
    }),
    updateReceive: builder.mutation({
      query: ({ idOrderPayment, dataReceive }) => ({
        url: `financial/receive/${idOrderPayment}`,
        method: "PUT",
        body: dataReceive,
      }),
      invalidatesTags: ["Receive"],
    }),
    deleteReceive: builder.mutation({
      query: (idReceive) => ({
        url: `financial/receive/delete-financial/receive/${idReceive}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Receive"],
    }),
  }),
});

export const {
  useGetAllReceivesQuery,
  useLazyGetReceiveByOrderQuery,
  useCreateReceiveMutation,
  useUpdateReceiveMutation,
  useDeleteReceiveMutation,
} = receiveApi;
