import { api } from '@/redux/api/apiSlice';

const orderApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query({
      query: () => ({ url: '/orders' }),
      providesTags: ['Order'],
    }),
    createOrder: build.mutation({
      query: (orderData) => ({
        url: '/order',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersQuery } = orderApi;
