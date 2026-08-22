import {
  LogoutMutation,
  LogoutMutationVariables,
} from '@/__generated__/graphql';

import { GuardedOrOpenMutationAccessor } from 'redux-graphql-native';
import { INITIATE_LOGOUT } from '@/graphql-communicator';
import { INITIATE_LOGOUT_ACTION } from '@/state/thunkTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiateLogout = createAsyncThunk(
  INITIATE_LOGOUT_ACTION,
  async () => {
    const logoutAccessor = new GuardedOrOpenMutationAccessor<
      LogoutMutationVariables,
      LogoutMutation
    >();
    const initiateLogoutOutput = await logoutAccessor.execute(
      {},
      INITIATE_LOGOUT,
    );
    if (initiateLogoutOutput.error) {
      throw new Error(
        initiateLogoutOutput.error?.message ?? 'Something went wrong',
      );
    }
    return initiateLogoutOutput.data?.logout;
  },
);
