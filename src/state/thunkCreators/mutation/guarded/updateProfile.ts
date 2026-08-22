import {
  UpdateProfileMutation,
  UpdateProfileMutationVariables,
} from '@/__generated__/graphql';

import { GuardedOrOpenMutationAccessor } from 'redux-graphql-native';
import { INITIATE_UPDATE_PROFILE } from '@/graphql-communicator';
import { INITIATE_UPDATE_PROFILE_ACTION } from '@/state/thunkTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiateUpdateProfile = createAsyncThunk(
  INITIATE_UPDATE_PROFILE_ACTION,
  async (data: UpdateProfileMutationVariables) => {
    const updateProfileAccessor = new GuardedOrOpenMutationAccessor<
      UpdateProfileMutationVariables,
      UpdateProfileMutation
    >();
    const initiateUpdateProfileOutput = await updateProfileAccessor.execute(
      data,
      INITIATE_UPDATE_PROFILE,
    );
    if (initiateUpdateProfileOutput.error) {
      throw new Error(
        initiateUpdateProfileOutput.error?.message ?? 'Something went wrong',
      );
    }
    return initiateUpdateProfileOutput.data?.updateProfile;
  },
);
