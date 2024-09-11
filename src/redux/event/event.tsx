import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios'
// import {PostCommentBody, PostCommentResponse} from './Types';

import { API_URL } from '../../constants/api';


const LIVE_SERVER = axios.create({
  baseURL: API_URL

});

export const _getResults = async (payload) => {
  const requrest = `api/event/getAllUserEvents/${payload}`;
  try {
    const response = await
      LIVE_SERVER.get(requrest, {
        headers: {
          Accept: 'application/json',
        },
      });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

// Define a service using a base URL and expected endpoints
export const eventsApi = createApi({
  reducerPath: 'events',
  refetchOnFocus: true,

  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      // Modify headers here
      // const token = getState().auth.token;
      // if (token) {
      //   headers.set('Authorization', `Bearer ${token}`);
      // }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['getUser', 'getQuestions'],
  endpoints: builder => ({
    addEventDetai: builder.mutation({
      query: body => {
        return {
          url: 'api/event/create',
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    addLocation: builder.mutation({
      query: body => {
        return {
          url: 'api/location/create',
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    getUserEvents: builder.query({
      query: id => `api/event/getAllUserEvents/${id}`,
      providesTags: ['getUser'],
    }),
    getUserOneEvent: builder.query({
      query: id => {
        console.log('getUserOneEvent', id);
        return {
          url: `api/event/getUserSpecificEvent?user_id=${id?.uid}&event_id=${id?.id}`,
          method: 'GET',
        };
      },
      providesTags: ['getUser'],
    }),
    updateEventDetail: builder.mutation({
      query: body => {
        return {
          url: 'api/event/update',
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    //   addQuestion: builder.mutation({
    //     query: body => {
    //       return {
    //         url: 'api/questions/create',
    //         method: 'POST',
    //         body: body,
    //       };
    //     },
    //     invalidatesTags: ['getQuestions'],
    //     invalidatesTags: ['getQuestions'],
    // onQuerySuccess: (response, queryApi, extraOptions) => {
    //   // Assuming the API response contains the created question's ID
    //   const questionId = response.data.id; // Adjust this according to your API response structure
    //   // You can dispatch an action here to store the question ID in your Redux store
    //   // Example:
    //   // queryApi.dispatch(someActionCreator(questionId));
    // },
    //   }),
    addQuestion: builder.mutation({
      query: body => {
        return {
          url: 'api/questions/create',
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['getQuestions'],
      onQuerySuccess: (response, queryApi, extraOptions) => {
        console.log("Response:", response); // Log the response
        const questionId = response.id; // Extract question ID from the response
        console.log("Question ID:", response.id); // Log the question ID
        queryApi.dispatch(storeQuestionId(response.id)); // Dispatch action to store question ID
      },
    }),

    getEventData: builder.query({
      query: id => `api/event/getAllEventData/${id}`,
      providesTags: ['getQuestions'],
    }),
    getOneQuestion: builder.query({
      query: id => `api/questions/get/${id}`,
      providesTags: ['getQuestions'],
    }),
    updateQuestion: builder.mutation({
      query: body => {
        return {
          url: 'api/questions/update',
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['getQuestions'],
    }),
    postDateRange: builder.mutation({
      query: body => {
        return {
          url: 'api/event/createDataRange',
          method: 'PUT',
          body: body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    postAvailability: builder.mutation({
      query: body => {
        return {
          url: 'api/event/createAvailability',
          method: 'PUT',
          body: body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    updateLocation: builder.mutation({
      query: body => {
        return {
          url: 'api/location/update',
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    getUserAvailability: builder.query({
      query: uid => `api/availability/getUserAvailability?user_id=${uid}`,
      providesTags: ['getUser'],
    }),
    postEventAvailability: builder.mutation({
      query: body => {
        return {
          url: 'api/event/createAvailability',
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    getAllEventData: builder.query({
      query: id => `api/event/getAllEventData/${id}`,
      providesTags: ['getUser'],
    }),
    deleteEvent: builder.mutation({
      query: body => {
        return {
          url: `api/event/delete?user_id=${body.user_id}&event_id=${body.event_id}`,
          method: 'DELETE',
        };
      }
    }),


    updateAvailability: builder.mutation({
      query: body => {
        return {
          url: 'api/availability/update',
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['getUser'],
    }),
    getPlatform: builder.mutation({
      query: body => {
        return {
          url: `api/platform/type/${body?.platform}?user_id=${body?.uid}`,
          method: 'GET',
        };
      },
    }),
    getScheduleEvents: builder.query({
      query: body =>
        `api/schedule/getAllByUser/${body.uid}?limit=${body.limit}`,
    }),
    getOneScheduledEvent: builder.query({
      query: eid => `api/schedule/get/${eid}`,
    }),
    updatePayment: builder.mutation({
      query: body => {
        return {
          url: 'api/payment/remainingPayment',
          method: 'PUT',
          body,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddEventDetaiMutation,
  useAddLocationMutation,
  useGetUserEventsQuery,
  useUpdateEventDetailMutation,
  useGetUserOneEventQuery,
  useAddQuestionMutation,
  useGetEventDataQuery,
  useGetOneQuestionQuery,
  useUpdateQuestionMutation,
  usePostDateRangeMutation,
  usePostAvailabilityMutation,
  usePostEventAvailabilityMutation,
  useDeleteEventMutation,
  useGetAllEventDataQuery,
  useGetUserAvailabilityQuery,
  useUpdateLocationMutation,
  useUpdateAvailabilityMutation,
  useGetPlatformMutation,
  useGetScheduleEventsQuery,
  useGetOneScheduledEventQuery,
  useUpdatePaymentMutation,

} = eventsApi;
