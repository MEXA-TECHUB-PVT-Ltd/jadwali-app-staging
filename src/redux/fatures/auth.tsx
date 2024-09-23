import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface CounterState {
  userData: object;
  password: string;
}

const initialState: CounterState = {
  userData: {},
  password: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUserData, setPassword} = authSlice.actions;

export default authSlice.reducer;
