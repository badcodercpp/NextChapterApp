import { RootState } from '../../../state';
import { createSelector } from '@reduxjs/toolkit';

const selectStartJourneyState = (state: RootState) => state.startJourney;

export const selectStartJourneyPending = createSelector(
  [selectStartJourneyState],
  startJourney => !!startJourney.pending,
);

export const selectStartJourneyError = createSelector(
  [selectStartJourneyState],
  startJourney => startJourney.error,
);

export const selectStartJourneySuccess = createSelector(
  [selectStartJourneyState],
  startJourney => startJourney.success,
);
