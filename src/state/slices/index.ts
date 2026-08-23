import {
  combineNamedSlices,
  createReduxNamedReducer,
} from 'redux-named-reducer';
import {
  completeJourneySliceReducer,
  followUpSliceReducer,
  loginSliceReducer,
  logoutAllSliceReducer,
  logoutSliceReducer,
  pauseJourneySliceReducer,
  refreshTokenSliceReducer,
  registerSliceReducer,
  requestChangePasswordOtpSliceReducer,
  resendEmailVerificationOtpSliceReducer,
  resumeJourneySliceReducer,
  startJourneySliceReducer,
  updateProfileSliceReducer,
  verifyChangePasswordOtpSliceReducer,
  verifyEmailOtpSliceReducer,
} from './mutation';
import { getActiveJourneySliceReducer, getMeSliceReducer } from './query';

import { authtokenSliceReducer } from '@/state/slices/local';
import { reduxGraphqlReducer } from 'redux-graphql-native';

const reduxGraphqlNamedReducer = createReduxNamedReducer(
  reduxGraphqlReducer,
  'reduxGraphqlAuth',
);

export const getCombinedSlices = () => {
  return combineNamedSlices(
    // lib state
    reduxGraphqlNamedReducer,

    // local state
    authtokenSliceReducer,

    // open mutation
    loginSliceReducer,
    registerSliceReducer,
    resendEmailVerificationOtpSliceReducer,
    verifyEmailOtpSliceReducer,

    // guarded mutation
    completeJourneySliceReducer,
    followUpSliceReducer,
    logoutSliceReducer,
    logoutAllSliceReducer,
    pauseJourneySliceReducer,
    refreshTokenSliceReducer,
    requestChangePasswordOtpSliceReducer,
    resumeJourneySliceReducer,
    startJourneySliceReducer,
    updateProfileSliceReducer,
    verifyChangePasswordOtpSliceReducer,

    // guarded query
    getActiveJourneySliceReducer,
    getMeSliceReducer,
  );
};
