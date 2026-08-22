import {
  ActiveJourneyQuery,
  ActiveJourneyQueryVariables,
} from '@/__generated__/graphql';

import { GuardedOrOpenQueryAccessor } from 'redux-graphql-native';
import { INITIATE_GET_ACTIVE_JOURNEY } from '@/graphql-communicator';
import { INITIATE_GET_ACTIVE_JOURNEY_ACTION } from '@/state/thunkTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiateGetActiveJourney = createAsyncThunk(
  INITIATE_GET_ACTIVE_JOURNEY_ACTION,
  async () => {
    const getActiveJourneyAccessor = new GuardedOrOpenQueryAccessor<
      ActiveJourneyQueryVariables,
      ActiveJourneyQuery
    >();
    const initiateGetActiveJourneyOutput =
      await getActiveJourneyAccessor.execute({}, INITIATE_GET_ACTIVE_JOURNEY);
    if (initiateGetActiveJourneyOutput.error) {
      throw new Error(
        initiateGetActiveJourneyOutput.error?.message ?? 'Something went wrong',
      );
    }
    return initiateGetActiveJourneyOutput.data?.activeJourney;
  },
);
