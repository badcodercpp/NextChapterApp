import authtokenSlice from './authtoken';
import { combineReducers } from '@reduxjs/toolkit';
import loginSlice from './login';

export const getCombinedSlices = () => {
  return combineReducers({
    authtokenSlice,
    loginSlice,
  });
};
