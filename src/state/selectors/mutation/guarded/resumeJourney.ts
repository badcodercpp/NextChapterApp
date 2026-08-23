import { RootState } from '../../../state';
import { createSelector } from '@reduxjs/toolkit';

const selectResumeJourneyState = (state: RootState) => state.resumeJourney;

export const selectResumeJourneyPending = createSelector(
  [selectResumeJourneyState],
  resumeJourney => !!resumeJourney.pending,
);

export const selectResumeJourneyError = createSelector(
  [selectResumeJourneyState],
  resumeJourney => resumeJourney.error,
);

export const selectResumeJourneySuccess = createSelector(
  [selectResumeJourneyState],
  resumeJourney => resumeJourney.success,
);
