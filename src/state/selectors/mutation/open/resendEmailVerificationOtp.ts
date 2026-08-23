import { RootState } from '../../../state';
import { createSelector } from '@reduxjs/toolkit';

const selectResendEmailVerificationOtpState = (state: RootState) =>
  state.resendEmailVerificationOtp;

export const selectResendEmailVerificationOtpPending = createSelector(
  [selectResendEmailVerificationOtpState],
  resendEmailVerificationOtp => !!resendEmailVerificationOtp.pending,
);

export const selectResendEmailVerificationOtpError = createSelector(
  [selectResendEmailVerificationOtpState],
  resendEmailVerificationOtp => resendEmailVerificationOtp.error,
);

export const selectResendEmailVerificationOtpSuccess = createSelector(
  [selectResendEmailVerificationOtpState],
  resendEmailVerificationOtp => resendEmailVerificationOtp.success,
);
