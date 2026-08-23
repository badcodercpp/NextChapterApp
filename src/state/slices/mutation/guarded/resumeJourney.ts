import { ErrorLike } from '@apollo/client';
import { ResumeJourneyMutation } from '@/__generated__/graphql';
import { createReduxNamedReducer } from 'redux-named-reducer';
import { createSlice } from '@reduxjs/toolkit';
import { initiateResumeJourney } from '@/state/thunkCreators';

interface ResumeJourneyState {
  pending?: boolean;
  success?: ResumeJourneyMutation['resumeJourney'];
  error?: ErrorLike['message'];
}

const initialState: ResumeJourneyState = {};

// Then, handle actions in your reducers:
export const resumeJourneySlice = createSlice({
  name: 'resumeJourney',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // start loading
    builder

      // start
      .addCase(initiateResumeJourney.pending, state => {
        state.pending = true;
      })
      // success
      .addCase(initiateResumeJourney.fulfilled, (state, action) => {
        state.pending = false;
        // Add Claims to the state array
        state.success = action.payload;
      })
      // rejected
      .addCase(initiateResumeJourney.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export const resumeJourneySliceReducer = createReduxNamedReducer(
  resumeJourneySlice.reducer,
  resumeJourneySlice.name,
);
