import {
  FollowUpMutation,
  FollowUpMutationVariables,
} from '@/__generated__/graphql';

import { GuardedOrOpenMutationAccessor } from 'redux-graphql-native';
import { INITIATE_FOLLOW_UP } from '@/graphql-communicator';
import { INITIATE_FOLLOW_UP_ACTION } from '@/state/thunkTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiatefollowUp = createAsyncThunk(
  INITIATE_FOLLOW_UP_ACTION,
  async (data: FollowUpMutationVariables) => {
    const followUpAccessor = new GuardedOrOpenMutationAccessor<
      FollowUpMutationVariables,
      FollowUpMutation
    >();
    const initiatefollowUpOutput = await followUpAccessor.execute(
      data,
      INITIATE_FOLLOW_UP,
    );
    if (initiatefollowUpOutput.error) {
      throw new Error(
        initiatefollowUpOutput.error?.message ?? 'Something went wrong',
      );
    }
    return initiatefollowUpOutput.data?.followUp;
  },
);
