import { combineReducers } from '@reduxjs/toolkit';
import loginSlice from './login';
import { reduxGraphqlReducer } from 'redux-graphql-native';

export const getCombinedSlices = () => {
  return combineReducers({
    reduxGraphqlAuth: reduxGraphqlReducer,
    loginSlice,
  });
};
