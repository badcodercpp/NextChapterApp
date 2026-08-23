import { ErrorLike } from '@apollo/client';
import { VerifyEmailOtpMutation } from '@/__generated__/graphql';
import { createReduxNamedReducer } from 'redux-named-reducer';
import { createSlice } from '@reduxjs/toolkit';
import { initiateVerifyEmailOtp } from '@/state/thunkCreators';

interface VerifyEmailOtpState {
  pending?: boolean;
  success?: VerifyEmailOtpMutation['verifyEmailOtp'];
  error?: ErrorLike['message'];
}

const initialState: VerifyEmailOtpState = {};

// Then, handle actions in your reducers:
export const verifyEmailOtpSlice = createSlice({
  name: 'verifyEmailOtp',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // start loading
    builder

      // start
      .addCase(initiateVerifyEmailOtp.pending, state => {
        state.pending = true;
      })
      // success
      .addCase(initiateVerifyEmailOtp.fulfilled, (state, action) => {
        state.pending = false;
        // Add Claims to the state array
        state.success = action.payload;
      })
      // rejected
      .addCase(initiateVerifyEmailOtp.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export const verifyEmailOtpSliceReducer = createReduxNamedReducer(
  verifyEmailOtpSlice.reducer,
  verifyEmailOtpSlice.name,
);
