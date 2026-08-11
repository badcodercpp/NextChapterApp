import authtokenSlice from './authtoken';
import { combineReducers } from '@reduxjs/toolkit';

export const getCombinedSlices = () => {
  return combineReducers({
    authtokenSlice,
  });
};
