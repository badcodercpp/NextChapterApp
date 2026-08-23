import { ErrorLike } from '@apollo/client';
import { ResendEmailVerificationOtpMutation } from '@/__generated__/graphql';
import { createReduxNamedReducer } from 'redux-named-reducer';
import { createSlice } from '@reduxjs/toolkit';
import { initiateResendEmailVerificationOtp } from '@/state/thunkCreators';

interface ResendEmailVerificationOtpState {
  pending?: boolean;
  success?: ResendEmailVerificationOtpMutation['resendEmailVerificationOtp'];
  error?: ErrorLike['message'];
}

const initialState: ResendEmailVerificationOtpState = {};

// Then, handle actions in your reducers:
export const resendEmailVerificationOtpSlice = createSlice({
  name: 'resendEmailVerificationOtp',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // start loading
    builder

      // start
      .addCase(initiateResendEmailVerificationOtp.pending, state => {
        state.pending = true;
      })
      // success
      .addCase(
        initiateResendEmailVerificationOtp.fulfilled,
        (state, action) => {
          state.pending = false;
          // Add Claims to the state array
          state.success = action.payload;
        },
      )
      // rejected
      .addCase(initiateResendEmailVerificationOtp.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export const resendEmailVerificationOtpSliceReducer = createReduxNamedReducer(
  resendEmailVerificationOtpSlice.reducer,
  resendEmailVerificationOtpSlice.name,
);
