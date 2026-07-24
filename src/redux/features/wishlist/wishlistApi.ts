import { api } from '@/redux/api/apiSlice';

const wishlistApi = api.injectEndpoints({
  endpoints: (build) => ({
    getWishlist: build.query({
      query: () => ({ url: '/wishlist' }),
      providesTags: ['Wishlist'],
    }),
    toggleWishlist: build.mutation({
      query: (productId) => ({
        url: '/wishlist/toggle',
        method: 'POST',
        body: { productId },
      }),
      invalidatesTags: ['Wishlist'],
    }),
  }),
});

export const { useGetWishlistQuery, useToggleWishlistMutation } = wishlistApi;
