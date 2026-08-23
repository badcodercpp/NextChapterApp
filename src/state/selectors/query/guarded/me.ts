import { RootState } from '../../../state';
import { createSelector } from '@reduxjs/toolkit';

const selectGetMeState = (state: RootState) => state.getMe;

export const selectGetMePending = createSelector(
  [selectGetMeState],
  getMe => !!getMe.pending,
);

export const selectGetMeError = createSelector(
  [selectGetMeState],
  getMe => getMe.error,
);

export const selectGetMeSuccess = createSelector(
  [selectGetMeState],
  getMe => getMe.success,
);
