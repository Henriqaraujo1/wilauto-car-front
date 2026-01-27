import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/configApi";

export const clientApi = createApi({
  reducerPath: "clientApi",
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
  tagTypes: ["Client"],
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: () => "client/",
      providesTags: ["Client"],
    }),
    getDocClient: builder.query({
      query: (docClient) => `client/${docClient}`,
    }),
    getCEPClient: builder.query({
      query: (cep) => `client/cep/${cep}`,
    }),
    createClient: builder.mutation({
      query: (newClient) => ({
        url: "client/new-client",
        method: "POST",
        body: newClient,
      }),
      invalidatesTags: ["Client"],
    }),
    updateClient: builder.mutation({
      query: ({ idClient, dataClient }) => ({
        url: `client/${idClient}`,
        method: "PUT",
        body: dataClient,
      }),
      invalidatesTags: ["Client"],
    }),
    deleteClient: builder.mutation({
      query: (idClient) => ({
        url: `client/${idClient}`,
        method: "DELETE",
      }),
      // invalidatesTags: ["Client"],
    }),
  }),
});

export const {
  useGetAllClientsQuery,
  useLazyGetDocClientQuery,
  useLazyGetCepClientQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientApi;
