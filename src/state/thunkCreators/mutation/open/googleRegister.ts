import {
  GoogleRegisterMutation,
  GoogleRegisterMutationVariables,
} from '@/__generated__/graphql';

import { GuardedOrOpenMutationAccessor } from 'redux-graphql-native';
import { INITIATE_GOOGLE_REGISTER } from '@/graphql-communicator';
import { INITIATE_GOOGLE_REGISTER_ACTION } from '@/state/thunkTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiateGoogleRegister = createAsyncThunk(
  INITIATE_GOOGLE_REGISTER_ACTION,
  async (data: GoogleRegisterMutationVariables) => {
    const googleRegisterAccessor = new GuardedOrOpenMutationAccessor<
      GoogleRegisterMutationVariables,
      GoogleRegisterMutation
    >();
    const initiateGoogleRegisterOutput = await googleRegisterAccessor.execute(
      data,
      INITIATE_GOOGLE_REGISTER,
    );
    if (initiateGoogleRegisterOutput.error) {
      throw new Error(
        initiateGoogleRegisterOutput.error?.message ?? 'Something went wrong',
      );
    }
    return initiateGoogleRegisterOutput.data?.googleRegister;
  },
);
