import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import {PostCommentBody, PostCommentResponse} from './Types';

import {API_URL} from '../../constants/api';

// Define a service using a base URL and expected endpoints
export const ServicesApi = createApi({
  reducerPath: 'services',
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
  tagTypes: ['getUser'],
  endpoints: builder => ({
    Allservices: builder.query({
      query: () => 'api/services/getAll',
    }),
    getOneService: builder.query({
      query: service_id => {
        return {
          url: `api/serviceType/getServiceTypesByService/${service_id}`,
          method: 'GET',
        };
      },
    }),
    addService: builder.mutation({
      query: body => {
        return {
          url: '/api/attachServices/create',
          method: 'POST',
          body: body,
        };
      },
    }),
    addServiceTypes: builder.mutation({
      query: body => {
        return {
          url: 'api/attachServiceTypes/create',
          method: 'POST',
          body: body,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAllservicesQuery,
  useGetOneServiceQuery,
  useAddServiceMutation,
  useAddServiceTypesMutation,
} = ServicesApi;
