import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/configApi";

export const deliveryApi = createApi({
  reducerPath: "deliveryApi",
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
  tagTypes: ["Delivery"],
  endpoints: (builder) => ({
    getAllDelivery: builder.query({
      query: () => "delivery/",
      providesTags: ["Delivery"],
    }),
    getInfoDelivery: builder.query({
      query: (idDelivery) => `delivery/info-delivery/${idDelivery}`,
    }),
    createDelivery: builder.mutation({
      query: (newDelivery) => ({
        url: "delivery/new-delivery",
        method: "POST",
        body: newDelivery,
      }),
      invalidatesTags: ["Delivery"],
    }),
    upDelivery: builder.mutation({
      query: ({ idDelivery, infoDelivery }) => ({
        url: `delivery/${idDelivery}`,
        method: "PUT",
        body: infoDelivery,
      }),
      invalidatesTags: ["Delivery"],
    }),
    deleteDelivery: builder.mutation({
      query: (idDelivery) => ({
        url: `delivery/delete-delivery/${idDelivery}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Delivery"],
    }),
  }),
});

export const {
  useGetAllDeliveryQuery,
  useLazyGetInfoDeliveryQuery,
  useCreateDeliveryMutation,
  useUpDeliveryMutation,
  useDeleteDeliveryMutation,
} = deliveryApi;
