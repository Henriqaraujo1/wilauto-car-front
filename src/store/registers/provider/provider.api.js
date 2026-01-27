import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/configApi";

export const providerApi = createApi({
  reducerPath: "providerApi",
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
  tagTypes: ["Provider"],
  endpoints: (builder) => ({
    getAllProviders: builder.query({
      query: () => "provider/",
      providesTags: ["Provider"],
    }),
    getDocProvider: builder.query({
      query: (docProvider) => `provider/${docProvider}`,
    }),
    newProvider: builder.mutation({
      query: (newProvider) => ({
        url: "provider/new-provider",
        method: "POST",
        body: newProvider,
      }),
      invalidatesTags: ["Provider"],
    }),
    upProvider: builder.mutation({
      query: ({ idProvider, dataProvider }) => ({
        url: `provider/${idProvider}`,
        method: "PUT",
        body: dataProvider,
      }),
      invalidatesTags: ["Provider"],
    }),
    deleteProvider: builder.mutation({
      query: (idProvider) => ({
        url: `provider/delete-provider/${idProvider}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllProvidersQuery,
  useLazyGetDocProviderQuery,
  useNewProviderMutation,
  useUpProviderMutation,
  useDeleteProviderMutation,
} = providerApi;
