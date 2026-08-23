import { RootState } from '../../../state';
import { createSelector } from '@reduxjs/toolkit';

const selectRefreshTokenState = (state: RootState) => state.refreshToken;

export const selectRefreshTokenPending = createSelector(
  [selectRefreshTokenState],
  refreshToken => !!refreshToken.pending,
);

export const selectRefreshTokenError = createSelector(
  [selectRefreshTokenState],
  refreshToken => refreshToken.error,
);

export const selectRefreshTokenSuccess = createSelector(
  [selectRefreshTokenState],
  refreshToken => refreshToken.success,
);
