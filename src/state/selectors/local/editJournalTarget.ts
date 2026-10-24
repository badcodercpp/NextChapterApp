import { RootState } from '../../../state';
import { createSelector } from '@reduxjs/toolkit';

const selectEditJournalTargetState = (state: RootState) =>
  state.app.editjournaltarget;

export const selectEditJournalTargetData = createSelector(
  [selectEditJournalTargetState],
  data => data.data,
);
