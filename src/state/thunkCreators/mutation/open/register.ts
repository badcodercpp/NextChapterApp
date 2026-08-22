import {
  RegisterMutation,
  RegisterMutationVariables,
} from '@/__generated__/graphql';

import { GuardedOrOpenMutationAccessor } from 'redux-graphql-native';
import { INITIATE_REGISTER } from '@/graphql-communicator';
import { INITIATE_REGISTER_ACTION } from '@/state/thunkTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiateRegister = createAsyncThunk(
  INITIATE_REGISTER_ACTION,
  async (data: RegisterMutationVariables) => {
    const registerAccessor = new GuardedOrOpenMutationAccessor<
      RegisterMutationVariables,
      RegisterMutation
    >();
    const initiateRegisterOutput = await registerAccessor.execute(
      data,
      INITIATE_REGISTER,
    );
    if (initiateRegisterOutput.error) {
      throw new Error(
        initiateRegisterOutput.error?.message ?? 'Something went wrong',
      );
    }
    return initiateRegisterOutput.data?.register;
  },
);
