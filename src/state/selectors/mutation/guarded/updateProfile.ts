import { RootState } from '../../../state';
import { createSelector } from '@reduxjs/toolkit';

const selectUpdateProfileState = (state: RootState) => state.updateProfile;

export const selectUpdateProfilePending = createSelector(
  [selectUpdateProfileState],
  updateProfile => !!updateProfile.pending,
);

export const selectUpdateProfileError = createSelector(
  [selectUpdateProfileState],
  updateProfile => updateProfile.error,
);

export const selectUpdateProfileSuccess = createSelector(
  [selectUpdateProfileState],
  updateProfile => updateProfile.success,
);
