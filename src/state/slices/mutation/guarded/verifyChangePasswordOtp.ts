import { ErrorLike } from '@apollo/client';
import { VerifyChangePasswordOtpMutation } from '@/__generated__/graphql';
import { createReduxNamedReducer } from 'redux-named-reducer';
import { createSlice } from '@reduxjs/toolkit';
import { initiateVerifyChangePasswordOtp } from '@/state/thunkCreators';

interface VerifyChangePasswordOtpState {
  pending?: boolean;
  success?: VerifyChangePasswordOtpMutation['verifyChangePasswordOtp'];
  error?: ErrorLike['message'];
}

const initialState: VerifyChangePasswordOtpState = {};

// Then, handle actions in your reducers:
export const verifyChangePasswordOtpSlice = createSlice({
  name: 'verifyChangePasswordOtp',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // start loading
    builder

      // start
      .addCase(initiateVerifyChangePasswordOtp.pending, state => {
        state.pending = true;
      })
      // success
      .addCase(initiateVerifyChangePasswordOtp.fulfilled, (state, action) => {
        state.pending = false;
        // Add Claims to the state array
        state.success = action.payload;
      })
      // rejected
      .addCase(initiateVerifyChangePasswordOtp.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export const verifyChangePasswordOtpSliceReducer = createReduxNamedReducer(
  verifyChangePasswordOtpSlice.reducer,
  verifyChangePasswordOtpSlice.name,
);
