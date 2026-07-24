import { api } from '@/redux/api/apiSlice';

const orderApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query({
      query: () => ({ url: '/orders' }),
      providesTags: ['Order'],
    }),
    getMyOrders: build.query({
      query: () => ({ url: '/orders/mine' }),
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
    updateOrderStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `/order/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetMyOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
