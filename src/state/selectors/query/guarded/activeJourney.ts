import { RootState } from '../../../state';
import { createSelector } from '@reduxjs/toolkit';

const selectGetActiveJourneyState = (state: RootState) =>
  state.getActiveJourney;

export const selectGetActiveJourneyPending = createSelector(
  [selectGetActiveJourneyState],
  getActiveJourney => !!getActiveJourney.pending,
);

export const selectGetActiveJourneyError = createSelector(
  [selectGetActiveJourneyState],
  getActiveJourney => getActiveJourney.error,
);

export const selectGetActiveJourneySuccess = createSelector(
  [selectGetActiveJourneyState],
  getActiveJourney => getActiveJourney.success,
);
