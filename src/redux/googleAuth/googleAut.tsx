import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import {PostCommentBody, PostCommentResponse} from './Types';
import {
  GoogleSignin,
  statusCodes,
  GoogleAuth,
} from '@react-native-google-signin/google-signin';
import {
  storeData,
  storeObjectData,
  storeUserProfileData,
} from '../../Async/AsyncStorage/AsyncStorage';

// Define a service using a base URL and expected endpoints
export const GoogleAuthApi = createApi({
  reducerPath: 'GoogleAuth',
  refetchOnFocus: true,

  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://europe-west2-test-streetz-talk.cloudfunctions.net/',
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
  tagTypes: ['refetchComments'],
  endpoints: builder => ({
    AuthenticateUserWithGoogle: builder.mutation({
      query: async () => {
        try {
          await GoogleSignin.configure({
            webClientId:
              '626538884992-i10ru8d2sq4ml8mtuhcj540qtmcomk3n.apps.googleusercontent.com',
          });

          await GoogleSignin.hasPlayServices();
          const data = await GoogleSignin.signIn();
          console.log('data', data);
          // Revoke access before returning the signed-in user data
          await GoogleSignin.revokeAccess();

          if (data) {
            storeData('idToken', data?.idToken);
            // const {displayName, uid, email} = data;
            // const array = data?.user?.name?.split(' ');

            await storeObjectData('USERDATA', {
              id: data?.user?.id,
              first_name: data?.user?.givenName,
              last_name: data?.user?.familyName,
              email: data?.user?.email,
              photo: data?.user?.photo,
            });
          }
          return data;
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('You cancelled the login flow');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Operation (e.g. sign in) is already in progress');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Play services not available or outdated');
          } else {
            console.log('Error:', error);
          }
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useAuthenticateUserWithGoogleMutation} = GoogleAuthApi;
