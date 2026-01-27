import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/configApi";

export const stockNowApi = createApi({
  reducerPath: "stockNowApi",
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
  tagTypes: ["StockNow"],
  endpoints: (builder) => ({
    getAllStockNow: builder.query({
      query: () => "stock/",
      providesTags: ["StockNow"],
    }),
    getStockByProduct: builder.query({
      query: (idProduct) => ({
        url: `stock/${idProduct}`,
        method: "GET",
      }),
    }),
    upStockNow: builder.mutation({
      query: ({ idStockNow, dataStockNow }) => ({
        url: `stock/${idStockNow}`,
        method: "PUT",
        body: dataStockNow,
      }),
      invalidatesTags: ["StockNow"],
    }),
  }),
});

export const {
  useGetAllStockNowQuery,
  useLazyGetStockByProductQuery,
  useUpStockNowMutation,
} = stockNowApi;
