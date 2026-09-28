import authtokenSlice from '@/state/slices/local/authtoken';
import { combineSlices } from '@reduxjs/toolkit';

export const getCombinedSlices = () => {
  return combineSlices(
    // local state
    authtokenSlice,
  );
};
