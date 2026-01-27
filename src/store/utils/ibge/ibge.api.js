import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ibgeApi = createApi({
  reducerPath: "ibgeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://servicodados.ibge.gov.br/api/v1/localidades/",
  }),
  endpoints: (builder) => ({
    getEstados: builder.query({
      query: () => "estados",
      transformResponse: (res) =>
        res.sort((a, b) => a.nome.localeCompare(b.nome)),
    }),

    getMunicipiosByUf: builder.query({
      query: (uf) => `estados/${uf}/municipios`,
      transformResponse: (res) =>
        res.sort((a, b) => a.nome.localeCompare(b.nome)),
    }),
  }),
});

export const { useGetEstadosQuery, useGetMunicipiosByUfQuery } = ibgeApi;
