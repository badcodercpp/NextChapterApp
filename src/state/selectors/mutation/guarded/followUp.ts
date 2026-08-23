import { RootState } from '../../../state';
import { createSelector } from '@reduxjs/toolkit';

const selectFollowUpState = (state: RootState) => state.followUp;

export const selectFollowUpPending = createSelector(
  [selectFollowUpState],
  followUp => !!followUp.pending,
);

export const selectFollowUpError = createSelector(
  [selectFollowUpState],
  followUp => followUp.error,
);

export const selectFollowUpSuccess = createSelector(
  [selectFollowUpState],
  followUp => followUp.success,
);
