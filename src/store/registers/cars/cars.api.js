import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/configApi";

export const carApi = createApi({
  reducerPath: "carApi",
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
  tagTypes: ["Car"],
  endpoints: (builder) => ({
    getCarPlate: builder.query({
      query: (carPlate) => `car/${carPlate}`,
      providesTags: ["Car"],
    }),
    getCarByClient: builder.query({
      query: (idClient) => `car/info-client/${idClient}`,
      providesTags: ["Car"],
    }),
    getCheckListCar: builder.query({
      query: (idClient) => `car/checklist/${idClient}`,
    }),
    createCar: builder.mutation({
      query: (newCar) => ({
        url: "car/new-car",
        method: "POST",
        body: newCar,
      }),
      invalidatesTags: ["Car"],
    }),
    updateCar: builder.mutation({
      query: ({ idCar, infoCar }) => ({
        url: `car/${idCar}`,
        method: "PUT",
        body: infoCar,
      }),
      invalidatesTags: ["Car"],
    }),
  }),
});

export const {
  useLazyGetCarPlateQuery,
  useLazyGetCarByClientQuery,
  useLazyGetCheckListCarQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
} = carApi;
