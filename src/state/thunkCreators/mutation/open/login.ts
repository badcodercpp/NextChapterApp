import { LoginMutation, LoginMutationVariables } from '@/__generated__/graphql';

import { GuardedOrOpenMutationAccessor } from 'redux-graphql-native';
import { INITIATE_LOGIN } from '@/graphql-communicator';
import { INITIATE_LOGIN_ACTION } from '@/state/thunkTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiateLogin = createAsyncThunk(
  INITIATE_LOGIN_ACTION,
  async (data: LoginMutationVariables) => {
    const loginAccessor = new GuardedOrOpenMutationAccessor<
      LoginMutationVariables,
      LoginMutation
    >();
    const initiateLoginOutput = await loginAccessor.execute(
      data,
      INITIATE_LOGIN,
    );
    if (initiateLoginOutput.error) {
      throw new Error(
        initiateLoginOutput.error?.message ?? 'Something went wrong',
      );
    }
    return initiateLoginOutput.data?.login;
  },
);
