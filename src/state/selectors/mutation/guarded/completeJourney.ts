import { RootState } from '../../../state';
import { createSelector } from '@reduxjs/toolkit';

const selectCompleteJourneyState = (state: RootState) => state.completeJourney;

export const selectCompleteJourneyPending = createSelector(
  [selectCompleteJourneyState],
  completeJourney => !!completeJourney.pending,
);

export const selectCompleteJourneyError = createSelector(
  [selectCompleteJourneyState],
  completeJourney => completeJourney.error,
);

export const selectCompleteJourneySuccess = createSelector(
  [selectCompleteJourneyState],
  completeJourney => completeJourney.success,
);
