import { RootState } from '../../../state';
import { createSelector } from '@reduxjs/toolkit';

const selectPauseJourneyState = (state: RootState) => state.pauseJourney;

export const selectPauseJourneyPending = createSelector(
  [selectPauseJourneyState],
  pauseJourney => !!pauseJourney.pending,
);

export const selectPauseJourneyError = createSelector(
  [selectPauseJourneyState],
  pauseJourney => pauseJourney.error,
);

export const selectPauseJourneySuccess = createSelector(
  [selectPauseJourneyState],
  pauseJourney => pauseJourney.success,
);
