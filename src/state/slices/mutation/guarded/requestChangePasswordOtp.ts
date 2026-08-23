import { ErrorLike } from '@apollo/client';
import { RequestChangePasswordOtpMutation } from '@/__generated__/graphql';
import { createReduxNamedReducer } from 'redux-named-reducer';
import { createSlice } from '@reduxjs/toolkit';
import { initiateRequestChangePasswordOtp } from '@/state/thunkCreators';

interface RequestChangePasswordOtpState {
  pending?: boolean;
  success?: RequestChangePasswordOtpMutation['requestChangePasswordOtp'];
  error?: ErrorLike['message'];
}

const initialState: RequestChangePasswordOtpState = {};

// Then, handle actions in your reducers:
export const requestChangePasswordOtpSlice = createSlice({
  name: 'requestChangePasswordOtp',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // start loading
    builder

      // start
      .addCase(initiateRequestChangePasswordOtp.pending, state => {
        state.pending = true;
      })
      // success
      .addCase(initiateRequestChangePasswordOtp.fulfilled, (state, action) => {
        state.pending = false;
        // Add Claims to the state array
        state.success = action.payload;
      })
      // rejected
      .addCase(initiateRequestChangePasswordOtp.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export const requestChangePasswordOtpSliceReducer = createReduxNamedReducer(
  requestChangePasswordOtpSlice.reducer,
  requestChangePasswordOtpSlice.name,
);
