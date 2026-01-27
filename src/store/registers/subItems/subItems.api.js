import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/configApi";

export const subProductApi = createApi({
  reducerPath: "subProductApi",
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
      if (
        headers.has("content-type") &&
        headers.get("content-type").startsWith("multipart/form-data")
      ) {
        headers.delete("content-type");
      }
      return headers;
    },
  }),
  tagTypes: ["SubProduct"],
  endpoints: (builder) => ({
    getSubProductByIdProduct: builder.query({
      query: (idProduct) => `sub-product/${idProduct}`,
      providesTags: ["SubProduct"],
    }),
    listSubProductProduct: builder.query({
      query: (idProduct) => `sub-product/list/${idProduct}`,
      providesTags: ["SubProduct"],
    }),
    getIdSubProduct: builder.query({
      query: (codSubProduct) => `sub-product/cod-subProduct/${codSubProduct}`,
      providesTags: ["SubProduct"],
    }),
    getNameSubProduct: builder.query({
      query: (infoSubProduct) => ({
        url: `sub-product/name-subproduct/`,
        method: "GET",
        params: { nameSubProduct: infoSubProduct },
      }),
    }),
    newSubProduct: builder.mutation({
      query: (newSubProduct) => ({
        url: "sub-product/new-sub-product",
        method: "POST",
        body: newSubProduct,
      }),
      invalidatesTags: ["SubProduct"],
    }),
    upSubProduct: builder.mutation({
      query: ({ idSubProduct, infoSubProduct }) => ({
        url: `sub-product/${idSubProduct}`,
        method: "PUT",
        body: infoSubProduct,
      }),
      invalidatesTags: ["SubProduct"],
    }),
  }),
});

export const {
  useGetSubProductByIdProductQuery,
  useLazyListSubProductProductQuery,
  useLazyGetIdSubProductQuery,
  useLazyGetNameSubProductQuery,
  useNewSubProductMutation,
  useUpSubProductMutation,
} = subProductApi;
