import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/configApi";

export const moreSellApi = createApi({
  reducerPath: "moreSellApi",
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
  tagTypes: ["ProductMoreSell"],
  endpoints: (builder) => ({
    getAllProductMoreSells: builder.mutation({
      query: (infoDate) => ({
        url: "more-sell/",
        method: "POST",
        body: infoDate,
        providesTags: ["ProductMoreSell"],
      }),
    }),
    getProductMoreSell: builder.query({
      query: (infoProductMoreSell) => ({
        url: `more-sell/info-product/`,
        method: "GET",
        params: { moreSell: infoProductMoreSell },
      }),
    }),
  }),
});

export const {
  useGetAllProductMoreSellsMutation,
  useLazyGetProductMoreSellQuery,
} = moreSellApi;
