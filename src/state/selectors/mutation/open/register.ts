import { RootState } from '../../../state';
import { createSelector } from '@reduxjs/toolkit';

const selectRegisterState = (state: RootState) => state.register;

export const selectRegisterPending = createSelector(
  [selectRegisterState],
  register => !!register.pending,
);

export const selectRegisterError = createSelector(
  [selectRegisterState],
  register => register.error,
);

export const selectRegisterSuccess = createSelector(
  [selectRegisterState],
  register => register.success,
);
