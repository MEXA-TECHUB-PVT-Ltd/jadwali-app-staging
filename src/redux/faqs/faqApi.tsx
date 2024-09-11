import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import {PostCommentBody, PostCommentResponse} from './Types';

import {API_URL} from '../../constants/api';

// Define a service using a base URL and expected endpoints
export const faqsApi = createApi({
  reducerPath: 'faq',
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
  tagTypes: ['getFaq'],
  endpoints: builder => ({
    getAllFaqs: builder.query({
      query: () => `api/faqs/getAll`,
    }),
    getOneFaq: builder.query({
      query: id => `api/faqs/get/${id}`,
      providesTags: ['getFaq'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetAllFaqsQuery, useGetOneFaqQuery} = faqsApi;
