import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'http://localhost:3001';

export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Feedback', 'Users'],
  endpoints: (builder) => ({
    // отзывы
    getFeedback: builder.query({
      query: () => '/feedback',
      providesTags: ['Feedback'],
    }),
    
    addFeedback: builder.mutation({
      query: (feedback) => ({
        url: '/feedback',
        method: 'POST',
        body: feedback,
      }),
      invalidatesTags: ['Feedback'],
    }),
    
    updateFeedbackStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/feedback/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Feedback'],
    }),
    
    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `/feedback/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Feedback'],
    }),
    
    // пользователи
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['Users'],
    }),
    
    updateUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Users'],
    }),
    
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
    
    // авторизация
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: `/users?username=${credentials.username}&password=${credentials.password}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetFeedbackQuery,
  useAddFeedbackMutation,
  useUpdateFeedbackStatusMutation,
  useDeleteFeedbackMutation,
  
  useGetUsersQuery,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
  
  useLoginUserMutation,
} = rtkApi;