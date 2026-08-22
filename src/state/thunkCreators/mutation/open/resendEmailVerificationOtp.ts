import {
  ResendEmailVerificationOtpMutation,
  ResendEmailVerificationOtpMutationVariables,
} from '@/__generated__/graphql';

import { GuardedOrOpenMutationAccessor } from 'redux-graphql-native';
import { INITIATE_RESEND_EMAIL_VERIFICATION_OTP } from '@/graphql-communicator';
import { INITIATE_RESEND_EMAIL_VERIFICATION_OTP_ACTION } from '@/state/thunkTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiateResendEmailVerificationOtp = createAsyncThunk(
  INITIATE_RESEND_EMAIL_VERIFICATION_OTP_ACTION,
  async (data: ResendEmailVerificationOtpMutationVariables) => {
    const resendEmailVerificationOtpAccessor =
      new GuardedOrOpenMutationAccessor<
        ResendEmailVerificationOtpMutationVariables,
        ResendEmailVerificationOtpMutation
      >();
    const initiateResendEmailVerificationOtpOutput =
      await resendEmailVerificationOtpAccessor.execute(
        data,
        INITIATE_RESEND_EMAIL_VERIFICATION_OTP,
      );
    if (initiateResendEmailVerificationOtpOutput.error) {
      throw new Error(
        initiateResendEmailVerificationOtpOutput.error?.message ??
          'Something went wrong',
      );
    }
    return initiateResendEmailVerificationOtpOutput.data
      ?.resendEmailVerificationOtp;
  },
);
