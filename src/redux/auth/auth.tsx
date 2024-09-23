import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import {PostCommentBody, PostCommentResponse} from './Types';

import {API_URL} from '../../constants/api';

// Define a service using a base URL and expected endpoints
export const AuthApi = createApi({
  reducerPath: 'auths',
  refetchOnFocus: true,

  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, {getState}) => {
      // Modify headers here
      // const token = getState().auth.token;
      // if (token) {
      //   headers.set('Authorization', `Bearer ${token}`);
      // }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['getUser', 'getBankdetails', 'getService', 'getServiceTypes'],
  endpoints: builder => ({
    addUser: builder.mutation({
      query: body => {
        return {
          url: '/api/users/create',
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    logninUser: builder.mutation({
      query: body => {
        return {
          url: 'api/users/signIn',
          method: 'POST',
          body: body,
        };
      },
    }),
    forgetPassword: builder.mutation({
      query: body => {
        return {
          url: 'api/users/forgotPassword',
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    resetPassword: builder.mutation({
      query: body => {
        return {
          url: 'api/users/resetPassword',
          method: 'PUT',
          body: body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    updatePassword: builder.mutation({
      query: body => {
        return {
          url: 'api/users/changePassword',
          method: 'PUT',
          body: body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    verifyOtp: builder.mutation({
      query: body => {
        return {
          url: 'api/users/verify_otp',
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    addAvailability: builder.mutation({
      query: body => {
        return {
          url: 'api/availability/create',
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    updateAvailability: builder.mutation({
      query: body => {
        return {
          url: 'availability/update',
          method: 'PUT',
          body: body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    uploadImage: builder.mutation({
      query: body => {
        return {
          url: 'api/universal/uploads',
          method: 'POST',
          body,
        };
      },
    }),
    updateProfile: builder.mutation({
      query: body => {
        return {
          url: 'api/users/updateProfile',
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    getUserById: builder.query({
      query: id => `api/users/get/${id}`,
      providesTags: ['getUser'],
    }),
    postBankDetails: builder.mutation({
      query: body => {
        return {
          url: 'api/bank_details/create',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['getBankdetails'],
    }),
    updateBankDetails: builder.mutation({
      query: body => {
        return {
          url: 'api/bank_details/update',
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['getBankDetails'],
    }),
    getBankDetails: builder.query({
      query: uid => `api/bank_details/get/${uid}`,
      providesTags: ['getBankdetails'],
    }),
    getUserServices: builder.query({
      query: uid => `api/attachServices/get/${uid}`,
      providesTags: ['getUser', 'getService'],
    }),
    getUserServiceTypes: builder.query({
      query: uid => `api/attachServiceTypes/get/${uid}`,
      providesTags: ['getUser', 'getServiceTypes'],
    }),
    updateUserService: builder.mutation({
      query: body => {
        return {
          url: 'api/attachServices/update',
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['getUser', 'getService'],
    }),
    updateUserServiceTypes: builder.mutation({
      query: body => {
        return {
          url: 'api/attachServiceTypes/update',
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['getUser', 'getServiceTypes'],
    }),
    // irfan added this mutation to delete user account
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `api/users/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getUser'],
    }),

  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddUserMutation,
  useForgetPasswordMutation,
  useUpdatePasswordMutation,
  useLogninUserMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useAddAvailabilityMutation,
  useUpdateAvailabilityMutation,
  useUploadImageMutation,
  useUpdateProfileMutation,
  useGetUserByIdQuery,
  usePostBankDetailsMutation,
  useUpdateBankDetailsMutation,
  useGetBankDetailsQuery,
  useGetUserServicesQuery,
  useGetUserServiceTypesQuery,
  useUpdateUserServiceMutation,
  useUpdateUserServiceTypesMutation,
  useDeleteUserMutation, //irfan added this to export
} = AuthApi;
