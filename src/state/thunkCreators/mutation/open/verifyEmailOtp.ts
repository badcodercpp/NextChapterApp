import {
  VerifyEmailOtpMutation,
  VerifyEmailOtpMutationVariables,
} from '@/__generated__/graphql';

import { GuardedOrOpenMutationAccessor } from 'redux-graphql-native';
import { INITIATE_VERIFY_EMAIL_OTP } from '@/graphql-communicator';
import { INITIATE_VERIFY_EMAIL_OTP_ACTION } from '@/state/thunkTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiateVerifyEmailOtp = createAsyncThunk(
  INITIATE_VERIFY_EMAIL_OTP_ACTION,
  async (data: VerifyEmailOtpMutationVariables) => {
    const verifyEmailOtpAccessor = new GuardedOrOpenMutationAccessor<
      VerifyEmailOtpMutationVariables,
      VerifyEmailOtpMutation
    >();
    const verifyEmailOtpOutput = await verifyEmailOtpAccessor.execute(
      data,
      INITIATE_VERIFY_EMAIL_OTP,
    );
    if (verifyEmailOtpOutput.error) {
      throw new Error(
        verifyEmailOtpOutput.error?.message ?? 'Something went wrong',
      );
    }
    return verifyEmailOtpOutput.data?.verifyEmailOtp;
  },
);
