import {
  LogoutAllMutation,
  LogoutAllMutationVariables,
} from '@/__generated__/graphql';

import { GuardedOrOpenMutationAccessor } from 'redux-graphql-native';
import { INITIATE_LOGOUT_ALL } from '@/graphql-communicator';
import { INITIATE_LOGOUT_ALL_ACTION } from '@/state/thunkTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiateLogoutAll = createAsyncThunk(
  INITIATE_LOGOUT_ALL_ACTION,
  async () => {
    const logoutAllAccessor = new GuardedOrOpenMutationAccessor<
      LogoutAllMutationVariables,
      LogoutAllMutation
    >();
    const initiateLogoutAllOutput = await logoutAllAccessor.execute(
      {},
      INITIATE_LOGOUT_ALL,
    );
    if (initiateLogoutAllOutput.error) {
      throw new Error(
        initiateLogoutAllOutput.error?.message ?? 'Something went wrong',
      );
    }
    return initiateLogoutAllOutput.data?.logoutAll;
  },
);
