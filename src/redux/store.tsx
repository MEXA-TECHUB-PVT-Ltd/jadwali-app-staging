// import {configureStore} from '@reduxjs/toolkit';
// import counterSlice from './fatures/counter/counterSlice';
// import {GoogleAuthApi} from './googleAuth/googleAut';
// import {AuthApi} from './auth/auth';
// import authSlice from './fatures/auth';
// import addEventSlice from './fatures/addEvent';
// import {ServicesApi} from './services/services';
// import {eventsApi} from './event/event';
// import {faqsApi} from './faqs/faqApi';
// import {feedbackApi} from './feedaback/feedbackApi';
// import { subscriptionApi } from './subscription/subscriptionApi';

// export const store = configureStore({
//   reducer: {
//     counter: counterSlice,
//     auth: authSlice,
//     event: addEventSlice,
//     [ServicesApi.reducerPath]: ServicesApi.reducer,
//     [GoogleAuthApi.reducerPath]: GoogleAuthApi.reducer,
//     [AuthApi.reducerPath]: AuthApi.reducer,
//     [eventsApi.reducerPath]: eventsApi.reducer,
//     [faqsApi.reducerPath]: faqsApi.reducer,
//     [feedbackApi.reducerPath]: feedbackApi.reducer,
//     [subscriptionApi.reducerPath]: subscriptionApi.reducer,
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({serializableCheck: false}).concat(
//       GoogleAuthApi.middleware,
//       AuthApi.middleware,
//       ServicesApi.middleware,
//       eventsApi.middleware,
//       faqsApi.middleware,
//       feedbackApi.middleware,
//       subscriptionApi.middleware,
//     ),
// });

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;



// store.ts

import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './fatures/counter/counterSlice';
import { GoogleAuthApi } from './googleAuth/googleAut';
import { AuthApi } from './auth/auth';
import authSlice from './fatures/auth';
import addEventSlice from './fatures/addEvent';
import questionsReducer from './questionSlice'; // Import questions slice reducer
import { ServicesApi } from './services/services';
import { eventsApi } from './event/event';
import { faqsApi } from './faqs/faqApi';
import { feedbackApi } from './feedaback/feedbackApi';
import { subscriptionApi } from './subscription/subscriptionApi';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: authSlice,
    event: addEventSlice,
    questions: questionsReducer, // Include the questions slice reducer here
    [ServicesApi.reducerPath]: ServicesApi.reducer,
    [GoogleAuthApi.reducerPath]: GoogleAuthApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [faqsApi.reducerPath]: faqsApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      GoogleAuthApi.middleware,
      AuthApi.middleware,
      ServicesApi.middleware,
      eventsApi.middleware,
      faqsApi.middleware,
      feedbackApi.middleware,
      subscriptionApi.middleware,
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
