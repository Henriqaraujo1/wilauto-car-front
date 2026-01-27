import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/configApi";

export const usersApi = createApi({
  reducerPath: "usersApi",
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
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => "users/",
      providesTags: ["User"],
    }),
    getIdUser: builder.query({
      query: (idUser) => `users/info-user/${idUser}`,
    }),
    getUsername: builder.query({
      query: (infoUser) => ({
        url: `users/username/`,
        method: "GET",
        params: { infoUser: infoUser },
      }),
    }),
    getEmailUser: builder.query({
      query: (infoUser) => ({
        url: `users/email/`,
        method: "GET",
        params: { infoUser: infoUser },
      }),
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "users/new-user",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),
    upUser: builder.mutation({
      query: ({ idUser, dataUser }) => ({
        url: `users/update-user/${idUser}`,
        method: "PUT",
        body: dataUser,
      }),
      invalidatesTags: ["User"],
    }),
    upPassword: builder.mutation({
      query: ({ idUser, dataPass }) => ({
        url: `users/change-password/${idUser}`,
        method: "PUT",
        body: dataPass,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (idUser) => ({
        url: `users/delete-user/${idUser}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useLazyGetIdUserQuery,
  useLazyGetUsernameQuery,
  useLazyGetEmailUserQuery,
  useCreateUserMutation,
  useUpUserMutation,
  useUpPasswordMutation,
  useDeleteUserMutation,
} = usersApi;
