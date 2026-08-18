import { createSelector } from '@reduxjs/toolkit';
import { getAuthtokenSlice } from '../accessors';

export const getAuthtokenSliceSelector = createSelector(
  [getAuthtokenSlice],
  token => token,
);
