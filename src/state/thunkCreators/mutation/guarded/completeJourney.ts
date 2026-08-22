import {
  CompleteJourneyMutation,
  CompleteJourneyMutationVariables,
} from '@/__generated__/graphql';

import { GuardedOrOpenMutationAccessor } from 'redux-graphql-native';
import { INITIATE_COMPLETE_JOURNEY } from '@/graphql-communicator';
import { INITIATE_COMPLETE_JOURNEY_ACTION } from '@/state/thunkTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiateCompleteJourney = createAsyncThunk(
  INITIATE_COMPLETE_JOURNEY_ACTION,
  async () => {
    const completeJourneyAccessor = new GuardedOrOpenMutationAccessor<
      CompleteJourneyMutationVariables,
      CompleteJourneyMutation
    >();
    const initiateCompleteJourneyOutput = await completeJourneyAccessor.execute(
      {},
      INITIATE_COMPLETE_JOURNEY,
    );
    if (initiateCompleteJourneyOutput.error) {
      throw new Error(
        initiateCompleteJourneyOutput.error?.message ?? 'Something went wrong',
      );
    }
    return initiateCompleteJourneyOutput.data?.completeJourney;
  },
);
