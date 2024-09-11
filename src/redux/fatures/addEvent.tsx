import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Alert } from 'react-native';

export interface CounterState {
  location: object;
  meetingType: string;
  eventDetail: object;
  meetingDuration: string;
  defaultDate: string;
  defaultAvailability: string;
  Availability: object;
  meetingLimit: string;
  remindar: object;
  timeForMeeting: string;
  duration: string;
  before_meeting: any;
  after_meeting: any;
  booking_lead_time: any;
  allow_invitee: boolean;
  start_date: object;
  end_date: object;
  date_range: object;
  userEvents: Object
}

const initialState: CounterState = {
  location: {},
  meetingType: '',
  eventDetail: {},
  userEvents: [],
  meetingDuration: '',
  defaultDate: '',
  defaultAvailability: '',
  Availability: [],
  meetingLimit: '',
  remindar: {},
  timeForMeeting: '',
  duration: '',
  before_meeting: 0,
  after_meeting: 0,
  booking_lead_time: 0,
  allow_invitee: false,
  start_date: {},
  end_date: {},
  date_range: {},
};

export const addEventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setMeetingType: (state, action) => {
      state.meetingType = action.payload;
    },
    setEventDetail: (state, action) => {
      state.eventDetail = action.payload;
    },

    setUserEventDetail: (state, action) => {
      console.log("Check Action",action.payload)
      // state.userEvents = action.payload;

      state.userEvents = [...state.userEvents, ...action.payload];

      // const addUniqueIds = (eventIds) => {
      //   eventIds.forEach(id => {
      //     if (!state.userEvents.includes(id)) {
      //       state.userEvents.push(id);
      //     }
      //   });
      // };

      // if (Array.isArray(action.payload)) {
      //   const eventIds = action.payload.map(event => event.id);
      //   addUniqueIds(eventIds);
      // } else if (action.payload && action.payload.eventId && Array.isArray(action.payload.eventId)) {
      //   const eventIds = action.payload.eventId.map(event => event.id);
      //   addUniqueIds(eventIds);
      // }
    },

    //----------
    // setUserEventDetail: (state, action) => {
    //   const addUniqueIds = (eventIds) => {
    //     eventIds.forEach(id => {
    //       if (!state.userEvents.includes(id)) {
    //         state.userEvents.push(id);
    //       }
    //     });
    //   };

    //   if (Array.isArray(action.payload)) {
    //     const eventIds = action.payload.map(event => event.id);
    //     addUniqueIds(eventIds);
    //   } else if (action.payload && action.payload.eventId && Array.isArray(action.payload.eventId)) {
    //     const eventIds = action.payload.eventId.map(event => event.id);
    //     addUniqueIds(eventIds);
    //   }
    // },
    deleteUserEvent(state, action) {
      const eventIdToDelete = action.payload;
      state.userEvents = state.userEvents.filter(eventId => eventId !== eventIdToDelete);
    },
    setMeetingDuration: (state, action) => {
      state.meetingDuration = action.payload;
    },
    setDefaultDate: (state, action) => {
      state.defaultDate = action.payload;
    },
    setDefaultAvailability: (state, action) => {
      state.defaultAvailability = action.payload;
    },
    setAvailability: (state, action) => {
      state.Availability = action.payload;
    },
    setMeetingLimit: (state, action) => {
      state.meetingLimit = action.payload;
    },
    setRemindar: (state, action) => {
      state.remindar = action.payload;
    },
    setTimeforMeeting: (state, action) => {
      state.timeForMeeting = action.payload;
    },
    setBeforeMeeting: (state, action) => {
      state.before_meeting = action.payload;
    },
    setAfterMeeting: (state, action) => {
      state.after_meeting = action.payload;
    },
    setBookingLead: (state, action) => {
      state.booking_lead_time = action.payload;
    },
    setAllowInvitees: (state, action) => {
      state.allow_invitee = action.payload;
    },
    setStartDate: (state, action) => {
      state.start_date = action.payload;
    },
    setEndDate: (state, action) => {
      state.end_date = action.payload;
    },
    setDateRange: (state, action) => {
      state.date_range = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLocation,
  setMeetingType,
  setEventDetail,
  setTimeforMeeting,
  setRemindar,
  setMeetingLimit,
  setAvailability,
  setDefaultAvailability,
  setDefaultDate,
  setMeetingDuration,
  setBeforeMeeting,
  setAfterMeeting,
  setBookingLead,
  setAllowInvitees,
  setStartDate,
  setEndDate,
  setDateRange,
  setUserEventDetail,
  deleteUserEvent
} = addEventSlice.actions;

export default addEventSlice.reducer;
