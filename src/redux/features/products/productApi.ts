import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => ({ url: '/products' }),
      providesTags: ['Product'],
    }),
    getProduct: build.query({
      query: (id) => ({
        url: `/product/${id}`,
      }),
    }),
    addProduct: build.mutation({
      query: (data) => ({
        url: '/product',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: build.mutation({
      query: ({ id, data }) => ({
        url: `/product/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
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
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetReviewsQuery,
  useAddReviewMutation,
  useSearchProductsQuery,
} = productApi;
