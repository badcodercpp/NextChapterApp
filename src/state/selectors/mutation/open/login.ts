import { RootState } from '../../../state';
import { createSelector } from '@reduxjs/toolkit';

const selectLoginState = (state: RootState) => state.login;

export const selectLoginPending = createSelector(
  [selectLoginState],
  login => !!login.pending,
);

export const selectLoginError = createSelector(
  [selectLoginState],
  login => login.error,
);

export const selectLoginSuccess = createSelector(
  [selectLoginState],
  login => login.success,
);
