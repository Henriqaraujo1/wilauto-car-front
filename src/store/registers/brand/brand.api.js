import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/configApi";

export const brandApi = createApi({
  reducerPath: "brandApi",
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
  tagTypes: ["Brand"],
  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: () => "brand/",
      providesTags: ["Brand"],
    }),
    getBrand: builder.query({
      query: (infoBrand) => ({
        url: `brand/info-brand/`,
        method: "GET",
        params: {brand: infoBrand}
      })
    }),
    createBrand: builder.mutation({
      query: (newBrand) => ({
        url: "brand/new-brand",
        method: "POST",
        body: newBrand,
      }),
      invalidatesTags: ["Brand"],
    }),
    upBrand: builder.mutation({
      query: ({ idBrand, dataBrand }) => ({
        url: `brand/${idBrand}`,
        method: "PUT",
        body: dataBrand,
      }),
      invalidatesTags: ["Brand"],
    }),
    deleteBrand: builder.mutation({
      query: (idBrand) => ({
        url: `brand/delete-brand/${idBrand}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useGetAllBrandsQuery,
  useLazyGetBrandQuery,
  useCreateBrandMutation,
  useUpBrandMutation,
  useDeleteBrandMutation,
} = brandApi;