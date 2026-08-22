import {
  RefreshTokenMutation,
  RefreshTokenMutationVariables,
} from '@/__generated__/graphql';

import { GuardedOrOpenMutationAccessor } from 'redux-graphql-native';
import { INITIATE_REFRESH_TOKEN } from '@/graphql-communicator';
import { INITIATE_REFRESH_TOKEN_ACTION } from '@/state/thunkTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiateRefreshToken = createAsyncThunk(
  INITIATE_REFRESH_TOKEN_ACTION,
  async (data: RefreshTokenMutationVariables) => {
    const refreshTokenAccessor = new GuardedOrOpenMutationAccessor<
      RefreshTokenMutationVariables,
      RefreshTokenMutation
    >();
    const initiateRefreshTokenOutput = await refreshTokenAccessor.execute(
      data,
      INITIATE_REFRESH_TOKEN,
    );
    if (initiateRefreshTokenOutput.error) {
      throw new Error(
        initiateRefreshTokenOutput.error?.message ?? 'Something went wrong',
      );
    }
    return initiateRefreshTokenOutput.data?.refreshToken;
  },
);
