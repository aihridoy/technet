import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: ['Comment', 'Product'],
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => ({ url: '/products' }),
    }),
    getProduct: build.query({
      query: (id) => ({
        url: `/product/${id}`,
      }),
    }),
    postComment: build.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ({ id }) => [{ type: 'Comment', id }],
    }),
    getComment: build.query({
      query: (id) => ({
        url: `/comment/${id}`,
      }),
      providesTags: (id) => [{ type: 'Comment', id }],
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductsQuery,
  useGetCommentQuery,
  usePostCommentMutation,
} = api;
