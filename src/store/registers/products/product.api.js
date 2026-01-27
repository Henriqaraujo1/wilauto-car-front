import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/configApi";

export const productApi = createApi({
  reducerPath: "productApi",
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

      // IMPORTANTE: Se quiser garantir que não defina Content-Type em uploads:
      if (
        headers.has("content-type") &&
        headers.get("content-type").startsWith("multipart/form-data")
      ) {
        headers.delete("content-type");
      }

      return headers;
    },
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => "product/",
      providesTags: ["Product"],
    }),
    getIdProduct: builder.query({
      query: (idProduct) => `product/info-product/${idProduct}`,
    }),
    getCodProduct: builder.query({
      query: (codProduct) => ({
        url: `product/cod-product/`,
        method: "GET",
        params: codProduct,
      }),
    }),
    getNameProduct: builder.query({
      query: (nameProduct) => ({
        url: `product/info-product/`,
        method: "GET",
        params: nameProduct,
      }),
    }),
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "product/new-product",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (dataProduct) => ({
        url: `product/`,
        method: "PUT",
        body: dataProduct,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (idProduct) => ({
        url: `product/delete-product/${idProduct}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useLazyGetIdProductQuery,
  useLazyGetCodProductQuery,
  useLazyGetNameProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
