import { ActiveJourneyQuery } from '@/__generated__/graphql';
import { ErrorLike } from '@apollo/client';
import { createReduxNamedReducer } from 'redux-named-reducer';
import { createSlice } from '@reduxjs/toolkit';
import { initiateGetActiveJourney } from '@/state/thunkCreators';

interface GetActiveJourneyState {
  pending?: boolean;
  success?: ActiveJourneyQuery['activeJourney'];
  error?: ErrorLike['message'];
}

const initialState: GetActiveJourneyState = {};

// Then, handle actions in your reducers:
export const getActiveJourneySlice = createSlice({
  name: 'getActiveJourney',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // start loading
    builder

      // start
      .addCase(initiateGetActiveJourney.pending, state => {
        state.pending = true;
      })
      // success
      .addCase(initiateGetActiveJourney.fulfilled, (state, action) => {
        state.pending = false;
        // Add Claims to the state array
        state.success = action.payload;
      })
      // rejected
      .addCase(initiateGetActiveJourney.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export const getActiveJourneySliceReducer = createReduxNamedReducer(
  getActiveJourneySlice.reducer,
  getActiveJourneySlice.name,
);
