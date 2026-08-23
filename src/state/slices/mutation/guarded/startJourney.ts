import { ErrorLike } from '@apollo/client';
import { StartJourneyMutation } from '@/__generated__/graphql';
import { createReduxNamedReducer } from 'redux-named-reducer';
import { createSlice } from '@reduxjs/toolkit';
import { initiateStartJourney } from '@/state/thunkCreators';

interface StartJourneyState {
  pending?: boolean;
  success?: StartJourneyMutation['startJourney'];
  error?: ErrorLike['message'];
}

const initialState: StartJourneyState = {};

// Then, handle actions in your reducers:
export const startJourneySlice = createSlice({
  name: 'startJourney',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // start loading
    builder

      // start
      .addCase(initiateStartJourney.pending, state => {
        state.pending = true;
      })
      // success
      .addCase(initiateStartJourney.fulfilled, (state, action) => {
        state.pending = false;
        // Add Claims to the state array
        state.success = action.payload;
      })
      // rejected
      .addCase(initiateStartJourney.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export const startJourneySliceReducer = createReduxNamedReducer(
  startJourneySlice.reducer,
  startJourneySlice.name,
);
