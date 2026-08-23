import { RootState } from '../../../state';
import { createSelector } from '@reduxjs/toolkit';

const selectLogoutAllState = (state: RootState) => state.logoutAll;

export const selectLogoutAllPending = createSelector(
  [selectLogoutAllState],
  logoutAll => !!logoutAll.pending,
);

export const selectLogoutAllError = createSelector(
  [selectLogoutAllState],
  logoutAll => logoutAll.error,
);

export const selectLogoutAllSuccess = createSelector(
  [selectLogoutAllState],
  logoutAll => logoutAll.success,
);
