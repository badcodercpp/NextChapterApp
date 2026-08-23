import { RootState } from '../../../state';
import { createSelector } from '@reduxjs/toolkit';

const selectRequestChangePasswordOtpState = (state: RootState) =>
  state.requestChangePasswordOtp;

export const selectRequestChangePasswordOtpPending = createSelector(
  [selectRequestChangePasswordOtpState],
  requestChangePasswordOtp => !!requestChangePasswordOtp.pending,
);

export const selectRequestChangePasswordOtpError = createSelector(
  [selectRequestChangePasswordOtpState],
  requestChangePasswordOtp => requestChangePasswordOtp.error,
);

export const selectRequestChangePasswordOtpSuccess = createSelector(
  [selectRequestChangePasswordOtpState],
  requestChangePasswordOtp => requestChangePasswordOtp.success,
);
