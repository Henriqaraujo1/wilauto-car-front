import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/configApi";

export const subCategoryApi = createApi({
  reducerPath: "subCategoryApi",
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
  tagTypes: ["SubCategory"],
  endpoints: (builder) => ({
    getSubCategoryById: builder.query({
      query: (idCategory) => `subcategory/info-subcategory/${idCategory}`,
      providesTags: ["SubCategory"],
    }),
    getInfoSubCategory: builder.query({
      query: (idSubCategory) =>
        `subcategory/verify-subCategory/${idSubCategory}`,
    }),
    newSubCategory: builder.mutation({
      query: (newSubCategory) => ({
        url: "subcategory/new-subCategory",
        method: "POST",
        body: newSubCategory,
      }),
      invalidatesTags: ["SubCategory"],
    }),
    upSubCategory: builder.mutation({
      query: ({ idSubCategory, infoSubCategory }) => ({
        url: `subcategory/${idSubCategory}`,
        method: "PUT",
        body: infoSubCategory,
      }),
      invalidatesTags: ["SubCategory"],
    }),
    deleteSubCategory: builder.mutation({
      query: (idSubCategory) => ({
        url: `subcategory/delete-subCategory/${idSubCategory}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubCategory"],
    }),
  }),
});


export const {
  useLazyGetSubCategoryByIdQuery,
  useLazyGetInfoSubCategoryQuery,
  useNewSubCategoryMutation,
  useUpSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoryApi;