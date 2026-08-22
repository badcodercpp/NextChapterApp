import {
  PauseJourneyMutation,
  PauseJourneyMutationVariables,
} from '@/__generated__/graphql';

import { GuardedOrOpenMutationAccessor } from 'redux-graphql-native';
import { INITIATE_PAUSE_JOURNEY } from '@/graphql-communicator';
import { INITIATE_PAUSE_JOURNEY_ACTION } from '@/state/thunkTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiatePauseJourney = createAsyncThunk(
  INITIATE_PAUSE_JOURNEY_ACTION,
  async () => {
    const pauseJourneyAccessor = new GuardedOrOpenMutationAccessor<
      PauseJourneyMutationVariables,
      PauseJourneyMutation
    >();
    const initiatePauseJourneyOutput = await pauseJourneyAccessor.execute(
      {},
      INITIATE_PAUSE_JOURNEY,
    );
    if (initiatePauseJourneyOutput.error) {
      throw new Error(
        initiatePauseJourneyOutput.error?.message ?? 'Something went wrong',
      );
    }
    return initiatePauseJourneyOutput.data?.pauseJourney;
  },
);
