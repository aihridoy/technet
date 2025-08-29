import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => ({ url: '/products' }),
    }),
  }),
});

export const { useGetPostsQuery } = api;
