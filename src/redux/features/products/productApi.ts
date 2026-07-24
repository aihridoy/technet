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
    addReview: build.mutation({
      query: ({ productId, data }) => ({
        url: `/product/${productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { productId }) => [
        { type: 'Review', id: productId },
      ],
    }),
    getReviews: build.query({
      query: (productId) => ({
        url: `/product/${productId}/reviews`,
      }),
      providesTags: (_result, _error, productId) => [
        { type: 'Review', id: productId },
      ],
    }),
    searchProducts: build.query({
      query: (name) => ({ url: `/search?name=${name}` }),
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductsQuery,
  useGetReviewsQuery,
  useAddReviewMutation,
  useSearchProductsQuery,
} = productApi;
