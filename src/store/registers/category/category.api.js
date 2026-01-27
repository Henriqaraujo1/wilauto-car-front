import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/configApi";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
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
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => "category/",
      providesTags: ["Category"],
    }),
    getInfoCategory: builder.query({
      query: (nameCategory) => ({
        url: `category/info-category/`,
        method: "GET",
        params: { nameCategory },
      }),
    }),
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "category/new-category",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({ idCategory, infoCategory }) => ({
        url: `category/${idCategory}`,
        method: "PUT",
        body: infoCategory,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (idCategory) => ({
        url: `category/delete-category/${idCategory}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useLazyGetInfoCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
