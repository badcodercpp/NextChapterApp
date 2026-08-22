import {
  ResumeJourneyMutation,
  ResumeJourneyMutationVariables,
} from '@/__generated__/graphql';

import { GuardedOrOpenMutationAccessor } from 'redux-graphql-native';
import { INITIATE_RESUME_JOURNEY } from '@/graphql-communicator';
import { INITIATE_RESUME_JOURNEY_ACTION } from '@/state/thunkTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiateResumeJourney = createAsyncThunk(
  INITIATE_RESUME_JOURNEY_ACTION,
  async () => {
    const resumeJourneyAccessor = new GuardedOrOpenMutationAccessor<
      ResumeJourneyMutationVariables,
      ResumeJourneyMutation
    >();
    const initiateResumeJourneyOutput = await resumeJourneyAccessor.execute(
      {},
      INITIATE_RESUME_JOURNEY,
    );
    if (initiateResumeJourneyOutput.error) {
      throw new Error(
        initiateResumeJourneyOutput.error?.message ?? 'Something went wrong',
      );
    }
    return initiateResumeJourneyOutput.data?.resumeJourney;
  },
);
