import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/configApi";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
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
  tagTypes: ["Employee"],
  endpoints: (builder) => ({
    getAllEmployee: builder.query({
      query: () => "employee/",
      providesTags: ["Employee"],
    }),
    getInfoEmployee: builder.query({
      query: (idEmployee) => `employee/${idEmployee}`,
    }),
    getCodEmployee: builder.query({
      query: () => `employee/cod-employee`,
      providesTags: ["Employee"],
    }),
    createEmployee: builder.mutation({
      query: (newEmployee) => ({
        url: "employee/new-employee",
        method: "POST",
        body: newEmployee,
      }),
      invalidatesTags: ["Employee"],
    }),
    upEmployee: builder.mutation({
      query: ({ idEmployee, dataEmployee }) => ({
        url: `employee/${idEmployee}`,
        method: "PUT",
        body: dataEmployee,
      }),
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: builder.mutation({
      query: (idEmployee) => ({
        url: `employee/${idEmployee}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllEmployeeQuery,
  useLazyGetInfoEmployeeQuery,
  useGetCodEmployeeQuery,
  useCreateEmployeeMutation,
  useUpEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;