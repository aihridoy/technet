import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
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
    searchProducts: build.query({
      query: (name) => ({ url: `/search?name=${name}` }),
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductsQuery,
  useGetCommentQuery,
  usePostCommentMutation,
  useSearchProductsQuery,
} = productApi;
