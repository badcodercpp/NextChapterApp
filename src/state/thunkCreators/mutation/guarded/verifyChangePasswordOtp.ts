import {
  VerifyChangePasswordOtpMutation,
  VerifyChangePasswordOtpMutationVariables,
} from '@/__generated__/graphql';

import { GuardedOrOpenMutationAccessor } from 'redux-graphql-native';
import { INITIATE_VERIFY_CHANGE_PASSWORD_OTP } from '@/graphql-communicator';
import { INITIATE_VERIFY_CHANGE_PASSWORD_OTP_ACTION } from '@/state/thunkTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiateVerifyChangePasswordOtp = createAsyncThunk(
  INITIATE_VERIFY_CHANGE_PASSWORD_OTP_ACTION,
  async (data: VerifyChangePasswordOtpMutationVariables) => {
    const verifyChangePasswordAccessor = new GuardedOrOpenMutationAccessor<
      VerifyChangePasswordOtpMutationVariables,
      VerifyChangePasswordOtpMutation
    >();
    const initiateVerifyChangePasswordOtpOutput =
      await verifyChangePasswordAccessor.execute(
        data,
        INITIATE_VERIFY_CHANGE_PASSWORD_OTP,
      );
    if (initiateVerifyChangePasswordOtpOutput.error) {
      throw new Error(
        initiateVerifyChangePasswordOtpOutput.error?.message ??
          'Something went wrong',
      );
    }
    return initiateVerifyChangePasswordOtpOutput.data?.verifyChangePasswordOtp;
  },
);
