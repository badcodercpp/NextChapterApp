import { RootState } from '../../../state';
import { createSelector } from '@reduxjs/toolkit';

const selectLogoutState = (state: RootState) => state.logout;

export const selectLogoutPending = createSelector(
  [selectLogoutState],
  logout => !!logout.pending,
);

export const selectLogoutError = createSelector(
  [selectLogoutState],
  logout => logout.error,
);

export const selectLogoutSuccess = createSelector(
  [selectLogoutState],
  logout => logout.success,
);
