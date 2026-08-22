import {
  StartJourneyMutation,
  StartJourneyMutationVariables,
} from '@/__generated__/graphql';

import { GuardedOrOpenMutationAccessor } from 'redux-graphql-native';
import { INITIATE_START_JOURNEY } from '@/graphql-communicator';
import { INITIATE_START_JOURNEY_ACTION } from '@/state/thunkTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiateStartJourney = createAsyncThunk(
  INITIATE_START_JOURNEY_ACTION,
  async (data: StartJourneyMutationVariables) => {
    const startJourneyAccessor = new GuardedOrOpenMutationAccessor<
      StartJourneyMutationVariables,
      StartJourneyMutation
    >();
    const initiateStartJourneyOutput = await startJourneyAccessor.execute(
      data,
      INITIATE_START_JOURNEY,
    );
    if (initiateStartJourneyOutput.error) {
      throw new Error(
        initiateStartJourneyOutput.error?.message ?? 'Something went wrong',
      );
    }
    return initiateStartJourneyOutput.data?.startJourney;
  },
);
