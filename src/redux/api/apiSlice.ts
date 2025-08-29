import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => ({ url: '/products' }),
    }),
  }),
});

export const { useGetPostsQuery } = api;
