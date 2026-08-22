import { MeQuery, MeQueryVariables } from '@/__generated__/graphql';

import { GuardedOrOpenQueryAccessor } from 'redux-graphql-native';
import { INITIATE_GET_ME } from '@/graphql-communicator';
import { INITIATE_GET_ME_ACTION } from '@/state/thunkTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiateGetMe = createAsyncThunk(
  INITIATE_GET_ME_ACTION,
  async () => {
    const getMeAccessor = new GuardedOrOpenQueryAccessor<
      MeQueryVariables,
      MeQuery
    >();
    const initiateGetMeOutput = await getMeAccessor.execute(
      {},
      INITIATE_GET_ME,
    );
    if (initiateGetMeOutput.error) {
      throw new Error(
        initiateGetMeOutput.error?.message ?? 'Something went wrong',
      );
    }
    return initiateGetMeOutput.data?.me;
  },
);
