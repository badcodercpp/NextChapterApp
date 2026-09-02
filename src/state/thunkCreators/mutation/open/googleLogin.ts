import {
  GoogleLoginMutation,
  GoogleLoginMutationVariables,
} from '@/__generated__/graphql';

import { GuardedOrOpenMutationAccessor } from 'redux-graphql-native';
import { INITIATE_GOOGLE_LOGIN } from '@/graphql-communicator';
import { INITIATE_GOOGLE_LOGIN_ACTION } from '@/state/thunkTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiateGoogleLogin = createAsyncThunk(
  INITIATE_GOOGLE_LOGIN_ACTION,
  async (data: GoogleLoginMutationVariables) => {
    const googleLoginAccessor = new GuardedOrOpenMutationAccessor<
      GoogleLoginMutationVariables,
      GoogleLoginMutation
    >();
    const initiateGoogleLoginOutput = await googleLoginAccessor.execute(
      data,
      INITIATE_GOOGLE_LOGIN,
    );
    if (initiateGoogleLoginOutput.error) {
      throw new Error(
        initiateGoogleLoginOutput.error?.message ?? 'Something went wrong',
      );
    }
    return initiateGoogleLoginOutput.data?.googleLogin;
  },
);
