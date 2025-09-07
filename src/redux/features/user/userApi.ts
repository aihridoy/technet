import { api } from '@/redux/api/apiSlice';

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    addUser: build.mutation({
      query: (userData) => ({
        url: '/user',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    getUser: build.query({
      query: (email) => ({
        url: `/user/${email}`,
      }),
      providesTags: ['User'],
    }),
  }),
});

export const { useAddUserMutation, useGetUserQuery } = userApi;
