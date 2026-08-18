import { createSelector } from '@reduxjs/toolkit';
import { getLoginSlice } from '../accessors';

export const getLoginSliceSelector = createSelector(
  [getLoginSlice],
  login => login,
);
