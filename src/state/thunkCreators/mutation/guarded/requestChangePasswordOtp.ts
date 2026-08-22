import {
  RequestChangePasswordOtpMutation,
  RequestChangePasswordOtpMutationVariables,
} from '@/__generated__/graphql';

import { GuardedOrOpenMutationAccessor } from 'redux-graphql-native';
import { INITIATE_REQUEST_CHANGE_PASSWORD_OTP } from '@/graphql-communicator';
import { INITIATE_REQUEST_CHANGE_PASSWORD_OTP_ACTION } from '@/state/thunkTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiateRequestChangePasswordOtp = createAsyncThunk(
  INITIATE_REQUEST_CHANGE_PASSWORD_OTP_ACTION,
  async () => {
    const requestChangePasswordOtpAccessor = new GuardedOrOpenMutationAccessor<
      RequestChangePasswordOtpMutationVariables,
      RequestChangePasswordOtpMutation
    >();
    const initiateRequestChangePasswordOtpOutput =
      await requestChangePasswordOtpAccessor.execute(
        {},
        INITIATE_REQUEST_CHANGE_PASSWORD_OTP,
      );
    if (initiateRequestChangePasswordOtpOutput.error) {
      throw new Error(
        initiateRequestChangePasswordOtpOutput.error?.message ??
          'Something went wrong',
      );
    }
    return initiateRequestChangePasswordOtpOutput.data
      ?.requestChangePasswordOtp;
  },
);
