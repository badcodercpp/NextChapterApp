import { RootState } from '../../../state';
import { createSelector } from '@reduxjs/toolkit';

const selectVerifyChangePasswordOtpState = (state: RootState) =>
  state.verifyChangePasswordOtp;

export const selectVerifyChangePasswordOtpPending = createSelector(
  [selectVerifyChangePasswordOtpState],
  verifyChangePasswordOtp => !!verifyChangePasswordOtp.pending,
);

export const selectVerifyChangePasswordOtpError = createSelector(
  [selectVerifyChangePasswordOtpState],
  verifyChangePasswordOtp => verifyChangePasswordOtp.error,
);

export const selectVerifyChangePasswordOtpSuccess = createSelector(
  [selectVerifyChangePasswordOtpState],
  verifyChangePasswordOtp => verifyChangePasswordOtp.success,
);
