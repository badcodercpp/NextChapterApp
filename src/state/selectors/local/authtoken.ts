import { RootState } from '../../../state';
import { createSelector } from '@reduxjs/toolkit';

const selectAuthtokenState = (state: RootState) => state.authtoken;

export const selectAccessToken = createSelector(
  [selectAuthtokenState],
  authtoken => authtoken.accessToken,
);

export const selectRefreshToken = createSelector(
  [selectAuthtokenState],
  authtoken => authtoken.refreshToken,
);

export const selectAuthStatus = createSelector(
  [selectAuthtokenState],
  authtoken => authtoken.authStatus,
);
