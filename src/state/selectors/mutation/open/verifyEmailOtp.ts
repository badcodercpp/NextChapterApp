import { RootState } from '../../../state';
import { createSelector } from '@reduxjs/toolkit';

const selectVerifyEmailOtpState = (state: RootState) => state.verifyEmailOtp;

export const selectVerifyEmailOtpPending = createSelector(
  [selectVerifyEmailOtpState],
  verifyEmailOtp => !!verifyEmailOtp.pending,
);

export const selectVerifyEmailOtpError = createSelector(
  [selectVerifyEmailOtpState],
  verifyEmailOtp => verifyEmailOtp.error,
);

export const selectVerifyEmailOtpSuccess = createSelector(
  [selectVerifyEmailOtpState],
  verifyEmailOtp => verifyEmailOtp.success,
);
